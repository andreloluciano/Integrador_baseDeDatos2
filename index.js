const { conectarDB, client } = require("./db");

async function main() {
  try {
    const db = await conectarDB();

    const colecciones = await db.listCollections().toArray();

    console.log("colecciones encontradas:");
    colecciones.forEach((coleccion) => {
      console.log("- " + coleccion.name);
    });
  } catch (error) {
    console.log("error en la ejecucion", error.message);
  } finally {
    await client.close();
    console.log("conexion cerrada");
  }
}

main();