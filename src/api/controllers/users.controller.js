import pool from "../../db.js"; 
import jwt from "jsonwebtoken";
import { updateQueryLogs } from "../utils/utils.js";

//INSERT A USER
export const updateOrCreateUser = async (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
        const {
            id,
            name,
            password,
            ci,
            email,
            role_id,
        } = req.body;

        let is_insertion_op = true;
        let result = await pool.query("SELECT u.id FROM users as u INNER JOIN users_roles as ur ON u.id = ur.user_id JOIN roles as r ON ur.role_id = r.role_id WHERE u.id = $1", [id]);
        console.log(result.rows,id);
        if(result.rows.length){
            is_insertion_op = false;
            result = await pool.query("UPDATE users SET name = $1,password = $2,ci = $3,email = $4 WHERE id=$5 RETURNING *", [name,password,ci,email,id]);
        }else{
            result = await pool.query("INSERT INTO users (name,password,ci,email,user_created_date) VALUES($1,$2,$3,$4,$5) RETURNING *", [name,password,ci,email,currentDate])
            if(result?.rows?.length)
                result = await pool.query("INSERT INTO users_roles (role_id,user_id) VALUES($1,$2) RETURNING *", [role_id,result.rows[0]['id']])
        }

        if(result.rows.length == 0){
            res.status(200).json({
                "result": result.rows,
                "code" : 409,
                "message" : `Usuario no insertado${is_insertion_op ? "insertado" : "actualizado"}`
            });
        }else{
            res.status(200).json({
                "result": result.rows,
                "code" : 200,
            });
        }

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}


export const getUsersActualYear = async (req,res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    try {
        const usersByYear = await pool.query(`SELECT EXTRACT(YEAR FROM user_created_date) AS year, COUNT(*) AS total_users FROM users WHERE EXTRACT(YEAR FROM user_created_date) IN ($1, $2) GROUP BY year`,[currentYear, previousYear]);

        const result = usersByYear.rows.reduce((acc, row) => {
            acc[row.year] = row.total_users;
            return acc;
        }, {});

        if(Object.keys(result).length < 2){
            result[previousYear] = "0";
        }

        const currentYearUsers = parseInt(result[currentYear]);
        const previousYearUsers = parseInt(result[previousYear] || 0);
        const userChangePercentage = previousYearUsers ? ((currentYearUsers - previousYearUsers) / previousYearUsers) * 100 : 0;

        result['user_change_percent'] = userChangePercentage;

        if(Object.keys(result).length == 0) 
            res.status(409).json({"message" : "No se pudo obtener la información de los usuarios","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result,
                    "code": 200,
                }
            );

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}


//GET ALL USERS
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuarios no encontrados","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result.rows,
                    "code": 200,
                }
            );

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

//GET USER BY ID
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("SELECT u.id,u.ci,u.name,u.password,r.role_name,r.role_deep_level FROM users as u INNER JOIN users_roles as ur ON u.id = ur.user_id JOIN roles as r ON ur.role_id = r.role_id WHERE u.id = $1", [id]);

        result.rows['token'] = jwt.sign({
            userId: user.id
        }, `${process.env.JWT_SECRET_KEY}`, {
            expiresIn: '1h'
        });
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuario no encontrado","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result.rows,
                    "code": 200,
                }
            );

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

//GET USER BY CI
export const getUserByCi = async (req, res) => {
    try {
        const { ci } = req.params;

        const result = await pool.query("SELECT u.id,u.ci,u.name,u.password,r.role_name,r.role_deep_level FROM users as u INNER JOIN users_roles as ur ON u.id = ur.user_id JOIN roles as r ON ur.role_id = r.role_id WHERE u.ci = $1", [ci]);

        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuario no encontrado","code" : 409})
        else{
            
        result.rows[0]['token'] = jwt.sign({
                roleDeepLevel: result.rows[0].role_deep_level
            }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: '1h'
            });
        
        res.status(200).json(
            {
                "result": result.rows,
                "code": 200,
            }
        );

        }
            
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        let result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
        let result_roles = await pool.query("DELETE FROM users_roles WHERE user_id = $1 RETURNING *", [id])
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuario no eliminado","code" : 409})
        else
            res.status(200).json(
                {
                    "result": [...result.rows],
                    "code": 200,
                    "result": "Usuario eliminado correctamente"
                }
            );

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}
