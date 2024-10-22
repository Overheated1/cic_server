import pool from "../../db.js";
import checkDiskSpace from "check-disk-space";
import path from "path";
import { fileURLToPath } from 'url';

export const getFreeDatabaseSize = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const diskPath = path.parse(__dirname).root;
  
    try {
        const diskInfo = await checkDiskSpace(diskPath);
        const dbSizeResult = await pool.query(`SELECT pg_database_size('${process.env.DB_DATABASE}')`);
        const dbSize = dbSizeResult.rows[0]['pg_database_size'];

        res.status(200).json({
            code:200,
            result : {
                free: diskInfo.free,
                available: parseInt(diskInfo.free) - parseInt(dbSize),
                dbSize: dbSize
            }
        });
    
        updateQueryLogs("success");
    } catch (error) {

        updateQueryLogs("error");
        console.error("error:" ,error);
        res.status(500).json({code:500,message:'Error al obtener la información'});
    }
};

export const getYearQueryLogs = async (req,res) => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    
    try {
        // Fetch data from the beginning of the current year to the present date
        const result = await pool.query("SELECT * FROM database_queries_statistics WHERE statistic_date >= $1 AND statistic_date <= $2",[startOfYear.toISOString().split('T')[0], currentDate.toISOString().split('T')[0]]);
        
        if (result.rows.length) {
            res.status(200).json({
                result: result.rows,
                code: 200
            });
        }
        else{
            res.status(403).json({
                message: "No se pudo obtener la información de las consultas",
                code: 403
            });
        }
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener la información", code: 500 });
        updateQueryLogs("error");
        console.error("error:", error);
    }
}

export const getActualQueryLogs = async (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const previousDate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

    let successQueryCount = 0;
    let errorQueryCount = 0;
    let prevSuccessQueryCount = 0;
    let prevErrorQueryCount = 0;

    try {
        // Fetch current day's data
        let result = await pool.query("SELECT * FROM database_queries_statistics WHERE statistic_date = $1", [currentDate]);
        if (result.rows.length) {
            successQueryCount = result.rows[0]['successful_queries_count'];
            errorQueryCount = result.rows[0]['error_queries_count'];
        }

        // Fetch previous day's data
        let prevResult = await pool.query("SELECT * FROM database_queries_statistics WHERE statistic_date = $1", [previousDate]);
        if (prevResult.rows.length) {
            prevSuccessQueryCount = prevResult.rows[0]['successful_queries_count'];
            prevErrorQueryCount = prevResult.rows[0]['error_queries_count'];
        }

        // Calculate percentage change
        const successQueryChange = prevSuccessQueryCount ? ((successQueryCount - prevSuccessQueryCount) / prevSuccessQueryCount) * 100 : 0;
        const errorQueryChange = prevErrorQueryCount ? ((errorQueryCount - prevErrorQueryCount) / prevErrorQueryCount) * 100 : 0;

        res.status(200).json({
            result: {
                successQueryCount: String(successQueryCount),
                errorQueryCount: String(errorQueryCount),
                successQueryChange: String(successQueryChange.toFixed(2)),
                errorQueryChange: String(errorQueryChange.toFixed(2)),
            },
            code: 200
        });

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener la información", code: 500 });
        updateQueryLogs("error");
        console.error("error:", error);
    }
}

export const updateQueryLogs = async (state) => {
    let successQueryCount = 0;
    let errorQueryCount = 0;
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    switch(state){
        case "success":
            successQueryCount++;
            break;
        case "error":
            errorQueryCount++;
            break;
    }

    let result = await pool.query("SELECT * FROM database_queries_statistics WHERE statistic_date = $1", [currentDate]);

    if(result.rows.length){
        successQueryCount += parseInt(result.rows[0]['successful_queries_count']);
        errorQueryCount += parseInt(result.rows[0]['error_queries_count']);
        
        await pool.query("UPDATE database_queries_statistics SET successful_queries_count = $1,error_queries_count = $2 WHERE statistic_date=$3 RETURNING *", [successQueryCount,errorQueryCount,currentDate])

    }else{
        await pool.query("INSERT INTO database_queries_statistics (successful_queries_count,error_queries_count,statistic_date) VALUES($1,$2,$3) RETURNING *", [successQueryCount,errorQueryCount,currentDate])
    }

}

