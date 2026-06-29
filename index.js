const { conectarDB, client } = require("./db");

async function main() {
  try {
    const db = await conectarDB();
        
    // selecciono las colecciones que voy a usar dentro de la base
    const juegos = db.collection("juegos");
    const categorias = db.collection("categorias"); // juegos es la coleccion principal donde hago el crud
    const distribuidoras = db.collection("distribuidoras"); // categorias y distribuidoras se usan para buscar los ids que referencia el juego

    // busco las categorias que va a tener el juego, guardo sus id para referenciar
    const categoriaAccion = await categorias.findOne({ nombre: "Accion" });
    const categoriaAventura = await categorias.findOne({ nombre: "Aventura" });
    // busco la distribuidora del juego y su id para referencias
    const distribuidoraCapcom = await distribuidoras.findOne({ nombre: "CAPCOM" });

    // valido que las referencias existan 
    if (!categoriaAccion || !categoriaAventura || !distribuidoraCapcom) {
      console.log("no se encontraron las referencias necesarias");
      return;
    }

    // CREATE
// creo el objeto que se va a insertar como nuevo documento en la coleccion juegos
const nuevoJuego = {
  titulo: "PRAGMATA",
  descripcion: "Juego de accion y ciencia ficcion",
  precio: 69.99,
  fecha_lanzamiento: new Date("2026-01-01"),
  requisitos: {
    so: "Windows 10",
    procesador: "Intel Core i5",
    memoria: "16 GB RAM",
    graficos: "NVIDIA GTX 1060",
    almacenamiento: "50 GB"
  },
  categorias_ids: [
    categoriaAccion._id,
    categoriaAventura._id
  ],
  distribuidora_id: distribuidoraCapcom._id,
  eliminado: false
};

await juegos.insertOne(nuevoJuego); // inserto el juego en la coleccion juegos
console.log("juego insertado correctamente");

// READ
// busco juegos activos
const juegosActivos = await juegos.find({ eliminado: false }).toArray();
console.log("juegos activos:");
juegosActivos.forEach((juego) => {
  console.log("- " + juego.titulo + " | precio: " + juego.precio);
}); 

    // UPDATE
    await juegos.updateOne(
        { titulo: "PRAGMATA" },
  {
    $set: {
      precio: 40.00,
      descripcion: "node Juego de accion y ciencia ficcion"
    }
  }
);
    console.log("juego actualizado"); 

    // DELETE (eliminado a TRUE)
    await juegos.updateOne(
     { titulo: "PRAGMATA" },
      {
        $set: {
          eliminado: true
        }
      }
    );
    console.log("baja del juego realizada");
// verifico que PRAGMATA esta dado de baja
const pragmataActivo = await juegos.findOne({
  titulo: "PRAGMATA",
  eliminado: false
});
console.log("Estado del campo eliminado de PRAGMATA: ", pragmataActivo); 

// listo solamente los juegos activos
// const juegosActivos = await juegos.find({ eliminado: false }).toArray();
// console.log(juegosActivos.map(juego => juego.titulo)); */

  } catch (error) {
    console.log("error en la ejecucion", error.message);
  } finally {
    await client.close();
    console.log("conexion cerrada");
  }
}

const usuarios = db.collection("usuarios");
// CREATE USUARIO
// creo el objeto que se va a insertar como nuevo documento en la coleccion usuarios
const nuevoUsuario = {
  nombre: "Matias Martinez",
  gamer_tag: "jejox",
  email: "jejox@email.com",
  fecha_registro: new Date(),
  eliminado: false
};

await usuarios.insertOne(nuevoUsuario); // inserto el usuario en la coleccion usuarios
console.log("usuario insertado correctamente");

// READ USUARIO
// busco usuarios activos
const usuariosActivos = await usuarios.find({ eliminado: false }).toArray();

console.log("usuarios activos:");
usuariosActivos.forEach((usuario) => {
  console.log("- " + usuario.nombre + " | gamer tag: " + usuario.gamer_tag);
});

// UPDATE USUARIO
await usuarios.updateOne(
  { gamer_tag: "jejox", eliminado: false },
  {
    $set: {
      nombre: "Matias Martinez actualizado",
      email: "jejox_actualizado@email.com"
    }
  }
);

console.log("usuario actualizado");

// DELETE USUARIO
// hago baja logica cambiando eliminado a true
await usuarios.updateOne(
  { gamer_tag: "jejox", eliminado: false },
  {
    $set: {
      eliminado: true
    }
  }
);

console.log("baja del usuario realizada");

// verifico que el usuario dado de baja ya no aparezca como activo
const usuarioActivo = await usuarios.findOne({
  gamer_tag: "jejox",
  eliminado: false
});

console.log("Estado activo de jejox: ", usuarioActivo);

// listo solamente los usuarios activos
// const usuariosActivosFinal = await usuarios.find({ eliminado: false }).toArray();
// console.log(usuariosActivosFinal.map(usuario => usuario.gamer_tag));
main(); // ejecutar por separado para ir documentando el crud
