import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/MyContext'
import { CoinDetail } from '../config/api'
import CoinInfo from '../components/CoinInfo'
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
        },
    },
    sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    },
    heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
    },
    description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    },
    marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "start",
        },
    },
}));

const Coin = () => {

    const classes = useStyles()
    const { id } = useParams()
    const [coin, setCoin] = useState()
    const { currency, symbol, auth, watchList, setWatchList, setAlert } = CryptoState()

    const fetchCoin = async () => {
        const { data } = await axios.get(CoinDetail(id))
        setCoin(data)
    }

    const inWatchList = watchList.includes(coin?.id);

    useEffect(() => {
        fetchCoin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToWatchList = () => {
        setWatchList([...watchList, coin.id])
        setAlert({
            open: true,
            message: `${coin.name} Added to the WatchList !`,
            type: "success",
        });
    }

    const removeFromWatchList = () => {
        const available = watchList.find((element) => element === coin.id)
        const index = watchList.indexOf(available)
        let copyWatchList = [...watchList]
        copyWatchList.splice(index, 1)
        setWatchList(copyWatchList)
        setAlert({
            open: true,
            message: `${coin.name} Removed from WatchList !`,
            type: "success",
        });
    }

    if (!coin) return <LinearProgress style={{ backgroundColor: "blue" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin.image.large}
                    alt={coin.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography variant="h3" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
                </Typography>
                <div className={classes.marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {coin.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {coin.market_data.current_price[currency.toLowerCase()] > 1 ?
                                coin.market_data.current_price[currency.toLowerCase()].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                                coin.market_data.current_price[currency.toLowerCase()]
                            }
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            M
                        </Typography>
                    </span>
                    {auth && (
                        <Button
                            variant="outlined"
                            style={{
                                width: "100%",
                                height: 40,
                                backgroundColor: inWatchList ? "#ff0000" : "#EEBC1D",
                            }}
                            onClick={inWatchList ? removeFromWatchList : addToWatchList}
                        >
                            {inWatchList ? "Remove from WatchList" : "Add to WatchList"}
                        </Button>
                    )}
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}

export default Coin
