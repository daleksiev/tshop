import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setError } from '../../../actions/messageActions';
import Modal from '..';
import { getMessageError } from '../../../reducers';
import './ModalError.scss';

const ModalError = ({
    error,
    setError,
    time = 5000,
}) => {

    useEffect(() => {
        const timeout = setTimeout(() => setError(''), time);

        return () => {
            clearTimeout(timeout)
        }
    }, [setError, time]);

    return (
        <Modal onClick={() => setError('')} active={Boolean(error)}>
            <div className="modal-error-container">
                {error}
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    error: getMessageError(state),
})

const mapDispatchToProps = {
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalError);