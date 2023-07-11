import React,{useState, useEffect} from "react";

 const AuthContext = React.createContext({
    token:"",
    isLoggedIn: false,
    email:(email)=>{},
    login:()=>{},
    logout: ()=>{}
});


export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)
    const [email,setEmail] = useState(null);
    
    const userIsLoggedIn = !!token; // this convert true or false value into boolean value 
    //if token is string with not empty this will return true
    //iif token is string wiht empty this will return false

    const loginHandler = (token) => {
      // console.log(token)
       setToken(token)
       localStorage.setItem('token', token);
      //  console.log(token)
    }

    const logoutHandler = () => {
       setEmail(null)
       setToken(null)
       localStorage.removeItem('token')
       localStorage.removeItem('email')
    }

    const emailHandler = () =>{
      setEmail(email)
      localStorage.setItem('email', email)
    }
    
    //when ever user run this compo useEffect will run along wiht it
    // when user logged in the token will be set to lcoalstroage
    useEffect(() => {
        const tokenExpirationTimer = setTimeout(() => {
          logoutHandler();
        }, 5 * 60 *1000); // 5 minutes in milliseconds
    
        return () => {
          clearTimeout(tokenExpirationTimer);
        };
      }, [token]);

    const contextValue = {
        token: token,
        isLoggedIn : userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        email: emailHandler
    }
    return <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>
}

export default AuthContext
