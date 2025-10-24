import adminSchema from '../model/adminSchema.js';
import byrypt from 'bcrypt';
export const adminCredentials=async()=>{
    try {
        const res=await adminSchema.find();
        if(res.length==0){
            var obj={
                email:"admin@gmail.com",
                password:await byrypt.hash('12345678',10)
            }
            const result=adminSchema.create(obj);
                console.log("Admin data inserted in the Collection for the first time",result);
        }
        else{
            console.log("Admin Credential Already Available");
        }
        return true;
    } catch (error) {
        console.log("Error in admin check Credentials : ",error);
        return false;        
    }
}