import RandomJoke from "../components/RandomJoke";
import QrCode from "../components/QrCode";
import Feedback from "../components/Feedback";

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
