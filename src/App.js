import './App.css';
import RandomJoke from './components/RandomJoke';
import QrCode from './components/QrCode';
import Feedback from './components/Feedback';
import {Helmet} from 'react-helmet';
import {ThemeProvider, createTheme} from '@mui/material/styles';

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
                <Helmet>
                    <meta name="description"
                          content="Це сайт з анекдотами українською мовою. Отримайте вашу дозу гумору з смішними анекдотами."/>
                </Helmet>
                <div className="header">
                    <h1>Анекдоти <span className="ukrainian-word">українською</span></h1>
                </div>
                <RandomJoke/>
                <QrCode/>
                <Feedback/>
            </div>
        </ThemeProvider>
    );
}

export default App;
