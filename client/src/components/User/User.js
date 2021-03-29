import { connect } from 'react-redux';
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

            {user.bought.map(x => <p key={x._id}>{x.title}</p>)}
        </article>
    </section>
)

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(User);