import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

export function Login() {
    const [loginEmail, setLoginEmail] = useState("test@example.com");
    const [loginPassword, setLoginPassword] = useState("securepassword");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('/auth/login', { email: loginEmail, password: loginPassword });

            const { accessToken, refreshToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            window.location.href = '/';
        } catch (error) {
            alert("Incorrect login or password!");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axiosInstance.post('/auth/register', { email: registerEmail, username: registerUsername, password: registerPassword});

            alert('Registration successful!');

            setRegisterEmail("");
            setRegisterUsername("");
            setRegisterPassword("");
        } catch (error) {
            alert("Error registering user!");
        }
    };

    return (
        <div className="authContainer">
            <div className="loginContainer">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={loginEmail} 
                        onChange={(event) => setLoginEmail(event.target.value)} required/>
                    <input type="password" placeholder="Password" value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)} required/>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="registerContainer">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="email" placeholder="Email" value={registerEmail}
                        onChange={(event) => setRegisterEmail(event.target.value)} required/>
                    <input type="text" placeholder="Username" value={registerUsername}
                        onChange={(event) => setRegisterUsername(event.target.value)}/>
                    <input type="password" placeholder="Password" value={registerPassword}
                        onChange={(event) => setRegisterPassword(event.target.value)} required/>
                    <button type="submit">Register</button>
                </form>
            </div>
            <p>
                "email": test@example.com
                "password": securepassword
            </p>
        </div>
    );
}
