import { ApiDescription } from '../components/ApiDescription';
import QrCode from "../components/QrCode";
import Feedback from "../components/Feedback";

const Api = () => {
    return (
        <div>
            <div className="header">
                <h1>Анекдоти <span className="ukrainian-word">українською</span> API</h1>
                <ApiDescription />
                <QrCode/>
                <Feedback/>
            </div>
        </div>
    );
}

export default Api;