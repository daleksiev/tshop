import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setMessage } from '../../../actions/messageActions';
import Modal from '..';
import './ModalSuccess.scss';

const ModalSuccess = ({
    success,
    setMessage,
    time = 3000
}) => {
    useEffect(() => {
        setTimeout(() => setMessage(''), time)
    });

    return (
        <Modal onClick={setMessage.bind(undefined, '')} active={Boolean(success)}>
            <div className="modal-success-container">
                {success}
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    success: state.message.success,
})

const mapDispatchToProps = {
    setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSuccess);