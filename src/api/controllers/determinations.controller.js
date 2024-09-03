import pool from "../../db.js"; 

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
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}
