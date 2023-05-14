import UserProductItem from '../UserProductItem';
import { connect } from 'react-redux';
import { getUser } from '../../../reducers';
import '../User.scss';

const UserFavourites = ({
    user
}) => (
    <div className='user-page-wrapper'>
        <article>
            <h2>Favourite products:</h2>

            {user?.favourites?.length
                ? user?.favourites.map(product => <UserProductItem key={product._id} product={product} />)
                : 'No favourite products found!'
            }
        </article>
    </div>
)

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);