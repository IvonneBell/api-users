const express = require('express'); //FRAMEWORK
const app = express();
const PORT = 3000;
const connect=require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/users', async(req, res)=>{
    let db;
    try {

        db = await connect();
        const query ='SELECT * FROM usuarios';
        const [row] =await db.execute(query);
        console.log(row);
        res.json({
            status:200, 
            users: row
        });
    }catch(err){
        console.log(err);
    }
});

app.post('/users', async(req, res)=>{

    console.log(req.body);
    

    let db;
    try {
        const {nombre, contrasena, apellido, correo} = req.body;
        db = await connect();
        const query =`INSERT INTO usuarios(nombre, apellido, correo, contrasena)VALUES('${nombre}','${apellido}','${correo}','${contrasena}')`;
        const [row] =await db.execute(query);
        console.log(row);
        res.json({
            status:200, 
            users: row
        });
    }catch(err){
        console.log(err);
    }
});

app.get('/users/:email', async (req, res)=>{
    const email =req.params.email;
    let db;
    try {
        db = await connect();
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [row]= await db.execute(query, [email]);
        console.log(row);
        res.json({
            'status':200,
            'users':row
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete('/users/:email', async (req,res)=>{
    const email =req.params.email;
    console.log(email);

    let db;
    try {
        db = await connect();
        const query = 'DELETE FROM usuarios WHERE email = ?';
        const [row]= await db.execute(query, [email]);
        if(row.affectedRows === 0) {
            res.json({
                'users': [],
                'status': 404,
                'msg': 'Email no encontrado',
            })
        }else{
            res.json({
                'status':200,
                'users':[]
            });

        }
    } catch (err) {
        console.log(err);
    }
});

app.put('/users/:email', async (req, res)=>{
    const email = req.params.email;
    const {nombre}= req.body;

    try {
        db = await connect();
        const query = 'UPDATE usuarios SET nombre = ? where email = ?';
        const [row]= await db.execute(query, [nombre, email]);
        if(row.affectedRows === 0) {
            res.json({
                'users': [],
                'status': 404,
                'msg': 'Email no encontrado',
            })
        }else{
            res.json({
                'status':200,
                'users':[]
            });

        }
    } catch (err) {
        console.log(err);
    }
});


app.listen(PORT, ()=>{
    console.log(`Escuchando por el puerto ${PORT}`);
});