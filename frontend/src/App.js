import './App.css';
import Home from './pages/Home';
import Api from './pages/Api';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from './themes/theme';



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