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
        localStorage.setItem('id',response.data.id)
        
        return response.data;
      });
  }

  getApplicationStatus(userId) {
    return axios
      .get("http://localhost:9190/api/getapplicationformStatus?UserId="+userId,)
      .then(response => {
       
        return response.data.applicationformStatus;
      });
  }


  logout() {
    return axios.post(API_URL + "signout").then((res)=>{
    localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem("user");
      localStorage.removeItem("username");
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
}


export default new AuthService();

