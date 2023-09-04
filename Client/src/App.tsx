import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Auth from "./Components/Auth";
import Recipie from './Components/Recipie';
import SavedRecipies from './Components/SavedRecipies';
import Edit from './Components/Edit';



const App: React.FC = () => {
 
 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element = {<Nav></Nav>}>
      <Route index element= {<Home></Home>}></Route>
      <Route path='createRecipie' element= {<Recipie></Recipie>}></Route>
      <Route path="auth" element={<Auth></Auth>}></Route>
      <Route path="saveRecpies" element={<SavedRecipies></SavedRecipies>}></Route>
      <Route path='edit' element = {<Edit></Edit>}></Route>
    </Route>
  )
 )
  
  return(
  <div>
<RouterProvider router={router}></RouterProvider>
  </div>

  );

  
};

export default App;
