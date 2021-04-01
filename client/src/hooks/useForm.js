import { useState } from "react";

const useForm = (value) => {
    const [state, setState] = useState(value);

    const onChangeInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

    return [
        state,
        onChangeInput,
        setState,
    ]
}

export default useForm;