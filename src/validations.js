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
