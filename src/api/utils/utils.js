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

const validateName = (value,errorCodes) => {
    if(/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(value)){
        return true;
    errorCodes.push(1); 
    return false;
}

}
const validateCi = (value,errorCodes) => {
    if(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{5}$/.test(value)){
        return true;
    }
    errorCodes.push(2); 
    return false;
}
const validateAge = (value,errorCodes) => {
    let val = value.toString();
    if(/^\d+$/.test(val)){
        let age = parseInt(val);
        if(age >= 1 && age <= 90){
            return true;    
        }
    }
    return false;
}

const validateGender = (value,errorCodes) => {
    let arrCat = ["F","M"]
    if(arrCat.includes(value)){
            return true;    
    }
    return false;
}



const validateUser = (value,errorCodes) => {
    if(/^[a-zA-Z_]+$/.test(value)){
        return true;
    }
    return false;
}

export const validateTemplateId = async (req, res, next) => {
    const { id, templateId } = req.params;
    const reqId = id ?? templateId;
    if (isNaN(parseInt(reqId))) {
      return res.status(400).json({ error: 'Invalid template ID' });
    }
  
    try {
      const result = await pool.query('SELECT 1 FROM custom_template WHERE id = $1', [reqId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Template not found' });
      }
      next();
    } catch (error) {
      console.log("validateTemplateId error", error)
      res.status(500).json({ error: error.message });
    }
};

export const calculateAverageXi = (dataArray) => {
    const xiValues = dataArray.map(item => item.xi);
    const sum = xiValues.reduce((total, value) => total + Number(value), 0);
    const average = sum / dataArray.length;

    return average;
};