const express = require("express");
const app = express();
const cors = require("cors");
const pool =  require("./db");
const validations = require("./validations");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create user
app.post("/putUser",async (req,res)=>{
    try {
        const { user_n,password,deep_l,ci } = req.body;
        if(validations.validateUser(user_n) && validations.validateCi(ci)){
            const newUser = await pool.query("INSERT INTO USR (user_n,password,deep_l,ci) VALUES($1,$2,$3,$4) RETURNING *",[user_n,password,deep_l,ci])    
            res.json(newUser.rows[0]);
        }else{
            res.status(400).json({ errorUsr: 'Nombre de usuario incorrecto' });
        }
        
    } catch (error) {
        console.log(error)
    }
})

//get all users
app.get("/getUsers",async (req,res) =>{
    try {
        const allUsers = await pool.query("SELECT * FROM USR");
        res.json(allUsers.rows);
    } catch (error) {
        console.log(error)
    }
})

//get user
app.post("/getUser",async (req,res) =>{
    try {
        const { user_n,password } = req.body;
        const user = await pool.query("SELECT * FROM USR WHERE user_n = $1 AND password = $2",[user_n,password]);
        res.json(user.rows);
        
    } catch (error) {
        console.log(error)
    }
})

//get user
app.post("/getUserForCi",async (req,res) =>{
    try {
        const { ci } = req.body;
        const user = await pool.query("SELECT user_n FROM USR WHERE ci = $1 ",[ci]);
        res.json(user.rows[0]);
    } catch (error) {
        console.log(error)
    }
})

//update user

app.post("/updateUser", async (req,res)=>{
    try {
        const { user_n,password,deep_l,ci } = req.body;
        const updateUser = await pool.query("UPDATE USR SET user_n=$1,password=$2,deep_l=$3 WHERE ci = $4 RETURNING *",[user_n,password,deep_l,ci])
        res.json(updateUser.rows);
    } catch (error) {
        console.log(error)
    }
})

//delete user
app.post("/deleteUser", async (req,res)=>{
    try {
        const { ci } = req.body;
        const deleteUser = await pool.query("DELETE FROM USR WHERE ci = $1",[ci])
        res.json(deleteUser);
    } catch (error) {
        console.log(error)
    }
})

app.listen(pool.options.port,() =>{
    console.log("server has started on port " + pool.options.port);
})