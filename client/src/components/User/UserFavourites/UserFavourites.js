import UserProductItem from '../UserProductItem';
import { connect } from 'react-redux';
import { getUser } from '../../../reducers';
import styles from '../User.module.scss';

const UserFavourites = ({
    user
}) => (
    <div className={styles['user-page-wrapper']}>
        <article>
            <h2>Favourite products:</h2>

            {user?.favourites.map(product => <UserProductItem key={product._id} product={product} />)}
        </article>
    </div>
)

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);