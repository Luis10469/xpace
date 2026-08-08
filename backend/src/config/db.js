import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

// ======================================
// CONFIGURACIÓN SQL SERVER
// ======================================

const config = {
  connectionString: [
    "Driver={ODBC Driver 18 for SQL Server}",
    `Server=${process.env.DB_HOST}`,
    `Database=${process.env.DB_NAME}`,
    "Trusted_Connection=Yes",
    "Encrypt=No",
    "TrustServerCertificate=Yes",
  ].join(";"),

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },

  options: {
    trustedConnection: true,
    useUTC: false,
  },
};

// ======================================
// POOL DE CONEXIÓN
// ======================================

let pool = null;

// ======================================
// CONECTAR BASE DE DATOS
// ======================================

export const connectDB = async () => {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(config);

    console.log("✅ SQL Server conectado correctamente");
    console.log(`📦 Base de datos: ${process.env.DB_NAME}`);
    console.log(`🖥️ Servidor: ${process.env.DB_HOST}`);

    return pool;
  } catch (error) {
    console.error("❌ Error al conectar con SQL Server:");
    console.error(error);

    pool = null;
    throw error;
  }
};

// ======================================
// OBTENER POOL
// ======================================

export const getPool = async () => {
  if (!pool) {
    await connectDB();
  }

  return pool;
};

// ======================================
// EJECUTAR CONSULTAS
// ======================================

export const query = async (text, params = []) => {
  const connection = await getPool();
  const request = connection.request();

  params.forEach((param, index) => {
    request.input(`param${index}`, param);
  });

  let parameterizedQuery = text;

  params.forEach((_, index) => {
    parameterizedQuery = parameterizedQuery.replace(
      "?",
      `@param${index}`
    );
  });

  const result = await request.query(parameterizedQuery);

  return result.recordset;
};

// ======================================
// EXPORTACIÓN
// ======================================

export default pool;