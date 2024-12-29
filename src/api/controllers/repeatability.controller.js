import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//INSERT ONE REPEATABILITY
export const insertRepeatability = async (req, res) => {
    try {
        const {
            formHeaders,
            tableFragments,
        } = req.body;
        
        const {
            controller_id,
            temperature_value,
            institution_id,
            determination_id,
            temperature_type,
            equipment_name,
            header_id,
            analytic_method_name,
            analytic_technique_name,
            repeatability_id,
            repeatability_date,
        } = formHeaders;

            let result_header = undefined;
            let result_repeatability_header = undefined;
            let result_repeatability = undefined;
            let result_controller = undefined;
            let result_fragments = undefined;


            if(header_id != "undefined" && header_id != undefined)
                result_header = await pool.query("SELECT * FROM table_headers WHERE header_id = $1",[header_id]);

            //IF NO ARE PREVIOUS REPEATABILITY
            if(result_header == undefined || result_header?.rows?.length == undefined || result_header?.rows?.length == 0){
                let remaining_modifications = 2;
                result_repeatability_header = await pool.query("INSERT INTO table_headers (controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name]);
                result_repeatability = await pool.query("INSERT INTO repeatability_tables (repeatability_date,header_id) VALUES($1,$2) RETURNING *", [repeatability_date,result_repeatability_header.rows[0]['header_id']]);
            }else{
                let remaining_modifications = result_header.rows[0]['remaining_modifications'];
                result_repeatability_header = await pool.query("UPDATE table_headers SET controller_id = $1,temperature_value = $2,institution_id = $3,remaining_modifications = $4,determination_id = $5,temperature_type = $6,equipment_name = $7,analytic_method_name = $8,analytic_technique_name = $9 WHERE header_id=$10 RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name,header_id]);
                result_repeatability = await pool.query("UPDATE repeatability_tables SET repeatability_date = $1,header_id = $2 WHERE repeatability_id = $3 RETURNING * ", [repeatability_date,result_repeatability_header.rows[0]['header_id'],repeatability_id]);
            }

            if(result_repeatability_header.rows[0] && result_repeatability.rows[0]){
                result_fragments = await pool.query("DELETE FROM repeatability_tables_fragments WHERE repeatability_id = $1 RETURNING * ", [result_repeatability.rows[0]['repeatability_id']]);

                let tableFragmentsArray = Object.keys(tableFragments);
                for(let i = 0;i < tableFragmentsArray.length;i++){
                    let data = tableFragments[tableFragmentsArray[i]];
                    result_fragments = await pool.query("INSERT INTO repeatability_tables_fragments (repeatability_id,date,d1,d2,n) VALUES ($1,$2,$3,$4,$5) RETURNING * ", [result_repeatability.rows[0]['repeatability_id'],data.date,data.d1,data.d2,data.n]);
                }
                
                res.json(
                    {
                        "result" :
                            {
                                "table_header":result_repeatability_header.rows[0],
                                "repeatability_data" : result_repeatability.rows[0]
                            },
                        "code": 200
                    }
                    );
            }else{
                res.status(200).json({
                    "code" : 409,
                    "message" : "No se pudo insertar los datos de la repetibilidad"
                });
            }
            
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}


//GET ONE REPEATABILITY BASED IN THE DATE
export const getRepeatability = async (req, res) => {
    try {
        const { repeatability_date,determination_id } = req.body;
        
        let tableFragmentsData = undefined;

        let result = await pool.query("SELECT th.*,rp.* FROM repeatability_tables as rp join table_headers as th ON th.header_id = rp.header_id WHERE rp.repeatability_date = $1 AND th.determination_id = $2;",[repeatability_date,determination_id]);

        if(result?.rows?.length){
            tableFragmentsData = await pool.query("SELECT d1,d2,date,n FROM repeatability_tables_fragments WHERE repeatability_id = $1",[result.rows[0]['repeatability_id']]);
            
            res.status(200).json({
                "result": {...result.rows[0],table_fragments:tableFragmentsData.rows},
                "code" : 200
            });
        }    
        else{
            res.status(200).json({
                "result" : {"header_id" : -1,"repeatability_id" : -1},
                "code" : 200
            });
            return;
        }

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

export const updateAndGetRemainingModificationsRepeatability = async (req, res) => {
    try {
        const { repeatability_date,determination_id } = req.body;

        let result = await pool.query(`
            UPDATE table_headers AS th
            SET remaining_modifications = remaining_modifications - 1
            WHERE remaining_modifications > 0
            AND th.header_id IN (
                SELECT rp.header_id 
                FROM repeatability_tables AS rp 
                WHERE rp.repeatability_date = $1 
                AND th.determination_id = $2
            )
            RETURNING remaining_modifications;
        `, [repeatability_date, determination_id]);
        
        if(result?.rows?.[0]){
            res.status(200).json({
                "result": result.rows[0],
                "code" : 200
            });
        }else{
            res.status(200).json({
                "result" : {remaining_modifications : 2},
                "code" : 200
            });
            return;
        }

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

export const getRepeatabilityByDate = async (req,res) => {
    try{
        const {start_date,end_date,determination_id } =  req.query

        let repeatability_data = await pool.query("SELECT th.*,rp.* FROM repeatability_tables as rp join table_headers as th ON th.header_id = rp.header_id WHERE rp.repeatability_date >= $1 AND rp.repeatability_date <= $2 AND th.determination_id = $3",[start_date,end_date,determination_id]);

        let report_data = [];
        if(repeatability_data?.rows?.length){
            for(let i =0;i < repeatability_data.rows.length;i++){
                let repeatability_id = repeatability_data.rows[i]['repeatability_id'];
                
                let fragments_data = await pool.query("SELECT * FROM repeatability_tables_fragments WHERE repeatability_id = $1",[ repeatability_id ]);
                report_data.push({"fragments_data" : fragments_data?.rows,"headers_data" : repeatability_data?.rows[i]});    
            }
            if(report_data.length){
                res.status(200).json({
                    "result": report_data,
                    "code" : 200,
                });
            }else{
                res.status(200).json({
                    "result": [],
                    "code" : 200,
                });    
            }
        }else{
            res.status(200).json({
                "result": [],
                "code" : 200,
            });
        }

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }   
}
