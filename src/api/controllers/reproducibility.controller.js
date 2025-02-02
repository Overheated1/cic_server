import pool from "../../db.js"; 
import { updateQueryLogs } from "../utils/utils.js";

//INSERT ONE reproducibility
export const insertReproducibility = async (req, res) => {
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
            reproducibility_id,
            reproducibility_date,
        } = formHeaders;

            let result_header = undefined;
            let result_reproducibility_header = undefined;
            let result_reproducibility = undefined;
            let result_controller = undefined;
            let result_fragments = undefined;


            if(header_id != "undefined" && header_id != undefined)
                result_header = await pool.query("SELECT * FROM table_headers WHERE header_id = $1",[header_id]);

            //IF NO ARE PREVIOUS reproducibility
            if(result_header == undefined || result_header?.rows?.length == undefined || result_header?.rows?.length == 0){
                let remaining_modifications = 2;
                result_reproducibility_header = await pool.query("INSERT INTO table_headers (controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name]);
                result_reproducibility = await pool.query("INSERT INTO reproducibility_tables (reproducibility_date,header_id) VALUES($1,$2) RETURNING *", [reproducibility_date,result_reproducibility_header.rows[0]['header_id']]);
            }else{
                let remaining_modifications = result_header.rows[0]['remaining_modifications'];
                result_reproducibility_header = await pool.query("UPDATE table_headers SET controller_id = $1,temperature_value = $2,institution_id = $3,remaining_modifications = $4,determination_id = $5,temperature_type = $6,equipment_name = $7,analytic_method_name = $8,analytic_technique_name = $9 WHERE header_id=$10 RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type,equipment_name,analytic_method_name,analytic_technique_name,header_id]);
                result_reproducibility = await pool.query("UPDATE reproducibility_tables SET reproducibility_date = $1,header_id = $2 WHERE reproducibility_id = $3 RETURNING * ", [reproducibility_date,result_reproducibility_header.rows[0]['header_id'],reproducibility_id]);
            }

            if(result_reproducibility_header.rows[0] && result_reproducibility.rows[0]){
                result_fragments = await pool.query("DELETE FROM reproducibility_tables_fragments WHERE reproducibility_id = $1 RETURNING * ", [result_reproducibility.rows[0]['reproducibility_id']]);

                let tableFragmentsArray = Object.keys(tableFragments);
                for(let i = 0;i < tableFragmentsArray.length;i++){
                    let data = tableFragments[tableFragmentsArray[i]];
                    result_fragments = await pool.query("INSERT INTO reproducibility_tables_fragments (reproducibility_id,date,xi,n) VALUES ($1,$2,$3,$4) RETURNING * ", [result_reproducibility.rows[0]['reproducibility_id'],data.date,data.xi,data.n]);
                }
                
                res.json(
                    {
                        "result" :
                            {
                                "table_header":result_reproducibility_header.rows[0],
                                "reproducibility_data" : result_reproducibility.rows[0]
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


export const updateAndGetRemainingModificationsReproducibility = async (req, res) => {
    try {
        const { reproducibility_date,determination_id } = req.body;

        let result = await pool.query("SELECT th.remaining_modifications FROM reproducibility_tables as rp join table_headers as th ON th.header_id = rp.header_id WHERE rp.reproducibility_date = $1 AND th.determination_id = $2;",[reproducibility_date,determination_id]);

        if(result?.rows?.[0]){
            res.status(200).json({
                "result": { remaining_modifications : result.rows[0] },
                "code" : 200
            });
        }else{
            res.status(200).json({
                "result" : {"header_id" : -1,"reproducibility_id" : -1},
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

export const getMonthRange = async (req, res) => {
    let { start_date,end_date,determination_id } = req.body;

    start_date = new Date(start_date.split("T")[0]);
    end_date = new Date(end_date.split("T")[0]);
    
    let daysMap= {};
    for (let currentDate = start_date; currentDate <= end_date; currentDate.setDate(currentDate.getDate() + 1)) {
        let dateToFetch = currentDate.toISOString().split('T')[0];
        let result = await pool.query("SELECT * FROM reproducibility_tables_fragments as rtf JOIN reproducibility_tables as rt ON rt.reproducibility_id=rtf.reproducibility_id JOIN table_headers as th ON th.header_id=rt.header_id WHERE rtf.date = $1 AND th.determination_id = $2;",[dateToFetch,determination_id]);
        
        daysMap[currentDate.getDate()] = result.rows.length > 0;
    }


    res.status(200).json({
        "result": daysMap,
        "code" : 200
    });
}

//GET ONE reproducibility BASED IN THE DATE
export const getReproducibility = async (req, res) => {
    try {
        const { reproducibility_date,determination_id } = req.body;
        
        let tableFragmentsData = undefined;

        let result = await pool.query("SELECT th.*,rp.* FROM reproducibility_tables as rp join table_headers as th ON th.header_id = rp.header_id WHERE rp.reproducibility_date = $1 AND th.determination_id = $2;",[reproducibility_date,determination_id]);

        if(result?.rows?.length){
            tableFragmentsData = await pool.query("SELECT * FROM reproducibility_tables_fragments WHERE reproducibility_id = $1",[result.rows[0]['reproducibility_id']]);

            res.status(200).json({
                "result": {...result.rows[0],table_fragments:tableFragmentsData.rows},
                "code" : 200
            });
        }    
        else{
            res.status(200).json({
                "result" : {"header_id" : -1,"reproducibility_id" : -1},
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

export const getReproducibilityByDate = async (req,res) => {
    try{
        const {start_date,end_date,determination_id } =  req.query

        let reproducibility_data = await pool.query("SELECT th.*,rp.* FROM reproducibility_tables as rp join table_headers as th ON th.header_id = rp.header_id WHERE rp.reproducibility_date >= $1 AND rp.reproducibility_date <= $2 AND th.determination_id = $3",[start_date,end_date,determination_id]);

        let report_data = [];
        if(reproducibility_data?.rows?.length){
            for(let i =0;i < reproducibility_data.rows.length;i++){
                let reproducibility_id = reproducibility_data.rows[i]['reproducibility_id'];
                
                let fragments_data = await pool.query("SELECT * FROM reproducibility_tables_fragments WHERE reproducibility_id = $1",[ reproducibility_id ]);
                report_data.push({"fragments_data" : fragments_data?.rows,"headers_data" : reproducibility_data?.rows[i]});    
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
