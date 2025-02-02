import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

export const updateOrCreateSamples = async (req, res) => {
    try {

        let sample_id = -1;
        let template_id = -1;
        let fetchedData = req.body;

        let keysFetchedData = Object.keys(fetchedData);
        let neededFetchedKeys = [];
        let neededFetchedData = [];
        for(let i = 0;i < keysFetchedData.length;i++){
            let key = keysFetchedData[i];

            if(key == "template_id")
                template_id = fetchedData[key]
            else{
                neededFetchedKeys.push(key);
                neededFetchedData.push(fetchedData[key]);
            }
        }
        
        let result = await pool.query("SELECT * FROM samples WHERE sample_id = $1",[ sample_id ]);

        if(result.rows.length == 0) {
            result = await pool.query("INSERT INTO samples (template_id) VALUES($1) RETURNING *",[ template_id ]);

            if(!result.rows[0]) return;

            let resultFields = [result.rows[0]];
            let sample_id = result.rows[0]['sample_id'];


            for(let i =0;i < neededFetchedData.length;i++){
                let template_field_id = neededFetchedKeys[i];
                let sample_field_value = neededFetchedData[i];

                result = await pool.query(`INSERT INTO samples_fields (sample_id,template_field_id,sample_field_value) VALUES($1,$2,$3) RETURNING *`,[ sample_id,template_field_id,sample_field_value ])
                if(result.rows[0])
                    resultFields.push(result.rows[0]);
            }
            
            console.log("resultFields",resultFields);
            res.status(200).json(
                {
                    "result": resultFields,
                    "code": 200,
                }
            );
        }else{
            result = await pool.query("UPDATE commercial_serums SET commercial_serum_name = $1,commercial_brand = $2,concentration = $3) WHERE commercial_serum_id = $4",[ commercial_serum_name,commercial_brand,concentration,commercial_serum_id ]);
            
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