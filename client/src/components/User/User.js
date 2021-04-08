import { connect } from 'react-redux';
import styles from './User.module.scss';
import { getUser } from '../../reducers';
import Input from '../Shared/Input';
import { updateUserInfoAsync } from '../../actions/userActions';
import { setMessage, setError } from '../../actions/messageActions';
import { Spinner } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import Button from '../Shared/Button';
import { useState } from 'react';

const User = ({
    user,
    updateUserInfoAsync,
    setMessage,
    setError,
}) => {
    const [state, onChangeInput] = useForm({
        email: user.email,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const onClickUpdateUserInfo = () => {
        updateUserInfoAsync(user._id, state, user.accessToken)
            .then(() => setMessage('You updated your profile email address successfully!'))
            .catch(err => setError(err.message))
    }

    const onChangeImage = (e) => {
        if (e.target.files[0]) {
            setIsLoading(true);
            updateUserInfoAsync(user._id, { ...user, image: e.target.files[0] }, user.accessToken)
                .then(() => {
                    setIsLoading(false);
                    setMessage('You updated your profile image successfully!')
                })
                .catch(err => {
                    setIsLoading(false);
                    setError(err.message)
                })
        }
    }

    return (
        <section className={styles['user-page-wrapper']}>
            <article>
                <h2>Profile image: </h2>

                <div>

                    {isLoading
                        ? <Spinner animation="border" variant="primary" />
                        : (
                            <>
                                <img
                                    src={user.imageUrl}
                                    alt={user.image}
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
                </div>

                <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="file"
                    fileTitle="Change profile image"
                    onChange={onChangeImage}
                />

                <h2>Email:</h2>

                <Input
                    id="email"
                    name="email"
                    type="text"
                    onChange={onChangeInput}
                    value={state.email}
                />

                <Button name="Update" onClick={onClickUpdateUserInfo}>
                    {user.isLoading &&
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    }
                </Button>
            </article>
        </section>
    )
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {
    updateUserInfoAsync,
    setMessage,
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(User);