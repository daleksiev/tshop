import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setError } from '../../../actions/messageActions';
import Modal from '..';
import './ModalError.scss';

const ModalError = ({
    error,
    setError,
    time = 5000,
}) => {
    useEffect(() => {
        setTimeout(() => setError(''), time)
    });

    return (
        <Modal onClick={() => setError('')} active={Boolean(error)}>
            <div className="modal-error-container">
                {error}
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    error: state.message.error,
})

const mapDispatchToProps = {
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalError);