import axios from "axios";

const base_url = "http://localhost:9190/"

class NotificationPlacementapi {
    getall(){
        return axios.get(base_url + "getNotification")
    }
    getplacement(){
        return axios.get(base_url + "getAllPlacement")
    }
    addplace(companyname,imageUrl,module,name,placementYear,packages){
        return axios.post(base_url + "addNewPlacement" ,{
            companyname,
            imageUrl,
            module,
            name,
            placementYear,
            packages
        })
    }
    addnotification(body,code,createdDateTime,file,id,name,notificationmodule,status,title,userId){
        return axios.post(base_url + "addNotification",{
            body,
            code,
            createdDateTime,
            file,
            id,
            name,
            notificationmodule,
            status,
            title,
            userId
        })
    }

    getmodules(status){
        // const stat = JSON.stringify(status)
        return axios.get(base_url + "getallmodule",{
            params: {
                status : status
            }
            })
    }
    addmodules(moduleName,moduleShortName,status){
        return axios.post(base_url + "addnewmodule",{
            moduleName,
            moduleShortName,
            status
        })
    }
}

export default new NotificationPlacementapi();