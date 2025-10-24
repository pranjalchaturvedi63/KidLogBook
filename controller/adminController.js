export const adminLoginController=async (request,response)=>{
    const {email,password}=request.body;
    console.log("Email : ",email);
    console.log("Password : ",password);
    
    // response.render("/adminLogin.ejs",{message:"",status:""});
}