
import {useState} from "react";

const signupFormStart = {
    firstName: "",
    lastName: "",
    username: "",
    email: ""
}

function Login() {
    const [signupData, setSignupData] = useState(signupFormStart)
    const [loginData, setLoginData] = useState("")
    const [signup, setSignup] = useState(false)

    function handleLoginChange(event) {
        setLoginData(event.target.value)
    }

    function handleLogin(event) {
        event.preventDefault()
        console.log(loginData)
        setLoginData("")
    }

    function handleClick() {
        setSignup(!signup)
    }

    const loginForm = () => {
        return (
            <>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Enter User Name:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={loginData} 
                        onChange={handleLoginChange} 
                    />
                    <input type="submit" />
                </form>
                <button onClick={handleClick} >Sign Up</button>
            </>
        )
    }

    function handleSignupChange(event) {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }
    console.log(signupData)

    function handleSignupSubmit(event) {
        event.preventDefault()
        console.log(signupData)
        setSignupData(signupFormStart)
    }

    const signupForm = () => {
        return(
            <>
                <h1>Signup</h1>
                <form onSubmit={handleSignupSubmit}>
                    <label htmlFor="firstName">Enter First Name:</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                    />
                    <label htmlFor="lastName">Enter Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                    />
                    <label htmlFor="username">Enter User Name:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={signupData.username} 
                        onChange={handleSignupChange} 
                    />
                    <label htmlFor="email">Enter Email:</label>
                    <input 
                        type="text"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                    />
                    <input type="submit" />
                </form>
                <button onClick={handleClick} >Go To Login</button>
            </>
        )
    }

    return (
        <div>
            {signup ? signupForm() : loginForm()}
        </div>
    )
}

export default Login