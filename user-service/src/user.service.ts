import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AppService {
  // Inject the user repository into the service
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  addUser(data: UserData): string {
    if (!data.username || !data.password || !data.firstName || !data.lastName) {
      return 'All fields are required';
    }
    const user = new User();
    user.username = data.username;
    user.password = data.password;
    user.firstname = data.firstName;
    user.lastname = data.lastName;

    try {
      this.userRepository.save(user);
      console.log('User added successfully');
      return 'User added successfully';
    } catch (error) {
      return 'Error adding user';
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = this.userRepository.findOne({
        where: { id: id },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async updateUser(data: any): Promise<string> {
    try {
      if (!data.id) {
        return 'User ID not provided';
      }

      const user = await this.userRepository.findOne({
        where: { id: data.id },
      });

      if (!user) {
        return 'User not found';
      }
      if (data.username !== undefined) {
        user.username = data.username;
      }
      if (data.password !== undefined) {
        user.password = data.password;
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
      const user = await this.userRepository.findOne({
        where: { id: id },
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
}
