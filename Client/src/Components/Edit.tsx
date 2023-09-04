import {  useState,useRef } from "react"
import { getName } from "../customsHooks/getName";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getId } from "../customsHooks/getId";

export default function Edit() {
const oldPassword = useRef<HTMLInputElement>(null!);
const [userName , setUserName] = useState(()=>getName());
const newPassword = useRef<HTMLInputElement>(null!);
const [cookie,_] = useCookies(['access_token']);
const navigate = useNavigate();
  
const edit = async()=>{  
    const userId = getId();
    const res  = await fetch(`http://localhost:3001/auth/edit/${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization':cookie.access_token
        },
        body: JSON.stringify({
            oldPassword:oldPassword.current.value,
            newUserName:userName,
            newPassword:newPassword.current.value
        })
     });

     if(res.ok){
        console.log("status");
        setUserName("");
        localStorage.setItem("name",userName??"")
        navigate("/");
     }
     else if(res.status ===400){
      alert("provide correct old password")
     }
}


const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await edit();

}
  return (
    <div className='' >
     <form className="form" onSubmit={onSubmit}>
        <div className="name">
            <label htmlFor="name" > User Name:</label>
            <input type="text" id="name" value={userName??""} onChange={(e)=>setUserName(e.target.value)} />
        </div>
        <div className="password">
            <label htmlFor="password" >Enter old Password here :</label>
            <input type="password" ref={oldPassword}  name="password" id="password"/>
        </div>
        <div className="newPassword">
            <label htmlFor="newpassword" >Enter new  Password here :</label>
            <input type="password" ref={newPassword}  name="newpassword" id="newpassword"/>
        </div>
        <div className="submit">
       <input type="submit" value='Update' />
      </div>
        </form>
    </div>
  )
}
