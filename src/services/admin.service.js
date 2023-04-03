import axios from "axios";
import {BASE_URL} from "./Globalvalues";

const Admin_URL = BASE_URL + "admin/auth";

class Adminservice {
    Register(department,email,mobileNumber,name,password,position,status){
        return axios.post(Admin_URL + "/signup",{
            department,
            email,
            mobileNumber,
            name,
            password,
            position,
            status
        })
    }
    update(department,email,mobileNumber,name,password,position,status,Uid){
        return axios.post(Admin_URL + "/updateAdminUser",{
            department,
            email,
            mobileNumber,
            name,
            password,
            position,
            status
        },{params:{
            Uid
        }})
    }
    getadmin(status){
        
        return axios.get(Admin_URL + `/getAdminUsers/{status}`,{params:{
            status
        }})
    }
}

export default new Adminservice();