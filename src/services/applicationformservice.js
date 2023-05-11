import axios from "axios";
import {BASE_URL} from "./Globalvalues";

const Application_URL = BASE_URL + "api/";
class Applicationformservice {
    getallforms(){
        return axios.get(Application_URL + "getapplicationform")
    }
    getfiltered(name,module,dept,status){
        return axios.get(Application_URL + "fetchlistofApplicationFormbyfilter",{
        params: {
            pagenum : 0,
            pagesize : 20,
            email: "",
            studentId: "",
            name: name,
            collegeEmail: "",
            sapModule: module,
            contactNumber: "",
            passoutYear: "",
            branch: dept,
            specialization: "",
            studentType: "",
            adhaarCard: "",
            applicationFromStatus: status,
            uploadImage: "",
            userId: ""
        }
        })
    }

    getformbystid(stId){
        const Stid = parseInt(stId,10);
        return axios.get(Application_URL + `getapplicationformbyid/${Stid}`)
    }
    updateform(){
        return axios.post()
    }
}
const Applicationformapi = new Applicationformservice()
export default Applicationformapi;