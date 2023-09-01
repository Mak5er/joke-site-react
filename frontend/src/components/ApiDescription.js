import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

export const ApiDescription = () => {
    const jokesApiMethods = [
        {path: '/api/get_random_joke', description: 'Отримати випадковий анекдот'},
        // Додайте інші методи API та їх описи
    ];

    return (
        <div>
            {jokesApiMethods.map((method, index) => (
                <div key={index} className="api-method">
                    <Grid container>
                        <Grid item sm={4} xs={0}></Grid>
                        <Grid item sm={4} xs={12} sx={{
                            borderRadius: '10px',
                            border: '2px solid #3bd671',
                            padding: '30px',
                            margin: 'auto',
                            textAlign: 'center',
                            fontSize: '20px',
                            color: 'white',
                            fontFamily: 'Arial, sans-serif',
                            backgroundColor: '#212937',
                            marginBottom: '16px',

                        }}>
                            <Typography variant="h5" component="h2">
                                {method.path}
                            </Typography>
                            <Typography>{method.description}</Typography>
                        </Grid>
                        <Grid item sm={4} xs={0}></Grid>
                    </Grid>
                </div>
                ))}
        </div>
    );
};