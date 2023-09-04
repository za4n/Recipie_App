
import { Link, useNavigate , Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getName } from "../customsHooks/getName";

 const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
   <>
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="createRecipie">Create Recipe</Link>
      
      {!cookies.access_token ? (
        <Link to="auth">Login/Register</Link>
      ) : 
       
        
         <>
          <Link to="saveRecpies">Saved Recipes</Link>
        <div className="user-profile">
        <div className="profile-circle" id="profile-circle">{getName()?.charAt(0).toUpperCase()}</div>
        <div className="profile-links">
            <Link to="edit">Edit Profile</Link>
            <button onClick={logout}>Log Out</button>
        </div>
        </div>
         </>
        
        
      }
    </div>
    <main>
      <Outlet></Outlet>
    </main>
   </>
  );
};
export default Navbar