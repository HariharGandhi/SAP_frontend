import axios from "axios";
import {BASE_URL} from "./Globalvalues";

class NotificationPlacementapi {
    getall(){
        return axios.get(BASE_URL + "getNotification")
    }
    getplacement(){
        return axios.get(BASE_URL + "getAllPlacement")
    }
    addnotification(body,code,createdDateTime,file,name,status,title,userId){
        return axios.post(BASE_URL + "addNotification",{
            body,
            code,
            createdDateTime,
            file,
            name,
            status,
            title,
            userId
        })
    }

    getmodules(status){
        // const stat = JSON.stringify(status)
        return axios.get(BASE_URL + "getallmodule",{
            params: {
                status : status
            }
            })
    }
    addmodules(moduleName,moduleShortName,status){
        return axios.post(BASE_URL + "addnewmodule",{
            moduleName,
            moduleShortName,
            status
        })
    }
}
const NotificationPlacement = new NotificationPlacementapi()
export default NotificationPlacement;