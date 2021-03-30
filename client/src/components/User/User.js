import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './User.module.scss';

const User = ({
    user,
}) => (
    <section className={styles['user-page-wrapper']}>
        <article>
            <h2>Email:</h2>

            <p>{user.email}</p>
        </article>

        <article>
            <h2>Bought products:</h2>

            {user?.bought.map(product => <Link to={`/products/${product._id}`} key={product._id}>{product.title}</Link>)}
        </article>
    </section>
)

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(User);