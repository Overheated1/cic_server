import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//GET ALL CONTROLLERS
export const getAllControllers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM commercial_serums");

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ningún suero comercial encontrado","code" : 404})
        else{
            let formattedData = [];
            for(let i = 0;i < result.rows.length;i++){
                formattedData.push({
                    "text":result.rows[i]['commercial_serum_name'],
                    "value":result.rows[i]['id_commercial_serum'],
                    "brand":result.rows[i]['commercial_brand'],
                    "concentration":result.rows[i]['concentration'],
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

// GET A SPECIFIC CONTROLLER

export const getControllerForId = async (req, res) => {
    try {

        const { id } = req.params

        const result = await pool.query("SELECT * FROM commercial_serums WHERE id_commercial_serum = $1",[ id ]);

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ningún suero comercial encontrado para ese id","code" : 404})
        else{
            res.status(200).json(
                {
                    "result": result.rows[0],
                    "code": 200,
                }
            );
        }
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}