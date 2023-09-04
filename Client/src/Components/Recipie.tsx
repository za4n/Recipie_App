

import { getId } from '../customsHooks/getId';
import {useState,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import '../Recipie.css';

export default function Recipie(){
    const id = getId();
    const [cookie,_] = useCookies(['access_token']);
    const [Incredients,setIncredients] = useState<string[]>([]);
    const name = useRef<HTMLInputElement>(null!);
    const description = useRef<HTMLInputElement>(null!);
    const timetoCook = useRef<HTMLInputElement>(null!);
    const imgUrl = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate();
    const [responseStatus,setResponseStatus] = useState<number>(200);

    const addIncredient = ()=>{
        setIncredients([...Incredients,'']);
    }
     const add = (e:React.ChangeEvent<HTMLInputElement>,index:number):void=>{
      const  Inc=[...Incredients];
      Inc[index] = e.target.value;
      setIncredients(Inc);
    } 

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
       const newRecipie = {"name":name.current.value,"description":description.current.value,"Incredients":Incredients,
       "timetoCook":timetoCook.current.value, "OwnerId":id , "img":imgUrl.current.value}
      try{
          const res =  await fetch('http://localhost:3001/reciepie',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization':cookie.access_token
            },
            body: JSON.stringify(newRecipie)
          });
            setResponseStatus(res.status);
          if(res.ok){
            
            navigate("/");
          }
      }
      catch(error){
        console.log("err in creating recipie : " + error)
      }
    }
   
 console.log(responseStatus);
  return (
    <div className="recipieForm">
      <form className="form" onSubmit={onSubmit}>
        <div className="name">
            <label htmlFor="name" >Name:</label>
            <input type="text"ref={name} name="name" id="name" />
        </div>
        <div className="description">
            <label htmlFor="description" >Description:</label>
            <input type="text" ref={description} name="description" id="description" />
        </div>
        <div className="Incredients">
            {Incredients.map((Incredient,index)=>{
             return <input type='text' key={index} value={Incredient} onChange={(e)=>{add(e,index)}}></input>
            })}
            <button type='button'onClick={addIncredient}>Add Incredient</button>
        </div>
        <div className="timetiCook">
            <label htmlFor="timetoCook"> Time to Cook</label>
            <input type="number" ref={timetoCook} name="timetoCook" id = 'timetoCook' />
        </div>
        <div className="img">
            <label htmlFor="img">Imgage Url</label>
            <input type="text" ref={imgUrl} name="img" id ='img' />
        </div>

        <div className="submit">
            <button type='submit'>Create Recipie </button>
         </div> 
      </form>
      {responseStatus!==401?null:"Log in needed"}
    </div>
  )
}
