import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../context/MyContext'
import { TrendCoins } from '../../config/api'
import { Link } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import AliceCarousel from 'react-alice-carousel'

const useStyle = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "gold",
    },
}))

const Carousel = () => {

    const classes = useStyle()
    const [trend, setTrend] = useState([])
    const { currency, symbol } = CryptoState()

    const fetchTrendCoins = async () => {
        const { data } = await axios.get(TrendCoins(currency))
        setTrend(data)
    }

    useEffect(() => {
        fetchTrendCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const items = trend.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                }}>
                    {coin.symbol} &nbsp; {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {
                        coin.current_price > 1 ?
                            coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                            coin.current_price}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 1,
        },
        350: {
            items: 2,
        },
        512: {
            items: 3,
        },
        720: {
            items: 4,
        },
        1024: {
            items: 5,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel
