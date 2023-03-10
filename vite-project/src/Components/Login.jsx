import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../Context/AuthProvider'
import Axios from '../Api/Axios'
const LOGIN_URL = "./auth"   //Need Backend for this
const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userref = useRef()
    const errref = useRef()
    const [user, setuser] = useState("")
    const [pwd, setpwd] = useState("")
    const [errmsg, seterrmsg] = useState("")
    const [success, setsuccess] = useState(false)

    const callapi = (() => {
        useRef.current.focus()
    })
    useEffect(() => {
        callapi()
    }, [])

    const callapi2 = (() => {
        seterrmsg(" ")
    }, [user, pwd])
    const HandleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await Axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), { headers: { "Content-Type": "application/json" }, withCredentials: true });
            console.log(JSON.stringify(response?.data))
            // console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken })
            setuser("")
            setpwd("")
            setsuccess(true)
        }
        catch (err) {
            if (!err?.response) {
                seterrmsg("No Server Response")
            } else if (err.response?.status === 400) {
                seterrmsg("Missing Username or Password")
            } else if (err.response?.status === 401) {
                seterrmsg("Unauthorized")
            } else {
                errmsg("Login Failed")
            }
            errref.current.focus()

        }

    }

    return (
        <>
            {
                success ? (
                    <section>
                        <h1>You are logged In</h1>
                        <br />
                        <p>
                            <a href={"#"}>Go to home</a>
                        </p>
                    </section>
                ) : (
                    <div>
                        <h2>Registation Page</h2>
                        <section>
                            {/* <p ref={errref} className={errmsg ? errmsg : "offscreen"} aria-live={"assertive"}>{errmsg}</p> */}
                            <h1>Sign In</h1>
                            <form onSubmit={HandleSubmit}>
                                <label htmlFor={"username"}>username:</label>
                                <input type={"text"} id={"username"} ref={userref} autoComplete={"off"} onChange={((e) => setuser(e.target.value))} value={user} required />
                                <label htmlFor={"password"}>Password:</label>
                                <input type={"password"} id={"password"} onChange={((e) => setpwd(e.target.value))} value={pwd} required />
                                <button>Sign In</button>
                            </form>
                            <p>
                                Need an account?<br />
                                <span className={"line"}>
                                    {/*Put router link herer */}
                                    <a href={"#"}>Sign Up</a>
                                </span>
                            </p>
                        </section>
                    </div>
                )
            }
        </>
    )
}

export default Login




