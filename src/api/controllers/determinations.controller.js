import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//GET ALL DETERMINATIONS
export const getAllDeterminations = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM determinations");

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ninguna determinación enontrada","code" : 404})
        else{
            let formattedData = []

            for(let i = 0;i < result.rows.length;i++){
                formattedData.push({
                    "text":result.rows[i]['determination_name'].toLowerCase(),
                    "value":result.rows[i]['determination_id'],
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

//GET ALL DETERMINATIONS
export const getDeterminationsWithoutReproducibility = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM determinations WHERE determination_id NOT IN(SELECT th.determination_id FROM table_headers as th JOIN reproducibility_tables as rt ON th.header_id = rt.header_id JOIN reproducibility_tables_fragments as rtf ON rtf.reproducibility_id = rt.reproducibility_id  WHERE rtf.date = $1);",[new Date().toISOString().split("T")[0]]);
        // the below query fail when there is no data in table_headers || reproducibility_tables because the join that no success
        // SELECT * FROM determinations as ds JOIN table_headers th ON ds.determination_id != th.determination_id JOIN repeatability_tables as rt ON th.header_id = rt.header_id  WHERE rt.repeatability_date = $1;

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "Ninguna determinación enontrada","code" : 404})
        else{
            let formattedData = []

            for(let i = 0;i < result.rows.length;i++){
                formattedData.push({
                    "text":result.rows[i]['determination_name'].toLowerCase(),
                    "value":result.rows[i]['determination_id'],
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
