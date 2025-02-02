import pool from "../../db.js";
import { updateQueryLogs } from "../utils/utils.js";
import { testTemplates } from "../../test/testTemplates.js"

export const getTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM custom_template WHERE id = $1', [id]);
        res.status(200).json({
            result: result.rows[0],
            code: 200,
        });
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ "message": "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
}

export const getAllTemplates = async (req, res) => {
    try {
        // const result = await pool.query('SELECT * FROM custom_template ORDER BY creation_date DESC');
        const query = `
            SELECT 
            t.*, 
            COUNT(f.id) AS field_count
            FROM custom_template t
            LEFT JOIN template_field f ON t.id = f.template_id
            GROUP BY t.id
            ORDER BY t.creation_date DESC;
        `;
        const result = await pool.query(query);

        res.status(200).json({
            result: result.rows,
            // result: testTemplates,
            code: 200,
        })
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ "message": "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
}

export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        // borrar campos tb
        await pool.query("DELETE FROM template_field WHERE template_id = $1", [id]);
        const result = await pool.query('DELETE FROM custom_template WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({
            result: result.rows[0],
            code: 200,
        });
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ message: "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
}

export const createTemplate = async (req, res) => {

    try {
        const { creating_user, type, name, creation_date, description, last_modification } = req.body;

        const query = `INSERT INTO custom_template (creating_user, type, name, creation_date, description, last_modification) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
        const result = await pool.query(query, [creating_user, type, name, creation_date, description, last_modification]);

        // console.log("createTemplate result", result)
        // TODO: check if "result.rows[0]" is what I realy need in the frontend
        res.status(201).json({
            result: result.rows[0], // send back updated "custom_template"
            code: 200,
        });
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ message: "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
}

export const updateTemplate = async (req, res) => {
    const { id } = req.params;
    const { name, type, description, last_modification, creating_user, creation_date } = req.body;
    try {
        const query = `
            UPDATE custom_template
            SET name = $1, type = $2, description = $3, last_modification = $4
            WHERE id = $5
            RETURNING *;
        `;
        const result = await pool.query(query, [name, type, description, last_modification, id]);

        res.status(200).json({
            result: result.rows[0], // send back updated "custom_template"
            code: 200,
        });
        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({ message: "Error en servidor", "code": 500 });
        updateQueryLogs("error");
        console.error(error);
    }
};