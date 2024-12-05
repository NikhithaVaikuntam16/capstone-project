import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

const Modal = ({children}) => {
    const elRef = useRef(null);
    if(elRef.current === null) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modal = document.getElementById("modal");
        modal.appendChild(elRef.current);
        
        return () => modal.removeChild(elRef.current);
    }, []);

    return createPortal(children, elRef.current);
}

export default Modal;