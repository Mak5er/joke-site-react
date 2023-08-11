import React, {useEffect} from "react";

import axios from "axios";
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';

const RandomJoke = () => {
    const [joke, setJoke] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const getJoke = async () => { if (disabled) return; setDisabled(true);
        const {data} = await axios
            .get("http://127.0.0.1:5000/get_random_joke");
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
                <Grid item sm={3} xs={0}></Grid>
                <Grid item sm={6} xs={12} sx={{
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
                <Grid item sm={3} xs={0}></Grid>
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