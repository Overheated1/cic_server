//cursera how to learning

const validateName_LName = (value) => {
    if(/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(value)){
        return true;
    return false;
}

}
const validateCi = (value) => {
    if(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{5}$/.test(value)){
        return true;
    }
    return false;
}
const validateAge = (value) => {
    let val = value.toString();
    if(/^\d+$/.test(val)){
        let age = parseInt(val);
        if(age >= 1 && age <= 90){
            return true;    
        }
    }
    return false;
}

const validateGender = (value) => {
    let arrCat = ["F","M"]
    if(arrCat.includes(value)){
            return true;    
    }
    return false;
}



const validateUser = (value) => {
    if(/^[a-zA-Z_]+$/.test(value)){
        return true;
    }
    return false;
}

module.exports = {
    validateName_LName,
    validateUser,
    validateAge,
    validateCi,
    validateGender,
}