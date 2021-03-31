import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setMessage } from '../../../actions/messageActions';
import Modal from '..';
import { getMessageSuccess } from '../../../reducers';
import './ModalSuccess.scss';

const ModalSuccess = ({
    success,
    setMessage,
    time = 5000,
}) => {
    useEffect(() => {
        const timeout = setTimeout(() => setMessage(''), time);

        return () => {
            clearTimeout(timeout)
        }
    }, [setMessage, time]);

    return (
        <Modal onClick={() => setMessage('')} active={Boolean(success)}>
            <div className="modal-success-container">
                {success}
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    success: getMessageSuccess(state),
})

const mapDispatchToProps = {
    setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSuccess);