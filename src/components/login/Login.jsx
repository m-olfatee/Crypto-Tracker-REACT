import React, { useState } from 'react'
import { CryptoState } from '../../context/MyContext';
import { Box, Button, TextField } from '@material-ui/core'

const Login = ({ handleClose }) => {

    const { setAlert, userData , setAuth} = CryptoState()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!username || !password) {
            setAlert({
                open: true,
                message: "Please fill all the Fields",
                type: "error",
            });
            setUsername("")
            setPassword("")
            return;
        }
        if (username === userData.username && password === userData.password) {
            setAlert({
                open: true,
                message: `Login Successful. Welcome ${username}`,
                type: "success",
            });
            setAuth(true)
            handleClose();
        } else {
            setAlert({
                open: true,
                message: `Your Username or Password is wrong! Try again.`,
                type: "error",
            });
            setUsername("")
            setPassword("")
        }
    }

    return (
        <Box
            p={3}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="text"
                label="Enter Username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "gold" }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    )
}

export default Login
