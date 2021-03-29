import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = (props) => (
    <>
        {props.user.isLoggedIn
            ? <Route {...props} />
            : <Redirect to={props.to} />
        }
    </>
)


const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps)(AuthRoute);