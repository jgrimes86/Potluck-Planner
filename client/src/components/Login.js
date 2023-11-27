
import {useState} from "react";

const signupFormStart = {
    "firstName": "",
    // "lastName": "",
    "username": "",
    "email": ""
}

const loginFormStart = {
    "username": ""
}

function Login({ handleLogin }) {
    const [signupData, setSignupData] = useState(signupFormStart)
    const [loginData, setLoginData] = useState(loginFormStart)
    const [signup, setSignup] = useState(false)

    // Login form will allow existing user to log into their account.  Connected to a 'check authorization' method in server/app.
    function handleLoginChange(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    function handleLoginSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:5555/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(user => handleLogin(user))
            }
        })
        setLoginData(loginFormStart)
    }
    // console.log(loginData)

    function handleClick() {
        setSignup(!signup)
    }

    const loginForm = () => {
        return (
            <>
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="username">Enter User Name:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={loginData.username} 
                        onChange={handleLoginChange} 
                    />
                    <input type="submit" />
                </form>
                <button onClick={handleClick} >Sign Up</button>
            </>
        )
    }

    // Signup will create a new user and log them in.  Connected to a 'create user' route in server/app and then to an automatic login route.
    function handleSignupChange(event) {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }
    // console.log(signupData)

    function handleSignupSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:5555/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(user => handleLogin(user))
            }
        })
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
                    {/* <label htmlFor="lastName">Enter Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                    /> */}
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