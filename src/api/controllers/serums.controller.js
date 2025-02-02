import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";


export const getAllCommercialSerums = async(req,res) => {
    try {
        const result = await pool.query("SELECT * FROM commercial_serums");

        let rowCommercialSerums = [];

        if(result.rows.length != 0) rowCommercialSerums = result.rows

        if(!result.rows?.length)
            res.status(200).json({"message" : "Ningún suero comercial encontrado","code" : 404})
        else{
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

//GET ALL CONTROLLERS in text value object
export const getAllControllersObjectForm = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM commercial_serums");
        const resultSamples = await pool.query("SELECT * FROM samples");

        let rowCommercialSerums = [];
        let rowSamples = [];


        if(result.rows.length != 0) rowCommercialSerums = result.rows
        if(resultSamples.rows.length != 0) rowSamples = resultSamples.rows 


        if(!result.rows && !resultSamples.rows)
            res.status(200).json({"message" : "Ningún suero comercial encontrado","code" : 404})
        else{

            let formattedData = [];
            for(let i = 0;i < rowCommercialSerums.length;i++){

                formattedData.push({
                    "text":rowCommercialSerums[i]['commercial_serum_name'],
                    "value":rowCommercialSerums[i]['commercial_serum_id'],
                })
            }

            for(let i = 0;i < rowSamples.length;i++){
                const resultTemplate = await pool.query("SELECT * FROM custom_template WHERE id = $1",[ rowSamples[i]['template_id'] ]);
                
                if(resultTemplate.rows[0]){
                    formattedData.push({
                        "text":resultTemplate.rows[0]['name'],
                        "value":rowSamples[i]['template_id'],
                    })
                }
                
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

export const deleteCommercialSerum = async (req, res) => {
    try {

        const { id } = req.params

        const result = await pool.query("DELETE FROM commercial_serums WHERE commercial_serum_id = $1",[ id ]);

        if(result.rows.length == 0) 
            res.status(200).json({"message" : "No se pudo eliminar el suero comercial","code" : 404})
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

export const updateOrCreateCommercialSerums = async (req, res) => {
    try {

        const { 
            commercial_serum_id,
            commercial_serum_name,
            commercial_brand,
            concentration,
        } = req.body.data

        let result = await pool.query("SELECT * FROM commercial_serums WHERE commercial_serum_id = $1",[ commercial_serum_id ]);

        if(result.rows.length == 0) {
            result = await pool.query("INSERT INTO commercial_serums (commercial_serum_name,commercial_brand,concentration) VALUES($1,$2,$3) RETURNING *",[ commercial_serum_name,commercial_brand,concentration ]);
            
            res.status(200).json(
                {
                    "result": result.rows[0],
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