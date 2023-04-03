import axios from "axios";
import {BASE_URL} from "./Globalvalues";

class Paymentapi {
    postinstallment(data){
        return axios.post(BASE_URL + "addNewPayentInstallment",data)
    }
    getinstallment(userid){
        const USERID = parseInt(userid)
        console.log("Type is: ", typeof(USERID)," & Id is", USERID)
        return axios.get(BASE_URL + `getPayentInstallment`,{
            params:{
                userId : USERID
            }
        })
    }
}

export default new Paymentapi();