import React, {useEffect} from "react";

import axios from "axios";
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    jokeContainer: {
        display: 'inline-block',
        textAlign: 'left',
        padding: '30px',
        border: '2px solid #3bd671',
        borderRadius: '10px',
        wordWrap: 'break-word',
        fontSize: '20px',
        maxWidth: '50%',
        marginBottom: '16px',
    },
    randomButton: {
        display: 'block',
        margin: '20px auto',
        backgroundColor: '#3bd671',
        color: '#212937',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
    },
});

const RandomJoke = () => {
    const classes = useStyles();

    const [joke, setJoke] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const getJoke = async () => { if (disabled) return; setDisabled(true);
        const {data} = await axios
            .get("/api/get_random_joke");
        setJoke(data.joke)
        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    }
    useEffect(() => {
        getJoke();
    }, []);

    return (
        <div>
            <Grid container>
                <Grid item md={3} sm={0}></Grid>
                <Grid item md={6} sm={12} sx={{
                    borderRadius: '10px',
                    border: '2px solid #3bd671',
                    padding: '30px',
                    margin: 'auto',
                    textAlign: 'left',
                    fontSize: '20px',
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: '#212937',
                    marginBottom: '16px',
                }}>
                    {joke}
                </Grid>
                <Grid item md={3} sm={0}></Grid>
            </Grid>
            <Grid item textAlign="center">
                <Button size="large" variant="contained" onClick={getJoke}>
                    Новий анекдот
                </Button>
            </Grid>
        </div>
    )
}

export default RandomJoke