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
    delete(status,Uid){
        return axios.post(Admin_URL + "/updateAdminUser/{userid}"+Uid,{
            status
        })
    }
    
}

export default new Adminservice();