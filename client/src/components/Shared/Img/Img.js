import { Spinner } from 'react-bootstrap';
import { useState } from "react";

const Img = ({
    src,
    alt,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <>
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                style={!isLoaded ? { display: 'none' } : {}}
                onError={(e) => {
                    setIsLoaded(true);
                    e.target.src = "https://firebasestorage.googleapis.com/v0/b/t-shop-e1948.appspot.com/o/users%2Funnamed.png?alt=media&token=6adb23b1-b1bc-41ae-9c03-10a38b086a9b"
                }}
            />

            <Spinner style={isLoaded ? { display: 'none' } : {}} animation="border" variant="primary" />
        </>
    )
}

export default Img;