import axios from "axios";
import {BASE_URL} from "./Globalvalues";

class Paymentapi {
    postinstallment(data){
        return axios.post(BASE_URL + "addNewPayentInstallment",data)
    }
    getinstallment(UserId){
        return axios.get(BASE_URL + `getPayentInstallment`,{
            params:{
                UserId
            }
        })
    }
}

export default new Paymentapi();