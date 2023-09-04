import { useState } from "react"
import { Link } from "react-router-dom";
import { getName } from "../customsHooks/getName";

type PdispProp = {
    logOut : ()=>void
}

  
export default function Pdisp({logOut}:PdispProp) {
   const [open , setOpen] = useState<boolean>(false);
   const name = getName();
  return (
    <>
    
      
    </>

  )
}
