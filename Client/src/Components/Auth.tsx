import { useRef } from "react"
import '../Auth.css';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  
  return (
    <div className="auth">
      
      <Register></Register>
      <LogIn></LogIn>
    </div>
  )
}




let Register = ()=>{
      const userName = useRef<HTMLInputElement>(null!);
      const password = useRef<HTMLInputElement>(null!);
     const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       try{
         const response = await fetch('http://localhost:3001/auth/register',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username":userName.current.value,"password":password.current.value})
        });
        const data = response.body;
        if(response.ok){
           console.log("response :" +data);
          console.log("successfully registerd");
          userName.current.value = "";
          password.current.value = "";
        }
        else if(response.status==400){
          alert("username is not avaliable")
        }
         
       }catch(error){
         console.log({"In registerd error":error})
       }
     }

    return <Form userName={userName} password={password} label="Register" submit = {onSubmit} ></Form>
}
let LogIn = ()=>{
    const userName = useRef<HTMLInputElement>(null!);
    const password = useRef<HTMLInputElement>(null!);
    const [_,setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();

   

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       e.preventDefault();
       try{
         const response = await fetch('http://localhost:3001/auth/login',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username":userName.current.value,"password":password.current.value})
        });
        if(response.ok){
           console.log("response : " +  response);
           const data = await response.json();
           setCookie("access_token",data.token);
           localStorage.setItem("id",data.id)
           localStorage.setItem("name",userName.current.value)  
          userName.current.value = "";
          password.current.value = "";
          navigate("/");
        } 
        else if(response.status==400){
          alert("username or password is invalid...")
        }
        else if(response.status ===404){
          alert("user is not registered");
        }
       }catch(error){
         console.log({"In registerd error":error})
       }
     }

    return <Form userName={userName} password={password} label="Log In" submit={onSubmit}></Form>
}
type FProp = {
    userName :React.MutableRefObject<HTMLInputElement>,
     password:React.MutableRefObject<HTMLInputElement>,
     label:string,
     submit : (e:React.FormEvent<HTMLFormElement>)=>void
}
const Form = ({userName,password,label,submit}:FProp)=>{
    return <div className={label}>
    <form onSubmit={submit}>
       <h3>{label}</h3>
      <div className="userName">
      <label  htmlFor="userName">User Name :</label>
       <input ref={userName} type="text" id="userName" name="userName" placeholder="UserName aur Email" />
      </div>
      <div className="Password">
      <label htmlFor="password">Password :</label>
       <input ref={password} type="password" id="password" name="password" placeholder="Password" />
      </div>
      <div className="submit">
       <input type="submit" value={label==='Log In'?"Sign In":"Sign Up"} />
      </div>
    </form>
   </div>
}