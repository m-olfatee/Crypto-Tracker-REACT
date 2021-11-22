import React from 'react'
import { Box, Button, TextField } from '@material-ui/core'

const SignUp = ({ handleClose }) => {
    
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
                type="email"
                label="Enter Email"
                // value={}
                onChange={(e) => {}}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                // value={}
                onChange={(e) => {}}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                // value={}
                onChange={(e) => {}}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "gold" }}
                onClick={handleClose}
            >
                Sign Up
            </Button>
        </Box>
    )
}

export default SignUp
