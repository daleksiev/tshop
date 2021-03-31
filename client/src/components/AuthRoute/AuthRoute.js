import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../reducers';

const AuthRoute = (props) => (
    <>
        {props.user.isLoggedIn
            ? <Route {...props} />
            : <Redirect to={props.to || '/'} />
        }
    </>
)

const mapStateToProps = (state) => ({
    user: getUser(state),
})

export default connect(mapStateToProps)(AuthRoute);