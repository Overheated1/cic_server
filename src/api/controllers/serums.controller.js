import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//GET ALL CONTROLLERS
export const getAllControllers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM commercial_serums");
        const resultUrineControl = await pool.query("SELECT * FROM urine_control");
        const resultSerums = await pool.query("SELECT * FROM processed_serum");

        let rowCommercialSerums = [];
        let rowUrineControl = [];
        let rowProcessedSerums = [];


        if(result.rows.length != 0) rowCommercialSerums = result.rows
        if(resultUrineControl.rows.length != 0) rowUrineControl = resultUrineControl.rows 
        if(resultSerums.rows.length != 0)  rowProcessedSerums = resultSerums.rows 


        if(!result.rows && !resultUrineControl.rows && !resultSerums.rows)
            res.status(200).json({"message" : "Ningún suero comercial encontrado","code" : 404})
        else{

            let formattedData = [];
            for(let i = 0;i < rowCommercialSerums.length;i++){

                formattedData.push({
                    "text":rowCommercialSerums[i]['commercial_serum_name'],
                    "value":rowCommercialSerums[i]['commercial_serum_id'],
                })
            }

            for(let i = 0;i < resultSerums.length;i++){

                formattedData.push({
                    "text":resultSerums[i]['urine_control_name'],
                    "value":resultSerums[i]['urine_control_id'],
                })
            }

            for(let i = 0;i < rowProcessedSerums.length;i++){

                formattedData.push({
                    "text":rowProcessedSerums[i]['processed_serum_name'],
                    "value":rowProcessedSerums[i]['processed_serum_id'],
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

        const result = await pool.query("SELECT * FROM commercial_serums WHERE commercial_serum_id = $1",[ id ]);

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