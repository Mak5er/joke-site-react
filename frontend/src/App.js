import './App.css';
import Home from './pages/Home';
import Api from './pages/Api';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3bd671',
        },
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path='/' element={ <Home /> }/>
                        <Route path='/api' element={ <Api /> }/>
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
