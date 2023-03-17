import axios from "axios";

const API_URL = "http://localhost:9190/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        localStorage.setItem('role',response.data.roles)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('username',response.data.username)
        //localStorage.setItem('username',response.data.username)
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(name, email, mobileNumber, password, status) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      mobileNumber,
      password,
      status
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getNotification(){
    return axios.get(API_URL + "/getALLNotifications");
}
}
// export const getNotifications = async () = >{
//   try {
//     const {data} =await axios.get(API_URL + "/getALLNotifications",{
//       headers :{
//         "x-access-token":localStorage.getItem("token")
//       }
//     })
//     return data;
//   } catch (error) {
//     return error;
//   }}

export default new AuthService();

