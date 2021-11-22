import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/MyContext'
import SelectButton from './SelectButton'
import { chartDays } from '../config/chartDays'
import { ChartInfo } from '../config/api'
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
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

const CoinInfo = ({ coin }) => {

    const classes = useStyles()

    const [chartData, setChartData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = CryptoState()

    const fetchData = async () => {
        const { data } = await axios.get(ChartInfo(coin.id, days, currency))
        setChartData(data.prices)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])

    return (

        <ThemeProvider theme={lightTheme}>
            <div className={classes.container}>
                {!chartData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1} />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: chartData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: chartData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#666",
                                        borderWidth: 2
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 0,
                                    },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}>
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>)}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo
