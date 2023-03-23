import axios from "axios";

const Admin_URL = "http://localhost:9190/admin/auth";

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
    // getadmin(status){
    //     return axios.get(`${Admin_URL}/getAdminUsers/{status}?status=${encodeURI(status)}`)
    // }
}

export default new Adminservice();