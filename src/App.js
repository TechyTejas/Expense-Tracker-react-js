
import LoginForm from "./Pages/LoginForm";
import Route from "./Routes/Route";
import { useContext } from "react";
import AuthContext from "./LoginStore/Auth-context";
import React from "react";


function App() {
  const authCtx=useContext(AuthContext)
  return (
    <React.Fragment>
   
    <Route/>
    
    </React.Fragment>
    
  );

}

export default App;
