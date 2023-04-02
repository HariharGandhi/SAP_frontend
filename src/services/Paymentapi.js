import axios from "axios";

const Base_url = "http://localhost:9190/"

class Paymentapi {
    postinstallment(data){
        return axios.post(Base_url + "addNewPayentInstallment",data)
    }
    getinstallment(userid){
        return axios.get(Base_url + `getPayentInstallmentAmount`,{
            params:{
                userId : userid
            }
        })
    }
}

export default new Paymentapi();