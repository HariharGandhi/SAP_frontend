import axios from "axios";

const base_url = "http://localhost:9190/"

class NotificationPlacementapi {
    getall(){
        return axios.get(base_url + "getNotification")
        .then((res)=>{
            console.log(res.notificationmodule)
        })
    }
    getplacement(){
        return axios.get(base_url + "getAllPlacement")
    }
    addplace(companyname,imageUrl,module,name,placementYear,placementpackage){
        return axios.post(base_url + "addNewPlacement" ,{
            companyname,
            imageUrl,
            module,
            name,
            placementYear,
            placementpackage
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
}

export default new NotificationPlacementapi();