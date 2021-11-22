import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/MyContext'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    createTheme,
    Table,
    TableContainer,
    TextField,
    ThemeProvider,
    Typography,
    LinearProgress,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    makeStyles,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles({
    row: {
        backgroundColor: "#fff",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#eee",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "#666",
        },
    },
})

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#666",
        },
        type: "light"
    },
})

const CoinList = () => {

    const classes = useStyles()

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const { currency, symbol, coins, isLoading, fetchCoins } = CryptoState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)} />
                <TableContainer>
                    {isLoading ? (
                        <LinearProgress style={{ backgroundColor: "blue" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#666" }}>
                                <TableRow variant="outlined">
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "#fff",
                                                fontSize: 20,
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "left" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0
                                        return (
                                            <TableRow
                                                key={row.name}
                                                className={classes.row}
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <div style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}>
                                                        <img
                                                            src={row.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                                            <span style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}>
                                                                {row.symbol}
                                                            </span>
                                                            <span>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {row.current_price > 1 ?
                                                        row.current_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                                                        row.current_price}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {row.market_cap.toString().slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    count={handleSearch().length === 100 ? 10 : 1}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "5%"
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 500);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinList
