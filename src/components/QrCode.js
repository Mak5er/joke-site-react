import React from "react";

const QrCode = () => {
    return (
        <div className="qr-container">
            <h2>Бажаєте більше анекдотів?<br/>
                Тоді <a className="telegram-link" href="https://t.me/makser_humor_bot?start=start" target="_blank"
                        rel="noreferrer">переходьте до телеграм бота</a></h2>
            <p className="scan-notice">Проскануйте або натисніть на QR-код</p>
            <a href="https://t.me/makser_humor_bot?start=start" target="_blank" rel="noreferrer">
                <img className="qr-code" src="images/qr-code.webp" alt="QR Code"/></a>
        </div>
    );
}

export default QrCode