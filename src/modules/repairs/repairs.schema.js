import z from 'zod';
import { extracValidationData } from './../../common/utils/extractErrorData.js';


const repairSchema = z.object({

    date: z.string(),

    motorNumber: z.number(),

    description: z.string(),

    userId: z.number(),
});


export function validCreateRepair(data){

    const result= repairSchema.safeParse(data);
    

    const {
        hasError,

        errorMessages, 

        data: repairData,

    } = extracValidationData(result);

    return{

        hasError,

        errorMessages,

        repairData,

    };

}