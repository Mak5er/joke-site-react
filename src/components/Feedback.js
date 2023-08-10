import React from "react";
import {Button} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";


const style = {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    p: '4',
};

const Feedback = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIdea('')
    }
    const [idea, setIdea] = React.useState('');


    const sendIdea = async () => {
        console.log(idea)

        try {
            const response = await axios.post('http://127.0.0.1:5000/send_idea', {
                idea
            })
            handleClose();
            console.log(response);
        } catch (error) {
            console.error('Помилка при відправці ідеї:', error);
        }
        ;

        setIdea('')
    }

    return (
        <div className="contact-us">
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
                    <Box sx={style}>
                        <div className="modal-content">
                            <IconButton style={{float: 'right', right: -5, top: -5}} onClick={handleClose}><ClearIcon
                                sx={{color: '#3bd671', fontSize: '20px'}}/></IconButton>
                            <h2>Ваша ідея або анекдот:</h2>
                            <div className="input-container">
                                <textarea className="idea-input" value={idea}
                                          onChange={event => setIdea(event.target.value)} rows="4"
                                          placeholder="Напишіть вашу ідею або анекдот..."></textarea>
                                <IconButton style={{
                                    top: '50%',
                                    right: -10,
                                    transform: 'translateY(-50%)',
                                    position: 'absolute'
                                }} size="small" onClick={() => {
                                    setIdea('')
                                }}><HighlightOffIcon
                                    sx={{color: '#3bd671', fontSize: '20px'}}/></IconButton>
                            </div>
                            <Stack direction="row" spacing={1}>
                                <Button size='small' variant="outlined" color="error" onClick={() => {
                                    setOpen(false);
                                    setIdea('')
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