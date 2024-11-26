import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "nodecrud"
    }
);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/',(req,res)=> {
    const sql="select * from student";
    db.query(sql,(err,result) =>{
        if (err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})
app.post('/student',(req,res)=>{
    const sql="insert into student (`Name`,`Email`) values (?)";
    const values=[
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

// app.get('/read/:id',(req,res)=> {
//     const sql="select * from student where ID = ?";
//     const id=req.params.id;
//     db.query(sql,[id],(err,result) =>{
//         if (err) return res.json({Message:"Error inside server"});
//         return res.json(result);
//     })
// })

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE id =?";
    const id = req.params.id;
    console.log("Requested ID:", id);
    db.query(sql, [id], (err, result) => {
        console.log("Query Result:", result);
        if (err) {
            return res.status(500).json({ message: "Error inside server" });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        return res.json(result);
    });
});

app.put('/update/:id',(req,res) => {
    const sql='update student set `Name`=?,`Email`=? where ID=?';
    const id =req.params.id;
    db.query(sql,[req.body.name,req.body.email,id],(err,result) =>{
        if(err) return res.json({Message:"Error inside server"})
            return res.json(result);
    })
})

app.delete('/delete/:id',(req,res) => {
    const sql='delete from student where ID=?';
    const id =req.params.id;
    db.query(sql,[id],(err,result) =>{
        if(err) return res.json({Message:"Error inside server"})
            return res.json(result);
    })
})

app.listen(8081,()=>{
    console.log("listening to port 8081")
});