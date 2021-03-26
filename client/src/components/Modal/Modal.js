import './Modal.scss';

const Modal = ({
    children,
    active,
    onClick,
}) => {

    return (
        <div onClick={onClick} className={"modal-wrapper " + (active ? 'active' : '')}>
            {children}
        </div>
    )
}

export default Modal;