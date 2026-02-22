import mssql from 'mssql';
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

export const pool = new mssql.ConnectionPool(dbConfig);

export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
export const closeDatabaseConnection = async () => {
  try {
    await pool.close();
    console.log('Database connection closed successfully.');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

// export async function testDb() {
//   await mssql.connect(
//     'Server=golem.csse.rose-hulman.edu,1433;Database=PrintShop;User Id=wangz30;Password=Password123;Encrypt=false',
//   );
//   const result = await mssql.query`select * from "User"`;
//   console.log(result);
// }
