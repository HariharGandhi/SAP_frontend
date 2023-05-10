import axios from "axios";
import {BASE_URL} from "./Globalvalues";

const API_URL =  BASE_URL + "api/auth/";
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
        localStorage.setItem('id',response.data.id)
        
        return response.data;
      });
  }

  getApplicationStatus(userId) {
    return axios
      .get(BASE_URL+"api/getapplicationformStatus?UserId="+userId,)
      .then(response => {
       
        return response.data.applicationformStatus;
      });
  }


  logout() {
    return axios.post(API_URL + "signout").then((res)=>{
    // localStorage.removeItem('token');
    //   localStorage.removeItem('role');
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("username");
    //   localStorage.removeItem('email');
    //   localStorage.removeItem('id');
    localStorage.clear()
      window.location.href = "/home";
    })
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

  forgotpassword(email){
    return axios.post(API_URL + "forgotpassword/"+email)
  }

  setpassword(email,password){
    return axios.post(API_URL + "forgotpassword/setnewpassword",{
      email,
      password
    });
  }
}


export default new AuthService();

