import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinListURL } from '../config/api'
import axios from 'axios'

const Crypto = createContext()

const MyContext = (props) => {
    
    const USERNAME = process.env.REACT_APP_USERNAME
    const PASSWORD = process.env.REACT_APP_PASSWORD

    const [currency, setCurrency] = useState("EUR")
    const [symbol, setSymbol] = useState("€")
    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const userData = { username: USERNAME, password: PASSWORD }
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success"
    })

    let defaultWatchList = localStorage.getItem("watchList")
    const [watchList, setWatchList] = useState([] || defaultWatchList);

    useEffect(() => {
        if (currency === "EUR") setSymbol("€");
        else if (currency === "USD") setSymbol("$");
    }, [currency])

    useEffect(() => {
        if (auth) setUser(USERNAME)
        else setUser(null)
    }, [auth, USERNAME])

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const fetchCoins = async () => {
        setIsLoading(true)
        const { data } = await axios.get(CoinListURL(currency))
        setCoins(data)
        setIsLoading(false)
    }

    return (
        <Crypto.Provider value={{
            currency,
            symbol,
            coins,
            isLoading,
            userData,
            setCurrency,
            fetchCoins,
            alert,
            setAlert,
            user,
            setUser,
            auth,
            setAuth,
            watchList,
            setWatchList
        }}>
            {props.children}
        </Crypto.Provider>
    )
}

export default MyContext

export const CryptoState = () => {
    return useContext(Crypto)
}
