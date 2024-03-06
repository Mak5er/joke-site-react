import React, {useEffect, useState} from "react";

import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {Button} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    modalContent: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        p: '4',
    },
    ideaInput: {
        width: '100%',
    },
}));

const RandomJoke = () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    const [joke, setJoke] = useState("");
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');

    const getJoke = async () => {
        if (disabled) return;
        setDisabled(true);
        const { data } = await axios.get(`${REACT_APP_API_URL}/get_random_joke`);
        setJoke(data.joke);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    };

    const handleCategoryClick = async (category) => {
        setOpen(false);
        setCategory(category);
        if (disabled) return;
        setDisabled(true);
        const categoryUrlParam = `?category=${category}`;
        const { data } = await axios.get(`${REACT_APP_API_URL}/get_random_joke${categoryUrlParam}`);
        setJoke(data.joke);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    };

    useEffect(() => {
        getJoke();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

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
            <Grid container mt={1} justifyContent="center">
                <Grid item mr={2}>
                    <Typography variant="body1" component="div" sx={{display: 'flex', alignItems: 'center'}}>
                        <ThumbUpIcon fontSize="large" sx={{color: "green"}}/>
                        <span style={{color: "green", marginLeft: '8px'}}>{likes}</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" component="div" sx={{display: 'flex', alignItems: 'center'}}>
                        <ThumbDownIcon fontSize="large" sx={{color: "red"}}/>
                        <span style={{color: "red", marginLeft: '8px'}}>{dislikes}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid mt={1} container spacing={2} justifyContent="center"> {/* Додано spacing={2} */}
                <Grid item>
                    <Button color="primary" size="large" variant="contained" onClick={getJoke}>
                        Новий анекдот
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" size="large" variant="outlined" onClick={() => setOpen(true)}>
                        Обрати Категорію
                    </Button>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}>
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        p: '4',
                    }}>
                        <div className="modalContent">
                            <IconButton style={{float: 'right', right: -5, top: -5}} onClick={handleClose}><ClearIcon
                                sx={{color: '#3bd671', fontSize: '20px'}}/></IconButton>
                            <h2>Оберіть категорію:</h2>
                            <Grid container spacing={2}>
                                <Grid container justifyContent="center">
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_гроші')} mb={2}>💵Гроші</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_родину')}
                                                mb={2}>👨‍👩‍👦‍👦Родина</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_білявок')}
                                                mb={2}>👱‍♀️Блондинки</Button>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_тещу')} mb={2}>👵Теща</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_школу')} mb={2}>🏫Школа</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_вовочку')}
                                                mb={2}>👦Вовочка</Button>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_медицину')}
                                                mb={2}>🏥Медицина</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_студентів')}
                                                mb={2}>🎓Студенти</Button>
                                    </Grid>
                                    <Grid item mr={2} mt={2}>
                                        <Button color="primary" size="large" variant="outlined"
                                                onClick={() => handleCategoryClick('про_роботу')}
                                                mb={2}>🏢Робота</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default RandomJoke;
