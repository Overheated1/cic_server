import pool from "../../db.js";
import { updateQueryLogs } from "../utils/utils.js";

export const updateFields = async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    console.log("fields", fields)

    try {
        await pool.query("BEGIN");
        await pool.query("DELETE FROM template_field WHERE template_id = $1", [id]);

        const insertQuery = `
            INSERT INTO template_field (template_id, type, label, properties,value)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const insertedFields = [];
        for (const field of fields) {
            const { type, label, properties,value } = field
            const result = await pool.query(insertQuery, [id, type, label, properties,value]);
            insertedFields.push(result.rows[0])
        }
        await pool.query("COMMIT");

        res.status(200).json({
            result: insertedFields,
            code: 200,
        });
       updateQueryLogs("success");
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ message: "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
};

export const getFields = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM template_field WHERE template_id = $1', [id]);
        console.log("getFields", result)
        res.status(200).json({
            result: result.rows,
            code: 200,
        });
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ "message": "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
}