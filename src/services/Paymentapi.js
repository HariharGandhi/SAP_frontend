import axios from "axios";
import BASE_URL from "./Baseurl";

class Paymentapi {
    postinstallment(data){
        return axios.post(BASE_URL + "addNewPayentInstallment",data)
    }
    getinstallment(userid){
        
        return axios.get(BASE_URL + `getPayentInstallment`,{
            params:{
                userId : userid
            }
        })
    }
}

export default new Paymentapi();