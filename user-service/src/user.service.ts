import { Injectable, Inject } from '@nestjs/common';

//bcrypt for password hashing
import { hash, compare } from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from './user.entity';

interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  username: string;
  password: string;
}

@Injectable()
export class AppService {
  // Inject the user repository into the service
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async addUser(data: UserData): Promise<string> {
    if (!data.username || !data.password || !data.firstName || !data.lastName) {
      return 'All fields are required';
    }

    //check if user already exists
    const userExists = await this.userRepository.findOne({
      where: { username: data.username },
      select: { id: true },
    });
    if (userExists) {
      return 'User already exists';
    }
    const user = new User();
    user.username = data.username;
    //hash the password before saving
    user.password = await hash(data.password, 10);
    user.firstname = data.firstName;
    user.lastname = data.lastName;

    try {
      this.userRepository.save(user);
      console.log('User added successfully');
      return 'User added successfully';
    } catch (error) {
      console.log(error);
      return 'Error adding user';
    }
  }

  async getUser(id: number): Promise<any> {
    try {
      if (!id) {
        return 'User ID not provided';
      }

      const user = await this.userRepository.findOne({
        where: { id: id },
        select: {
          username: true,
          firstname: true,
          lastname: true,
          createAt: true,
        },
      });

      return {
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastname,
        createdAt: user.createAt,
      };
    } catch (error) {
      return 'Error fetching user';
    }
  }

  async updateUser(data: any): Promise<string> {
    try {
      if (!data.id) {
        return 'User ID not provided';
      }

      const user = await this.userRepository.findOne({
        where: { id: data.id },
        select: {
          username: true,
          password: true,
          firstname: true,
          lastname: true,
        },
      });

      if (!user) {
        return 'User not found';
      }
      if (data.username !== undefined) {
        user.username = data.username;
      }
      if (data.password !== undefined) {
        //hash the password by bcrypt
        user.password = await hash(data.password, 10);
      }

      if (data.firstName !== undefined) {
        user.firstname = data.firstName;
      }
      if (data.lastName !== undefined) {
        user.lastname = data.lastName;
      }

      this.userRepository.save(user);

      return 'User updated successfully';
    } catch (error) {
      return 'Error updating user';
    }
  }

  async deleteUser(id: number): Promise<string> {
    try {
      if (!id) {
        return 'User ID not provided';
      }
      //check if user exists
      const user: any = await this.userRepository.findOne({
        where: { id: id },
        select: { id: true },
      });
      if (!user) {
        return 'User not found';
      }
      this.userRepository.delete({ id: id });
      return 'User deleted successfully';
    } catch (error) {
      return 'Error deleting user';
    }
  }

  async checkUserById(userId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        select: { id: true },
      });
      //if user exists return true
      if (user) {
        return true;
      }
      //if user does not exist return false
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async loginUser(data: LoginData): Promise<any> {
    try {
      if (data.username == '' || data.password == '') {
        return {
          status: false,
          message: 'All fields are required',
        };
      }

      const user = await this.userRepository.findOne({
        where: { username: data.username },
        select: {
          password: true,
          id: true,
        },
      });

      if (!user) {
        return {
          status: false,
          message: 'Invalid username or password',
        };
      }

      //compare the password with the hashed password
      const match: boolean = await compare(data.password, user.password);
      if (!match) {
        return {
          status: false,
          message: 'Invalid username or password',
        };
      }

      return {
        status: true,
        message: 'Login successful',
        user_id: user.id,
      };
    } catch (error) {
      return {
        status: false,
        message: 'An error occurred',
      };
    }
  }
}
