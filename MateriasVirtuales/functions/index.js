const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const bucket = admin.storage().bucket();

/** ========================limpieza  del storage ==========================*/

exports.borrarCarpeta = functions
  .firestore
  .document('Materia/{Id}')
  .onDelete((change, context) => {
    return new Promise((resolve, error) => {
      bucket.deleteFiles({
        directory: `${context.params.Id}/`,
        force: true
      }, (err) => {
        if (!err) {
          resolve("archivos eliminados");
        } else
          error(err);
      });

    })
  });

  /**====================== creacion de usuarios ===================================*/

exports.crearAdmin = functions.firestore
  .document('Administrador/{id}')
  .onCreate((snap, context) => {
    const usuario = snap.data();
    let usu = {
      displayName: usuario.Nombres + ' ' + usuario.Apellidos,
      email: usuario.Email,
      password: usuario.Nombres.substring(0, 4) + '_admin2020.',
      uid: snap.id
    };
    return admin.auth().createUser(usu)
      .then(() => {
        return admin.auth().setCustomUserClaims(snap.id, { administrador: true })
      })
  })

  exports.crearProfe = functions.firestore
  .document('Profesor/{id}')
  .onCreate((snap, context) => {
    const usuario = snap.data();
    let usu = {
      displayName: usuario.Nombres + ' ' + usuario.Apellidos,
      email: usuario.Email,
      password: usuario.Nombres.substring(0, 4) + '_prof2020.',
      uid: snap.id
    };
    return admin.auth().createUser(usu)
      .then(() => {
        return admin.auth().setCustomUserClaims(snap.id, { profesor: true })
      })
  })

  /** ============= actualizacion de estados ====================================== */

exports.estadoProfesor = functions.firestore
.document('Profesor/{id}')
.onUpdate(cambiarEstado)

exports.estadoEstudiante = functions.firestore
.document('Estudiante/{id}')
.onUpdate(cambiarEstado)

function cambiarEstado(snap, context) {
  const usuario = snap.after.data();
  let usu = {
    disabled: !usuario.Activo
  }
  return admin.auth().updateUser(usuario.Id, usu)
}

/*================ Eliminacion de usuarios======================================= */

exports.eliminarProfesor = functions.firestore
.document('Profesor/{id}')
.onDelete(eliminarUsuario)

exports.eliminarEstudiante = functions.firestore
.document('Estudiante/{id}')
.onDelete(eliminarUsuario)

exports.eliminarAdministrador = functions.firestore
.document('Administrador/{id}')
.onDelete(eliminarUsuario)

function eliminarUsuario(snap, context) {
  return admin.auth().deleteUser(snap.id)
}

/* =======================seteo de claim estudiante=========================================*/

exports.claimEstudiante = functions.firestore
.document('Estudiante/{id}')
.onCreate((snap, context)=>{
  const usuario = snap.data();
  let usu = {
    displayName: usuario.Nombres + ' ' + usuario.Apellidos
  }
  return admin.auth().updateUser(snap.id, usu)
  .then(() => admin.auth().setCustomUserClaims(snap.id, { estudiante: true }))
})
