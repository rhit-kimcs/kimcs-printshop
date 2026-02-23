import mssql from 'mssql';
import { Provider } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig: mssql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const DATABASE_POOL = 'DATABASE_POOL';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_POOL,
    useFactory: async () => {
      const pool = new mssql.ConnectionPool(dbConfig);
      try {
        await pool.connect();
        console.log('Connected to the database successfully.');
        console.log('Database config:', dbConfig);
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }
      return pool;
    },
  },
];
