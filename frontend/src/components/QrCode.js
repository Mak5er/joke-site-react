import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    qrContainer: {
        fontSize: '20px',
        textAlign: "center",
        marginTop: "20px",
    },

    telegramLink: {
        color: '#3bd671',
        textDecoration: 'none',
    },

    qrCode: {
    borderRadius: "24px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    },


    scanNotice: {
    fontSize: "20px",
    color: "gray",
    marginTop: "10px",
},

})

const QrCode = () => {
    const classes = useStyles();
    return (
        <div className={classes.qrContainer}>
            <h2>Бажаєте більше анекдотів?<br/>
                Тоді <a className={classes.telegramLink} href="https://t.me/AnekdotykyUaBot?start=ref6013011895" target="_blank"
                        rel="noreferrer">переходьте до телеграм бота</a>!</h2>
            <p className="scan-notice">Проскануйте або натисніть на QR-код</p>
            <a href="https://t.me/makser_humor_bot?start=start" target="_blank" rel="noreferrer">
                <img className={classes.qrCode} src="images/qr-code.webp" alt="QR Code"/></a>
        </div>
    );
}

export default QrCode
