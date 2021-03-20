import GlobalContext from "../store";
import { useContext } from 'react';

const connect = (mapStateToProps, mapDispatchToProps) => (Component) => (props) => {
    const context = useContext(GlobalContext);
    let newContext = {};
    // let dispatch = {};

    for (const key in context) {
        if (Object.hasOwnProperty.call(context, key)) {
            newContext[key] = { ...context[key][0], dispatch: context[key][1] };
        }
    }

    const state = mapStateToProps(newContext);

    return <Component {...props} {...state} />
}

export default connect;