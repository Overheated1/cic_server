import pool from "../../db.js"; 

//GET THE 3 DEVIATIONS
export const getDeviations = async (req, res) => {
    try {
        let {
            totalNSum,
            differenceArray,
        } = req.body;

        //R1 R2 R3 -> STANDARD DEVIATIONS
        let r_1 = 0;
        let r_2 = 0;
        let r_3 = 0;

        let sumQuadraticDifferences = 0;
        for(let i = 0;i < differenceArray.length;i++){
            sumQuadraticDifferences += parseInt(differenceArray[i]) * parseInt(differenceArray[i]);
        }
        if(totalNSum && sumQuadraticDifferences){
            r_1 = sumQuadraticDifferences / (2 * totalNSum);
            r_2 = r_1 * 2;
            r_3 = r_1 * 2;
        }
        
        res.status(200).json({
                "result": {
                    "r_1":r_1,
                    "r_2":r_2,
                    "r_3":r_3,
                },
                "code": 200,
                });

    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        console.error(error);
    }
}