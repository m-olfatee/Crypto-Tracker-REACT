import React from 'react'
import { CryptoState } from '../context/MyContext'
import { useNavigate } from 'react-router-dom'
import {
    AppBar,
    Container,
    MenuItem,
    Toolbar,
    Typography,
    Select,
    makeStyles,
    createTheme,
    ThemeProvider
} from '@material-ui/core'
import LoginModal from './login/LoginModal'
import UserSideBar from './login/UserSideBar'
import Logo from '../assets/logo.svg'

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "#666",
        fontFamily: "Montserrat",
        cursor: "pointer",
    },
}))

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        type: "light"
    },
})

const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate()
    const { currency, setCurrency, user } = CryptoState()

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")}
                            className={classes.title}
                            variant="h6">
                            <img src={Logo} alt="Logo" className='logo' />
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                                color: "black",
                            }}
                            value={currency}
                            onClick={(event) => setCurrency(event.target.value)}
                        >
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                            <MenuItem value={'USD'}>USD</MenuItem>
                        </Select>
                        {user ? <UserSideBar /> : <LoginModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
