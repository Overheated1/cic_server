import pool from "../../db.js";
import { updateQueryLogs } from "../utils/utils.js"; 

//INSERT A TEMPERATURE TYPE
export const insertTemperature = async (req, res) => {
    try {
        const {
            temperature_name
        } = req.body;

        const result = await pool.query("INSERT INTO temperatures_types (temperature_name) VALUES($1) RETURNING *", [temperature_name])
        
        if(result.rows.length == 0){
            res.status(200).json({
                "result": result.rows,
                "code" : 409,
                "message" : "Tipo de temperatura no insertada"
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

//GET ALL TEMPERATURES
export const getAllTemperatures = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM temperature_types");

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ningún tipo de temperatura encontrado","code" : 404})
        else{
            let formattedData = [];

            for(let i = 0;i < result.rows.length;i++){
                formattedData.push({
                    "text":result.rows[i]['temperature_name'],
                    "value":result.rows[i]['temperature_id'],
                })
            }

            res.status(200).json(
                {
                    "result": formattedData,
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