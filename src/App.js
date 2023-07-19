import Footer from "./Layouts.js/Footer";
import Home from "./Pages/Home";
// import Route from "../Routes/Route";
import Route from './Routes/Route'
import {  useSelector } from "react-redux/es/hooks/useSelector";



function App() {
  const isDarkMode = useSelector(state=>state.auth.isDarkToggle)
  console.log(isDarkMode + "hii tejas is dark toffle")
  
  return (
    <div >
    <Home/>
    <Route/>
    <Footer/>
    </div>
  );

}

export default App;
