import './App.css';
import Home from './pages/Home';
import Api from './pages/Api';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {green} from "@mui/material/colors";

const theme  = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
    },
})


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