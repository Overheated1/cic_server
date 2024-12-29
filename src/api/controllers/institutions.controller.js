import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//GET ALL INSTITUTIONS
export const getAllInstitutions = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM institutions");
        
        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ninguna institución encontrada","code" : 404})
        else{
            let formattedData = []
            for(let i = 0;i < result.rows.length;i++){
                formattedData.push({
                    "text":result.rows[i]['institution_name'],
                    "value":result.rows[i]['institution_id'],
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


//GET USER BY ID
export const getInstitution = async (req, res) => {
    try {
        const { institution_id } = req.params;

        const result = await pool.query("SELECT * FROM institutions WHERE institution_id = $1", [institution_id]);
        
        if(result.rows.length == 0) 
            res.status(409).json({"message" : "Institución no encontrada","code" : 409})
        else
            res.status(200).json(
                {
                    "result": result.rows[0],
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
