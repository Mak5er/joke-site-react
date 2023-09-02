import React from "react";
import {Button, InputAdornment, TextField} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import {makeStyles, useTheme} from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    contactUs: {
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '20px',
        color: 'white',
    },

    inputContainer: {
        position: 'relative',
        marginBottom: '10px',
    },
    ideaInput: {
        width: '100%',
        padding: '10px',
        border: 'none',
        backgroundColor: '#131a26',
        color: 'white !important',
        fontSize: '16px',
        borderRadius: '5px',
        outline: 'none',
        resize: 'none',
    },
    clearIcon: {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '28px',
        color: '#3bd671',
    },
    clearIconHover: {
        '&:hover': {
            color: '#fff',
        },
    },
}));

const Feedback = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIdea('')
        setError('')
    }
    const [idea, setIdea] = React.useState('');

    const [error, setError] = React.useState('');


    const sendIdea = async () => {
        if (idea.trim() === "") {
            setError("Поле не може бути порожнім!")
            return;
        }

        try {
            const response = await axios.post(
                "https://api.anekdoty.pp.ua/send_idea",
                {
                    idea,
                }
            );
            handleClose();
            console.log(response);
        } catch (error) {
            console.error("Помилка при відправці ідеї:", error);
        }

        setIdea("");
    };

    return (
        <div className={classes.contactUs}>
            <p>Хочете запропонувати анекдот <br/> чи знайшли помилку?</p>
            <Button size="medium" variant="outlined" onClick={handleOpen}>Зв'язатися з нами</Button>
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
                        p: '4',}}>
                        <div className="modalContent">
                            <IconButton style={{float: 'right', right: -5, top: -5}} onClick={handleClose}><ClearIcon
                                sx={{color: '#3bd671', fontSize: '20px'}}/></IconButton>
                            <h2>Ваша ідея або анекдот:</h2>
                            <div className={classes.inputContainer}>
                                <TextField id="full-width"
                                           InputProps={{
                                               className: classes.ideaInput,
                                               endAdornment: (<InputAdornment onClick={() => setIdea('')}
                                                                              position="end"><HighlightOffIcon sx={{
                                                   color: '#3bd671', fontSize: '20px'
                                               }}/> < /InputAdornment>)
                                           }}
                                           variant="outlined"
                                           value={idea}
                                           onChange={(event) => {
                                               setIdea(event.target.value);
                                               setError('')
                                           }}
                                           multiline
                                           rows={4}
                                           placeholder="Напишіть вашу ідею або анекдот..."
                                           fullWidth
                                           error={!!error}
                                           helperText={error}
                                />
                            </div>
                            <Stack direction="row" spacing={1}>
                                <Button size='small' variant="outlined" color="error" onClick={() => {
                                    setOpen(false);
                                    setIdea('');
                                    setError('');
                                }}>Скасувати</Button>

                                <Button size='small' variant="contained" onClick={sendIdea}>Відправити</Button>
                            </Stack>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default Feedback