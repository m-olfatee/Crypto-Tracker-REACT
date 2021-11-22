import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import Carousel from './Carousel'
import hero from '../../assets/hero.jpg'

const useStyles = makeStyles(() => ({
    hero: {
        backgroundImage: `url(${hero})`,
        backgroundPosition: "right",
        backgroundSize: "cover"
    },
    heroContent: {
        height: 450,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
        color: "#fff",
        width: "70%"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Montserrat",
        color: "gold",
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",

    }
}))

const Hero = () => {

    const classes = useStyles()
    
    return (
        <div className={classes.hero}>
            <Container className={classes.heroContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h1"
                        style={{
                            marginBottom: 15,
                        }}
                    >
                        Crypto Tracker
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            textTransform: "capitalize",
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Hero
