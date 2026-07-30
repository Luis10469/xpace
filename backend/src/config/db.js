import sql from 'mssql/msnodesqlv8.js';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,

  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    encrypt: false
  },

  driver: 'ODBC Driver 18 for SQL Server',

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool = null;

export const connectDB = async () => {
  try {
    if (pool) return pool;

    pool = await sql.connect(config);

    console.log('✅ SQL Server conectado correctamente');
    console.log(`📦 Base de datos: ${process.env.DB_NAME}`);

    return pool;
  } catch (error) {
    console.error('❌ Error al conectar con SQL Server:');
    console.error(error);
    process.exit(1);
  }
};

export const getPool = async () => {
  if (!pool) {
    await connectDB();
  }

  return pool;
};

export const query = async (text, params = []) => {
  const connection = await getPool();
  const request = connection.request();

  params.forEach((param, index) => {
    request.input(`param${index}`, param);
  });

  let parameterizedQuery = text;

  params.forEach((_, index) => {
    parameterizedQuery = parameterizedQuery.replace(
      '?',
      `@param${index}`
    );
  });

  const result = await request.query(parameterizedQuery);

  return result.recordset;
};

export default pool;