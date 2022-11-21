import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marcas } from './marcas.service';
import { Rutas } from './rutas.service';
import { UsuariosService } from './usuarios.service';
import { Vehiculos } from './vehiculos.service';

@Injectable({
  providedIn: 'root'
})
export class BdservicioService {

  public database: SQLiteObject;
  //variable para la sentencia de creación de las tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL(id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(10));";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario VARCHAR(30), clave VARCHAR(30), nombre VARCHAR(30), apellidos VARCHAR(50), email VARCHAR(40), rol_id INTEGER, foto BLOB,  foreign key(rol_id) references ROL(id_rol));";
  tablaMarca: string = "CREATE TABLE IF NOT EXISTS MARCA(id_marca INTEGER PRIMARY KEY AUTOINCREMENT, nombre_marca VARCHAR(20));";
  tablaAuto: string = "CREATE TABLE IF NOT EXISTS AUTO(patente VARCHAR(9) PRIMARY KEY, color VARCHAR(20), modelo VARCHAR(30), annio INTEGER, usuario_id INTEGER, marca_id INTEGER, foreign key(usuario_id) references USUARIO(id_usuario), foreign key(marca_id) references MARCA(id_marca));";

  tablaViaje: string = "CREATE TABLE IF NOT EXISTS VIAJE(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, fecha_viaje TEXT, hora_salida VARCHAR(30), asientos_dispo INTEGER, asientos_ocupados INTEGER, monto INTEGER, patente_auto VARCHAR(9), origen VARCHAR(80), destino VARCHAR(80), foreign key(patente_auto) references AUTO(patente) ON DELETE CASCADE);";

  tablaDetalleViaje = "CREATE TABLE IF NOT EXISTS DETALLE_VIAJE(viaje_id INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, status INTEGER, foreign key(usuario_id_usuario) references USUARIO(id_usuario), foreign key(viaje_id) references VIAJE(id_viaje), PRIMARY KEY(viaje_id, usuario_id_usuario) );";


  //variable para la sentencia de registros por defecto en la tabla
  registroRol: string = "INSERT or IGNORE INTO ROL(id_rol,nombre_rol) VALUES (1,'Conductor');";
  registroRol2: string = "INSERT or IGNORE INTO ROL(id_rol,nombre_rol) VALUES (2,'Pasajero');";

  //Registros de marcas
  registroMarca: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (1,'AUDI');";
  registroMarca2: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (2,'MAZDA');";
  registroMarca3: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (3,'NISSAN');";
  registroMarca4: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (4,'CHEVROLET');";
  registroMarca5: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (5,'HYUNDAI');";
  registroMarca6: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (6,'TOYOTA');";
  registroMarca7: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (7,'SUZUKI');";
  registroMarca8: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (8,'HONDA');";
  registroMarca9: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (9,'BMW');";



  listaVehiculos = new BehaviorSubject([]);
  listaMarcas = new BehaviorSubject([]);
  listaRutas = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);
  rutaActual = new BehaviorSubject({});


  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) {

    this.crearBD()

  }


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      icon: 'globe',
      color: 'success'
    });
    await toast.present();

  }
  async presentToast2(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      icon: 'globe',
      color: 'danger'
    });
    await toast.present();

  }

  async presentAlert(header, sub, msj) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: sub,
      message: msj,
    });
    await alert.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchVehiculos(): Observable<Vehiculos[]> {
    return this.listaVehiculos.asObservable();
  }

  fetchMarcas(): Observable<Marcas[]> {
    return this.listaMarcas.asObservable();
  }


  fetchRutas(): Observable<Rutas[]> {
    return this.listaRutas.asObservable();
  }
  fetchUsuarios(): Observable<UsuariosService[]> {
    return this.listaUsuarios.asObservable();
  }




  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'vexallfinalx23233424.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {

      //ejecuto mis tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaMarca, []);
      await this.database.executeSql(this.tablaAuto, []);
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaDetalleViaje, []);

      //ejecuto mis registros
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroMarca, []);
      await this.database.executeSql(this.registroMarca2, []);
      await this.database.executeSql(this.registroMarca3, []);
      await this.database.executeSql(this.registroMarca4, []);
      await this.database.executeSql(this.registroMarca5, []);
      await this.database.executeSql(this.registroMarca6, []);
      await this.database.executeSql(this.registroMarca7, []);
      await this.database.executeSql(this.registroMarca8, []);
      await this.database.executeSql(this.registroMarca9, []);


      //cargar registros en observable
      this.buscarVehiculos();
      this.buscarMarcas();
      this.buscarUsuarios();
      this.buscarRutas();

      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }

  buscarVehiculos() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM AUTO A INNER JOIN MARCA M ON (A.MARCA_ID = M.ID_MARCA)', []).then(res => {
      //creo mi lista de objetos vacio
      let items: Vehiculos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            annio: res.rows.item(i).annio,
            marca_id: res.rows.item(i).marca_id,
            usuario_id: res.rows.item(i).usuario_id,
            nombre_marca: res.rows.item(i).nombre_marca
          })
        }
      }
      //actualizamos el observable 
      this.listaVehiculos.next(items);
    })
  }

  buscarMarcas() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM MARCA', []).then(res => {
      //creo mi lista de objetos de marcas vacio
      let items: Marcas[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_marca: res.rows.item(i).id_marca,
            nombre_marca: res.rows.item(i).nombre_marca,
          })
        }

      }
      //actualizamos el observable de las marcas
      this.listaMarcas.next(items);
    })
  }

  buscarUsuarios() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM USUARIO', []).then(res => {
      //creo mi lista de objetos de marcas vacio
      let items: UsuariosService[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            clave: res.rows.item(i).clave,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            email: res.rows.item(i).email,
            rol_id: res.rows.item(i).rol_id,
            foto: res.rows.item(i).foto
          })
        }

      }
      //actualizamos el observable de los usuarios
      this.listaUsuarios.next(items);
    })
  }

  validarUsuario(nombre, clave) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT COUNT(NOMBRE_USUARIO) AS CONTENOMBRE, COUNT(CLAVE) AS CONTECLAVE FROM USUARIO WHERE NOMBRE_USUARIO = ? AND CLAVE = ?', [nombre, clave]).then(res => {
      if (res.rows.item(0).CONTENOMBRE === 0 && res.rows.item(0).CONTECLAVE === 0) {
        return true;
      }
      return false;
    })
  }


  mandarDatosUsuario(nombre_usuario) {
    let usuario = {
      id_usuario: '',
      nombre_usuario: '',
      clave: '',
      nombre: '',
      apellidos: '',
      email: '',
      rol_id: '',
      foto: Blob
    }

    return this.database.executeSql('SELECT * FROM USUARIO WHERE nombre_usuario = ?', [nombre_usuario]).then((res) => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          usuario = {
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            clave: res.rows.item(i).clave,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,
            email: res.rows.item(i).email,
            rol_id: res.rows.item(i).rol_id,
            foto: res.rows.item(i).foto
          }
        }
      }
      return usuario;
    })
  }

  editarFotoUsuario(id_usuario, foto) {
    let data = [foto, id_usuario]
    return this.database.executeSql('UPDATE USUARIO SET FOTO = ? WHERE ID_USUARIO = ? ', data).then((res) => {
      this.buscarUsuarios()
    })
  }

  validarClave(clave) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT COUNT(CLAVE) AS CONTECLAVE FROM USUARIO WHERE CLAVE = ?', [clave]).then(res => {
      if (res.rows.item(0).CONTECLAVE === 0) {
        return true;
      }
      return false;
    })
  }

  validarNombre(nombre: string) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT COUNT(NOMBRE_USUARIO) AS CONTENOM FROM USUARIO WHERE NOMBRE_USUARIO = ?', [nombre]).then(res => {
      if (res.rows.item(0).CONTENOM === 0) {
        return true;
      }
      return false;
    })
    
  }

  editarClaveNombre(clave, nombre) {
    let data = [clave, nombre]
    return this.database.executeSql('UPDATE USUARIO SET CLAVE = ? WHERE NOMBRE_USUARIO = ? ', data).then((res) => {
      this.buscarUsuarios()
    })
  }


  editarClaveUsuario(id_usuario, clave) {
    let data = [clave, id_usuario]
    return this.database.executeSql('UPDATE USUARIO SET CLAVE = ? WHERE ID_USUARIO = ? ', data).then((res) => {
      this.buscarUsuarios()
    })
  }

  agregarVehiculo(patente, color, modelo, annio, marca_id, usuario_id) {
    let data = [patente, color, modelo, annio, marca_id, usuario_id];
    return this.database.executeSql('INSERT INTO AUTO(patente, color, modelo, annio, marca_id, usuario_id) VALUES (?,?,?,?,?,?)', data).then(res => {
      this.buscarVehiculos();
    });
  }

  eliminarVehiculo(patentev) {
    return this.database.executeSql('DELETE FROM AUTO WHERE patente = ?', [patentev]).then(a => {
      this.buscarVehiculos();
    })

  }

  agregarUsuario(id_usuario, nombre_usuario, clave, nombre, apellidos, email, rol_id, foto: Blob) {
    let data = [id_usuario, nombre_usuario, clave, nombre, apellidos, email, rol_id, foto];
    return this.database.executeSql('INSERT OR IGNORE INTO USUARIO(id_usuario, nombre_usuario, clave, nombre, apellidos, email, rol_id, foto) VALUES (?,?,?,?,?,?,?,?)', data).then(res => {
      this.buscarUsuarios()
    })
  }

  modificarUsuario(nombre_usuario, nombre, apellidos, email, id) {
    let data = [nombre_usuario, nombre, apellidos, email, id]
    return this.database.executeSql('UPDATE USUARIO SET NOMBRE_USUARIO = ?, NOMBRE = ?, APELLIDOS = ?, EMAIL= ? WHERE ID_USUARIO = ? ', data).then((res) => {
      this.buscarUsuarios()
    })
  }

  unirseRuta(id_usuario, id_viaje) {
    let data = [id_usuario, id_viaje, 1];
    return this.database.executeSql('INSERT OR IGNORE INTO DETALLE_VIAJE(viaje_id, usuario_id_usuario, status) VALUES(?, ?, ?)', data).then(res => {
      this.buscarRutas()
    })
  }

  updateRuta(id_viaje){
    this.database.executeSql('UPDATE VIAJE SET ASIENTOS_DISPO = ASIENTOS_DISPO - 1, ASIENTOS_OCUPADOS = ASIENTOS_OCUPADOS + 1 WHERE ID_VIAJE = ?', [id_viaje]).then(res => {
      this.buscarRutas()
    })
  }

  updateRuta2(id_viaje){
    this.database.executeSql('UPDATE VIAJE SET ASIENTOS_DISPO = ASIENTOS_DISPO + 1, ASIENTOS_OCUPADOS = ASIENTOS_OCUPADOS - 1 WHERE ID_VIAJE = ?', [id_viaje]).then(res => {
      this.buscarRutas()
    })
  }

  empezarRuta(id_viaje){
    return this.database.executeSql('UPDATE DETALLE_VIAJE SET STATUS = 2 WHERE VIAJE_ID = ? ', [id_viaje]).then((res) => {
      this.buscarRutas()
    })
  }

  terminarRuta(id_viaje){
    return this.database.executeSql('UPDATE DETALLE_VIAJE SET STATUS = 3 WHERE VIAJE_ID = ? ', [id_viaje]).then((res) => {
      this.buscarRutas()
    })
  }

  cancelarRuta(id_usuario, id_viaje) {
    let data = [id_viaje, id_usuario];
    return this.database.executeSql('DELETE FROM DETALLE_VIAJE WHERE VIAJE_ID = ? AND USUARIO_ID_USUARIO = ? ', data).then(res => {
      this.buscarRutas()
      this.rutaActual.next({"usuario_id":"","nombre_usuario":"","viaje_id":"","fecha_viaje":"","hora_salida":"","asientos_dispo":"","monto":"","origen":"","destino":"","status":""})
    })
  }

  eliminarRuta(id_viaje) {
    return this.database.executeSql('DELETE FROM DETALLE_VIAJE WHERE VIAJE_ID = ?', [id_viaje]), this.database.executeSql('DELETE FROM VIAJE WHERE ID_VIAJE = ?', [id_viaje]).then(res => {
      this.buscarRutas()
      this.rutaActual.next({"usuario_id":"","nombre_usuario":"","viaje_id":"","fecha_viaje":"","hora_salida":"","asientos_dispo":"","monto":"","origen":"","destino":"","status":""})
    })
  }

  agregarRuta(fecha_viaje, hora_salida, asientos_dispo, asientos_ocupados, monto, patente_auto, id_usuario, status, origen, destino) {
    let data = [fecha_viaje, hora_salida, asientos_dispo, asientos_ocupados, monto, patente_auto, origen, destino];
    let data2 = [id_usuario, status]

    let dataG = {
      fecha_viaje, hora_salida, asientos_dispo,asientos_ocupados, monto, patente_auto, origen, destino,
      id_usuario, status
    }
    let id_viaje

    return this.database.executeSql('INSERT INTO VIAJE(fecha_viaje, hora_salida, asientos_dispo, asientos_ocupados, monto, patente_auto, origen, destino) VALUES (?,?,?,?,?,?,?,?)', data),
      this.database.executeSql('SELECT MAX(ID_VIAJE) AS ID FROM VIAJE', []).then(res => {
        id_viaje = res.rows.item(0).ID
        let data2A = data2.unshift(id_viaje)

        this.database.executeSql('INSERT INTO DETALLE_VIAJE(viaje_id, usuario_id_usuario, status) VALUES (?,?,?)', data2).then(res => {
          this.buscarRutas();
          this.rutaActual.next(dataG)
        })
      })
  }

  buscarRutas() {
    return this.database.executeSql('SELECT * FROM AUTO A JOIN VIAJE V ON(A.PATENTE = V.PATENTE_AUTO) JOIN DETALLE_VIAJE DV ON(V.ID_VIAJE = DV.VIAJE_ID) JOIN USUARIO U ON(U.ID_USUARIO = DV.USUARIO_ID_USUARIO)', []).then(res => {

      let items: Rutas[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            //USUARIO
            usuario_id: res.rows.item(i).id_usuario,
            viaje_id: res.rows.item(i).id_viaje,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            //AUTO
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            patente: res.rows.item(i).patente,
            //VIAJE
            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            asientos_ocupados: res.rows.item(i).asientos_ocupados,
            monto: res.rows.item(i).monto,

            origen: res.rows.item(i).origen,
            destino: res.rows.item(i).destino,
            status: res.rows.item(i).status
          })
        }
      }
      this.listaRutas.next(items);
    })
  }

  buscarRuta(id_viaje) {
    let rutaSeleccionada = {
      usuario_id: '',
      viaje_id: '',
      nombre_usuario: '',

      color: '',
      modelo: '',
      patente: '',

      fecha_viaje: '',
      hora_salida: '',
      asientos_dispo: '',
      asientos_ocupados: '',
      monto: '',
      origen: '',
      destino: '',
      status: ''
    }
    return this.database.executeSql('SELECT * FROM VIAJE V JOIN DETALLE_VIAJE DV ON(V.ID_VIAJE = DV.VIAJE_ID) JOIN USUARIO U ON(U.ID_USUARIO = DV.USUARIO_ID_USUARIO) JOIN AUTO A ON(A.USUARIO_ID = U.ID_USUARIO) WHERE DV.VIAJE_ID = ?', [id_viaje]).then(res => {

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          rutaSeleccionada = {
            usuario_id: res.rows.item(i).id_usuario,
            viaje_id: res.rows.item(i).id_viaje,
            nombre_usuario: res.rows.item(i).nombre_usuario,

            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            patente: res.rows.item(i).patente,

            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            asientos_ocupados: res.rows.item(i).asientos_ocupados,
            monto: res.rows.item(i).monto,
            origen: res.rows.item(i).origen,
            destino: res.rows.item(i).destino,
            status: res.rows.item(i).status,
          }
        }
      }
      this.rutaActual.next(rutaSeleccionada)
      return rutaSeleccionada;
    })
  }

  buscarRutaActual(id_usuario, id2) {
    let data = [id_usuario, id2]
    return this.database.executeSql('SELECT * FROM VIAJE V JOIN DETALLE_VIAJE DV ON(V.ID_VIAJE = DV.VIAJE_ID) JOIN USUARIO U ON(U.ID_USUARIO = DV.USUARIO_ID_USUARIO) WHERE DV.USUARIO_ID_USUARIO = ? AND DV.STATUS = 1 OR DV.USUARIO_ID_USUARIO = ? AND DV.STATUS = 2 ', data).then(res => {
      let rutaSeleccionada = {
        usuario_id: '',
        nombre_usuario: '',
        viaje_id: '',
        fecha_viaje: '',
        hora_salida: '',
        asientos_dispo: '',
        asientos_ocupados: '',
        monto: '',
        origen: '',
        destino: '',
        status: ''
      }

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          rutaSeleccionada = {
            usuario_id: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            viaje_id: res.rows.item(i).viaje_id,
            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            asientos_ocupados: res.rows.item(i).asientos_ocupados,
            monto: res.rows.item(i).monto,
            origen: res.rows.item(i).origen,
            destino: res.rows.item(i).destino,
            status: res.rows.item(i).status,
          }
        }
      }
      this.rutaActual.next(rutaSeleccionada)
      return rutaSeleccionada
    })
  }

  buscarPasajeros(id_viaje) {
    return this.database.executeSql('SELECT * FROM DETALLE_VIAJE DV JOIN USUARIO U ON(DV.USUARIO_ID_USUARIO = U.ID_USUARIO) WHERE DV.VIAJE_ID = ? AND U.ROL_ID = 2 ', [id_viaje]).then((res) => {
      let pasajeros = []
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          pasajeros.push({
            nombre: res.rows.item(i).nombre_usuario,
            id_usuario: res.rows.item(i).id_usuario
          })
        }
      }
      return pasajeros;
    })
  }

  generarReporte(fecha1, fecha2, id_usuario) {
    let reportes =[]
    let datos = [fecha1, fecha2, id_usuario]
    return this.database.executeSql("SELECT * FROM DETALLE_VIAJE DV JOIN VIAJE V ON (DV.VIAJE_ID = V.ID_VIAJE)  WHERE FECHA_VIAJE BETWEEN ? AND ? AND USUARIO_ID_USUARIO = ?  AND STATUS = 3", datos).then(res => {


      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {     
          reportes.push({
            id_viaje: res.rows.item(i).id_viaje,
            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_ocupados: res.rows.item(i).asientos_ocupados,
            id_usuario: res.rows.item(i).id_usuario,
            status: res.rows.item(i).status,
            monto: res.rows.item(i).monto,
          })
        }
      }
        return reportes
    })
  }

}