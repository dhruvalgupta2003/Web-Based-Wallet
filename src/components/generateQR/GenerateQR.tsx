import React from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

const GenerateQR: React.FC = () => {
    const location = useLocation();
    const publicKey = location.state?.publicKey;

    if (!publicKey) {
        return <div>Error: No public key provided</div>;
    }

    console.log(publicKey);
    
    return (
        <div>
            <h3>Your Public Key QR Code</h3>
            <QRCode 
                value={publicKey.toString()} 
                size={256} // size of the QR code (in pixels)
                fgColor="#000000" // color of the QR code
                bgColor="#ffffff" // background color of the QR code
                level="L" // error correction level ("L", "M", "Q", "H")
                includeMargin={true} // include a margin around the QR code
            />
        </div>
    );
};

export default GenerateQR;
