import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './User.module.scss';
import { getUser } from '../../reducers';
import Input from '../Shared/Input';
import { updateUserInfoAsync } from '../../actions/userActions';
import { setMessage, setError } from '../../actions/messageActions';
import { Spinner } from 'react-bootstrap';

const User = ({
    user,
    updateUserInfoAsync,
    setMessage,
    setError,
}) => {
    const onChangeImage = (e) => {
        if (e.target.files[0]) {
            updateUserInfoAsync(user._id, { ...user, image: e.target.files[0] }, user.accessToken)
                .then(res => setMessage('You updated your profile image successfully!'))
                .catch(err => setError(err.message))
        }
    }

    return (
        <section className={styles['user-page-wrapper']}>
            <article>
                <h2>Profile image: </h2>

                <div>

                    {user.isLoading
                        ? <Spinner animation="border" variant="primary" />
                        : <img src={user.imageUrl} alt={user.image} />}
                </div>

                <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="file"
                    fileTitle="Change profile image"
                    onChange={onChangeImage}
                />

                <h2>Email:</h2>

                <p>{user.email}</p>
            </article>

            <article>
                <h2>Bought products:</h2>

                {user?.bought.map(product => <Link to={`/products/${product._id}`} key={product._id}>{product.title}</Link>)}
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