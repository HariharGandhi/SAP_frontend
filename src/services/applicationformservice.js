import axios from "axios";

const Application_URL = "http://localhost:9190/api/";
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
        return axios.get(Application_URL + `getapplicationformbyid/` + Stid)
    }
}

export default new Applicationformservice();