import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { User } from './user.entity';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        connectTimeout: 60 * 60 * 1000,
        database: process.env.DB_NAME,
        entities: [User],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
