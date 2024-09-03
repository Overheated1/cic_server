import pool from "../../db.js"; 
import jwt from "jsonwebtoken";

//INSERT A USER
export const insertUser = async (req, res) => {
    try {
        const {
            name,
            password,
            role,
            ci
        } = req.body;

        const result = await pool.query("INSERT INTO USERS (name,password,role,ci) VALUES($1,$2,$3,$4) RETURNING *", [name, password, role, ci])

        if(result.rows.length == 0){
            res.status(200).json({
                "result": result.rows,
                "code" : 409,
                "message" : "Usuario no insertado"
            });
        }else{
            res.status(200).json({
                "result": result.rows,
                "code" : 200,
            });
        }
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}


//GET ALL USERS
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuario no encontrado","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result.rows,
                    "code": 200,
                }
            );

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
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

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
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
            

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}


//UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const {
            name,
            password,
            ci,
            email
        } = req.body;

            const result = await pool.query("UPDATE users SET name=$1,password=$2,role=$3,email=$5 WHERE ci = $4 RETURNING *", [name, password,ci,email])
            
            if(result.rows.length == 0) 
                res.status(409).json({"message" : "Usuario no actualizado","code" : 409})
            else
                res.status(200).json(
                    {
                        "result": result.rows,
                        "code": 200,
                        "result": "Usuario actualizado correctamente"
                    }
                );

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { ci } = req.params;
        const result = await pool.query("DELETE FROM users WHERE ci = $1 RETURNING *", [ci])
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Usuario no eliminado","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result.rows,
                    "code": 200,
                    "result": "Usuario eliminado correctamente"
                }
            );

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}
