const {axiosInstance} = require('./index') // destructured from index.js file 

//register new user : 
// function designed to register a user by sending their details to a server. 
export const RegisterUser = async(value) =>{
    try{
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

//login registered User :
export const LoginUser = async(value) => {
    try{
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

// get current user from the frontend
export const GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get('api/users/get-current-user')
        return response.data
    } catch (error) {
       console.log(error)
    }
}