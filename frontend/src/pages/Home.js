import RandomJoke from "../components/RandomJoke";
import QrCode from "../components/QrCode";
import Feedback from "../components/Feedback";
import NavigationDrawer from "../components/NavigationDrawer";
import {Link} from "react-router-dom";


const Home = () => {
    return (
        <div>
            <div className="header">
                <h1>Анекдоти <span className="ukrainian-word">українською</span></h1>
            </div>
            <RandomJoke/>
            <QrCode/>
            <Feedback/>
        </div>
    );
}


export default Home
