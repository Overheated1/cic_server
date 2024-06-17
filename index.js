const bcrypt = require('bcryptjs');
const express = require("express");
const app = express();
const cors = require("cors");
const pool =  require("./db");
const validations = require("./validations");
const jwt = require('jsonwebtoken');


var errorCodes = [];

//middleware
app.use(cors());
app.use(express.json());

//server port
const port = 5000;

//ERROR CODES
//0 -. OK
//1 -> INVALID USERNAME
//2-> INVALID CI

//ROUTES

//create user
app.post("/insertUser",async (req,res)=>{
    try {
        const { name,password,role,ci } = req.body;

        if(validations.validateUser(name,errorCodes) && validations.validateCi(ci,errorCodes))
        {
            const result = await pool.query("INSERT INTO USERS (name,password,role,ci) VALUES($1,$2,$3,$4) RETURNING *",[name,password,role,ci])    
            res.json(result.rows[0]);
        }else
        {
            res.status(400).json(errorCodes);
        }
        
    } catch (error) {
        console.error(error)
    }
})

//get all users
app.get("/getUsers",async (req,res) =>{
    try {
        const allUsers = await pool.query("SELECT * FROM USERS");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error)
    }
})

//get password
app.post("/getUser",async (req,res) =>{
    try {
        const { name } = req.body;
        const user = await pool.query("SELECT * FROM USERS WHERE name = $1",[name]);
        user.rows['token'] = jwt.sign({ userId: user.id },`${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
        res.json(user.rows);
        console.log(process.env.JWT_SECRET)
    } catch (error) {
        console.error(error)
    }
})

//get user
app.post("/getPassword",async (req,res) =>{
    try {
        const { name } = req.body;
        const user = await pool.query("SELECT password FROM USERS WHERE name = $1",[name]);
        res.json(user.rows);
    } catch (error) {
        console.error(error)
    }
})


//get user
app.post("/getUserForCi",async (req,res) =>{
    try {
        const { ci } = req.body;
        const user = await pool.query("SELECT name FROM USERS WHERE ci = $1 ",[ci]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error)
    }
})

//update user

app.post("/updateUser", async (req,res)=>{
    try {
        const { name,password,role,ci } = req.body;
        
        if(validations.validateUser(name,errorCodes) && validations.validateCi(ci,errorCodes)){
            const updateUser = await pool.query("UPDATE USERS SET name=$1,password=$2,role=$3 WHERE ci = $4 RETURNING *",[name,password,role,ci])
            res.json(updateUser.rows[0]);
        }else{
            res.status(400).json(errorCodes);
        }
    } catch (error) {
        console.error(error)
    }
})

//delete user
app.post("/deleteUser", async (req,res)=>{
    try {
        const { ci } = req.body;
        const deleteUser = await pool.query("DELETE FROM USERS WHERE ci = $1",[ci])
        res.json(deleteUser);
    } catch (error) {
        console.error(error)
    }
})

app.listen(port,() =>{
    console.log("server has started on port " + port);
})