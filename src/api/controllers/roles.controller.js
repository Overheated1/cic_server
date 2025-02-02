import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";


//GET ALL CONTROLLERS in text value object
export const getRolesObjectForm = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roles");

        if(!result.rows)
            res.status(200).json({"message" : "Ningún rol encontrado","code" : 404})
        else{

            let formattedData = [];
            for(let i = 0;i < result.rows.length;i++){

                formattedData.push({
                    text:result.rows[i]['role_name'],
                    value:result.rows[i]['role_id'],
                    customAttributes:{
                        "role_deep_level":result.rows[i]['role_deep_level'],
                    }})
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
