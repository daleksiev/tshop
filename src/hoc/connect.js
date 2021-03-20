import GlobalContext from "../store";
import { useContext } from 'react';

const connect = (mapStateToProps) => (Component) => (props) => {
    const state = mapStateToProps(useContext(GlobalContext));

    return <Component {...props} {...state} />
}

export default connect;