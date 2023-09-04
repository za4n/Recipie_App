import {useState,useEffect} from 'react';
import { getId } from '../customsHooks/getId';
import { useCookies } from 'react-cookie';
import '../Home.css';

export type Recipe = {
  _id:string,
  name:string,
  description :string,
  Incredients:string[],
  img : string,
  timetoCook : number
}

export default function Home(){
 
  const [recipes , setRecipies] = useState<Recipe[]>([]); 
  const [savedRecipiesIds,setSavedRecipiesIds] = useState<string[] >([]) 
  const [cookie,_] = useCookies(['access_token']);
  
  const getIDs = async()=>{
    const userId = getId(); 
   if(userId){
    
    try{
      const response = await fetch(`http://localhost:3001/reciepie/saveRecipies/ids/${userId}`);
      if(response.ok){
       const data = await response.json();
       setSavedRecipiesIds(data.saveRecipies);
      }
    }
    catch(error){
 
    }
   }
   else{
    console.log("cant fetch Ids until u sign in");
   }
  }

  useEffect(()=>{
  const fetchRecipies = async()=>{
    const respnse = await fetch('http://localhost:3001/reciepie');
    if(respnse.ok){
      const data  = await respnse.json();
      setRecipies(data.recipies);
    }
  }
  fetchRecipies();
  getIDs();
},[])

 const save = async(reciepiId:string)=>{
  const userId = getId();
  if(userId){
    try{
      const response = await fetch('http://localhost:3001/reciepie/save',{
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'authorization':cookie.access_token
         },
         body: JSON.stringify({"userId":userId,"recipieId":reciepiId})
      }
      );
      if(response.ok){
       const data  = await response.json();
       
       setSavedRecipiesIds(data.savrecipiesIds);
      }
    }
    catch(error){
 
    }
  }
  else{
    console.log("sign in in order to save");
  }
 }
 
  const disabled = (recipeId:string)=>{
    return savedRecipiesIds.includes(recipeId);
  }
  return (
    <div className="recipiesModel"> 
      {recipes.length ===0 ?'loading...':
      <div className='recipies'>
      {recipes.map((recepie:Recipe)=>(
     <section key={recepie._id}>
    <div className="card">
  <img src = {recepie.img} alt="Recipe Image" className="recipe-image"/>
  <div className="card-content">
    <h2 className="recipe-name">{recepie.name}</h2>
    <p className="recipe-description">{recepie.description}</p>
    <ul className="recipe-ingredients">
     {recepie.Incredients.map((inc)=>{ return <li key={inc.charAt(0)}>{inc}</li>})}
    </ul>
    <p className="recipe-time">Time to Cook: {recepie.timetoCook} minutes</p>
    <button className="save-button" onClick={()=>save(recepie._id)}disabled={disabled(recepie._id)}>{disabled(recepie._id)?"Saved":"Save"}</button>
  </div>
</div>

        </section>
      ))
    }      
        </div>}
    </div>
  )
}
