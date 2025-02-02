import pool from "./db.js"; 

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
    const { id } = req.params;
    console.log(req.params,parseInt(id),isNaN(parseInt(id)))
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid template ID' });
    }
  
    try {
      const result = await pool.query('SELECT 1 FROM custom_template WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Template not found' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  