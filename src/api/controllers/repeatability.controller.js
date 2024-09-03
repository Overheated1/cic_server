import pool from "../../db.js"; 

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
            temperature_type_id,
            equipment_name,
            header_id,
            repeatability_id,
            concentration,
            repeatability_date,
            method,
        } = formHeaders;

        console.log(formHeaders);
            // let result_header = undefined;
            // let result_repeatability_header = undefined;
            // let result_repeatability = undefined;


            // if(header_id != "undefined" && header_id != undefined)
            //     result_header = await pool.query("SELECT * FROM table_headers WHERE header_id = $1",[header_id]);


            // //IF NO ARE PREVIOUS REPEATABILITY
            // if(result_header == undefined || result_header?.rows?.length == undefined || result_header?.rows?.length == 0){
            //     let remaining_modifications = 2;
            //     result_repeatability_header = await pool.query("INSERT INTO table_headers (controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type_id,equipment_name) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type_id,equipment_name]);
            //     result_repeatability = await pool.query("INSERT INTO repeatability_tables (repeatability_date,header_id) VALUES($1,$2) RETURNING *", [repeatability_date,result_repeatability_header.rows[0]['header_id']]);
            // }else{
            //     let remaining_modifications = result_header.rows[0]['remaining_modifications'];
            //     result_repeatability_header = await pool.query("UPDATE table_headers SET controller_id = $1,temperature_value = $2,institution_id = $3,remaining_modifications = $4,determination_id = $5,temperature_type_id = $6,equipment_name = $7 WHERE header_id=$8 RETURNING *", [controller_id,temperature_value,institution_id,remaining_modifications,determination_id,temperature_type_id,equipment_name,header_id]);
            //     result_repeatability = await pool.query("UPDATE repeatability_tables SET repeatability_date = $1,header_id = $2 WHERE repeatability_id = $3 RETURNING * ", [repeatability_date,result_repeatability_header.rows[0]['header_id'],repeatability_id]);
            // }
            // if(result_repeatability_header.rows[0] && result_repeatability.rows[0]){
            //     res.json(
            //         {
            //             "result" :
            //                 {
            //                     "table_header":result_repeatability_header.rows[0],
            //                     "repeatability_data" : result_repeatability.rows[0]
            //                 },
            //             "code": 200
            //         }
            //         );
            // }else{
            //     res.status(200).json({
            //         "result": {...repeatabilityData.rows,...headerData.rows},
            //         "code" : 409,
            //         "message" : "No se pudo insertar los datos de la repetibilidad buscada"
            //     });
            // }

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}


//GET ONE REPEATABILITY BASED IN THE DATE
export const getRepeatability = async (req, res) => {
    try {
        const { repeatability_date,determination_id } = req.body;
        
        let headerData = undefined;

        const result = await pool.query("SELECT * FROM repeatability_tables WHERE repeatability_date = $1",[repeatability_date]);
        if(result.rows[0] != undefined){
            headerData = await pool.query("SELECT * FROM table_headers WHERE header_id = $1",[result.rows[0]['header_id']]);
        }else{
            res.status(200).json({
                "result" : {"header_id" : -1,"repeatability_id" : -1},
                "code" : 200
            });
            return;
        }
        if(headerData.rows[0] != undefined){
            if(headerData.rows[0]['determination_id'] == determination_id){
                res.status(200).json({
                    "result": {...result.rows[0],...headerData.rows[0]},
                    "code" : 200
                });
            }else{
                res.status(200).json({
                    "result" : {"header_id" : -1,"repeatability_id" : -1},
                    "code" : 200,
                    "message" : "No se encontro una repetibilidad para ese determinacion"
                });
            }
        }else{
            res.status(200).json({
                "result": {...result.rows,...headerData.rows},
                "code" : 409,
                "message" : "No se pudo obtener los datos de la repetibilidad buscada"
            });
        }
        
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}
