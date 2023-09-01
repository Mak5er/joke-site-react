import React, { useState } from 'react';
import {Drawer, Button, List, ListItem, ListItemText, Paper} from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const NavigationDrawer = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (isOpen) => {
        setOpen(isOpen);
    };

    return (
        <div>
            <Button onClick={() => toggleDrawer(true)}>Відкрити Drawer</Button>
                <Drawer
                anchor="left"
                open={open}
                style={{
                    color: '#ff0000',
                }}
                onClose={() => toggleDrawer(false)}
                >
                    <Box p={2} width='300px' role='presentation'>
                        Hello
                    </Box>
                </Drawer>
    </div>
    );
};

export default NavigationDrawer;