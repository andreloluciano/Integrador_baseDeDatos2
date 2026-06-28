const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

async function conectarDB() {
  try {
    await client.connect();
    console.log("conexion correcta a mongodb atlas");

    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("error al conectar con mongodb");
    throw error;
  }
}

module.exports = { conectarDB, client };