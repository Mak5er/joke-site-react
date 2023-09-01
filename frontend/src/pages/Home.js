import RandomJoke from "../components/RandomJoke";
import QrCode from "../components/QrCode";
import Feedback from "../components/Feedback";
import NavigationDrawer from "../components/NavigationDrawer";
import {Link} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../themes/theme";

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
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


export default Home
