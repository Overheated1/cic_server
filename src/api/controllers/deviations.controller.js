import pool from "../../db.js"; 
import { calculateAverageXi, updateQueryLogs } from "../utils/utils.js";

//GET THE 3 DEVIATIONS
export const getDeviations = async (req, res) => {
    try {
        let {
            totalNSum,
            differenceArray,
        } = req.body;

        //R1 R2 R3 -> STANDARD DEVIATIONS
        let r1 = 0;
        let r2 = 0;
        let r3 = 0;

        let sumQuadraticDifferences = 0;
        for(let i = 0;i < differenceArray.length;i++){
            sumQuadraticDifferences += Math.pow(Number(differenceArray[i]),2);
        }
        console.log(sumQuadraticDifferences,differenceArray)

        if(totalNSum && sumQuadraticDifferences){
            r1 = sumQuadraticDifferences / (2 * totalNSum);
            r2 = r1 * 2;
            r3 = r1 * 3;
        }
        
        res.status(200).json({
                "result": {
                    "r1":r1,
                    "r2":r2,
                    "r3":r3,
                },
                "code": 200,
                });

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}

export const getDeviationsReproducibility = async (req, res) => {
    try {
        let data = req.body;

        //R1 R2 R3 -> STANDARD DEVIATIONS
        let r1 = 0;
        let r2 = 0;
        let r3 = 0;
        let r1Negative = 0;
        let r2Negative = 0;
        let r3Negative = 0;

        let DE = 0;
        let x = calculateAverageXi(data)
        for(let i = 0;i < data.length;i++){
            DE += Math.pow(Number(data[i].xi) - Number(x),2);
        }

        let DEBeforeRound = Math.sqrt(DE / (data.length - 1));
        let cv = (DEBeforeRound * 100 / x);
        cv = !isNaN(cv) && cv ? cv : 0

        DE = Math.round(DEBeforeRound);
        if(DE){
            r1 = x + DE;
            r2 = x + DE * 2;
            r3 = x + DE * 3;
            r1Negative = x + DE * -1;
            r2Negative = x + DE * -2;
            r3Negative = x + DE * -3;
        }
        

        res.status(200).json({
            "result": {
                x: x,
                r1:r1,
                r2:r2,
                r3:r3,
                r1Negative:r1Negative,
                r2Negative:r2Negative,
                r3Negative:r3Negative,
                cv:cv
            },
            "code": 200,
            });

        updateQueryLogs("success");
    } catch (error) {
        res.status(500).json({"message" : "Error en servidor","code" : 500});
        updateQueryLogs("error");
        console.error(error);
    }
}