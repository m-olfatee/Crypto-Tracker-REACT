import React, { useState } from 'react';
import { CryptoState } from '../../context/MyContext';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, Button } from '@material-ui/core';
import { AiFillDelete } from "react-icons/ai";

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "gold",
        marginTop: 20,
    },
    picture: {
        width: 150,
        height: 150,
        cursor: "pointer",
        backgroundColor: "gold",
        objectFit: "contain",
    },
    watchList: {
        flex: 1,
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "gold",
        boxShadow: "0 0 3px black",
    },
});

const UserSideBar = () => {

    const classes = useStyles();

    const { userData, setAlert, coins, symbol, watchList, setWatchList, setAuth } = CryptoState()
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const logout = () => {
        setAuth(false)
        setAlert({
            open: true,
            message: `"Logout Successful !"`,
            type: "success",
        });
    }

    const removeFromWatchList = (coin) => {
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

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "gold",
                        }}
                    // src={user.photoURL}
                    // alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                // src={user.photoURL}
                                // alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {userData.username}
                                </span>
                                <div className={classes.watchList}>
                                    <span style={{ fontSize: 15, textShadow: "0 0 1px black" }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchList.includes(coin.id))
                                            return (
                                                <div className={classes.coin}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        {symbol}{" "}
                                                        {coin.current_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removeFromWatchList(coin)}
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        else return <></>;
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logout}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default UserSideBar
