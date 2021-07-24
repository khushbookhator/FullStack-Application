import React, { useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import { saveData } from '../../Utils/localStorage'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(false)
    const [token, setToken] = useState("")

    const saveUserInfo = (response) => {
        saveData('user', response.data)
        setToken(response.token)
        console.log("successfull")
       
    }
    if(token){
        return <Redirect push to="/home"/>
    }
    
    const LoginToAccount = () => {
        const payload = {
            username: username,
            password: password
        }
        axios.post("http://localhost:1105/signin", payload)
        .then((res) => saveUserInfo(res.data))
        .catch((err) => setErr(true))
        setUsername("")
        setPassword("")
    }

    return (
        <>
        <Container>
            <RightCol>
                <LoginDetails>
                    <h3>Log In To Your Account</h3>
                    <br/><br/>
                    <LoginInput onChange={(e) => setUsername(e.target.value)} placeholder="Username"/><br/>
                    <LoginInput onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                    {err && 
                    <p>Either username or password isincorrect.</p>}
                    <ForgetPassword>Forget Password?</ForgetPassword>
                    <LoginButton onClick={LoginToAccount}>Login</LoginButton>
                </LoginDetails>
                <div style={{
                    textAlign:"center"
                }}>
                    <p>or login with</p>
                    <div style={{
                        width:"12%",
                        margin:"auto",
                        display:'flex',
                        gap:"10px",
                    }}>
                        {/* <Logo src={google} alt="google"/>
                        <Logo src={facebook} alt="facebook"/> */}
                    </div>
                    <p>Need an account ? Sign up</p>
                </div>
            </RightCol>
        </Container>
        </>
    )
}

export {Login}

const Container = styled.div`
    height: 100vh;
    background-image: url("https://img.freepik.com/free-photo/elevated-view-stethoscope-blue-background_23-2148050517.jpg?size=626&ext=jpg");
    background-size: cover;
`
const RightCol = styled.div`
    align-items: center;
    width:50%;
    margin-left: 50%;
`
const LoginDetails = styled.div`    
    padding-top: 15%;
    width:50%;
    margin:auto;
    color: #222333;
    p{
        text-align: left;
        font-size: 14px;
        color: #222333
    }
`
const LoginInput = styled.input`
    border: 1px solid #808080;
    border-radius: 4px;
    height: 40px;
    width:99%;
    margin-bottom: 10px;
    outline: none;
    padding: 5px;
`
const ForgetPassword = styled.p`
    color: #374375;
    text-align: right;
    font-size : 12px;
    margin-bottom: 20px;
`
const LoginButton = styled.button`
    background: #222333;
    border-radius: 4px;
    color: white;
    outline: none;
    border: 1px solid #808080;
    width:100%;
    height: 40px;
    cursor: pointer;
    font-weight: 600;
    :hover{
        background: #fff;
        color: #222333;
        
        /* border: 1px solid #222333 */
    }
`
const Logo = styled.img`
    width: 50%;
    margin:10px;
    margin:auto;
`