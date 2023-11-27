
import {useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";

// const signupFormStart = {
//     "firstName": "",
//     "lastName": "",
//     "username": "",
//     "email": ""
// }

const loginFormStart = {
    "username": ""
}

function Login({ handleLogin }) {
    // const [signupData, setSignupData] = useState(signupFormStart)
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
    // function handleSignupChange(event) {
    //     setSignupData({
    //         ...signupData,
    //         [event.target.name]: event.target.value
    //     })
    // }
    // console.log(signupData)

    const signupSchema = yup.object().shape({
        firstName: yup.string().required("Must enter a first name").max(15),
        lastName: yup.string().required("Must enter a last name").max(15),
        username: yup.string().required("Must enter a username").max(15),
        email: yup.string().email("Invalid email"),
    })

    const signupFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
        },
        validationSchema: signupSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch('http://localhost:5555/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then(user => handleLogin(user))
                }
            })
        },
    })

    // function handleSignupSubmit(event) {
    //     event.preventDefault()
    //     setSignupData(signupFormStart)
    // }

    const signupForm = () => {
        return(
            <>
                <h1>Signup</h1>
                <form onSubmit={signupFormik.handleSubmit}>
                    <label htmlFor="firstName">Enter First Name:</label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={signupFormik.values.firstName}
                        onChange={signupFormik.handleChange}
                    />
                    <p style={{color: "red"}}>{signupFormik.errors.firstName}</p>

                    <label htmlFor="lastName">Enter Last Name:</label>
                    <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={signupFormik.values.lastName}
                        onChange={signupFormik.handleChange}
                    />
                    <p style={{color: "red"}}>{signupFormik.errors.lastName}</p>

                    <label htmlFor="username">Enter User Name:</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username" 
                        value={signupFormik.values.username} 
                        onChange={signupFormik.handleChange} 
                    />
                    <p style={{color: "red"}}>{signupFormik.errors.username}</p>

                    <label htmlFor="email">Enter Email:</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={signupFormik.values.email}
                        onChange={signupFormik.handleChange}
                    />
                    <p style={{color: "red"}}>{signupFormik.errors.email}</p>

                    <button type="submit">Submit</button>
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