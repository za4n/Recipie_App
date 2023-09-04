import { useState,useEffect } from "react"
import { Recipe } from "./Home";
import { getId } from "../customsHooks/getId";

import '../Home.css';

export default function SavedRecipies(){


  const [recipes , setRecipies] = useState<Recipe[]>([]); 
  useEffect(()=>{
    const fetchRecipies = async()=>{
      const userId = getId();
      const respnse = await fetch(`http://localhost:3001/reciepie/saveRecipies/${userId}`);
      if(respnse.ok){
        const data  = await respnse.json();
        setRecipies(data.saveRecipies);
      }
    }
    fetchRecipies();
  },[])
  

  return (
    <div className="saveRecipies">
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

  </div>
</div>

        </section>
      ))
    }      
        </div>}    
    </div>
  )
}
