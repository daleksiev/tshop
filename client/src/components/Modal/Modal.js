import './Modal.scss';

const Modal = ({
    children,
    active,
    onClick,
}) => (
    <div onClick={onClick} className={"modal-wrapper " + (active ? 'active' : '')}>
        {children}
    </div>
)

export default Modal;