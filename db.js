const  mysql =require('mysql2/promise');

async function connect() {
    try{
        const HOST='localhost';
        const PORT =3306;
        const USER = 'root';    
        const PASS ='BoomerCff196';
        const DATABASE ='banco_app';

        const conn = await mysql.createConnection({
            'host': HOST,
            'port': PORT,
            'user': USER,
            'database': DATABASE
        });
        console.log('conexion creada');
        return conn;

    } catch(err){
        console.log('ocurrio un error: '+ err);
        throw err;
    }
}

module.exports = connect;