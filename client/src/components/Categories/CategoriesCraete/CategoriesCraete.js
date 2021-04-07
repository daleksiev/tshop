import useForm from '../../../hooks/useForm';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';

const CategoriesCraete = () => {
    const [state, onChangeInput, setState] = useForm({
        name: '',
        image: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const onImageUpload = (e) => setState({ ...state, image: e.target.files[0] });

    const onClickButton = (e) => {
        e.preventDefault();
        setIsLoading(true);
    }

    return (
        <form method="post">
            <h1>Create Category</h1>

            <Input
                id="name"
                type="text"
                name="name"
                title="Name:"
                onChange={onChangeInput}
            />

            <Input
                id="image"
                type="file"
                name="image"
                fileName={state.image.name}
                title="Upload an image:"
                onChange={onImageUpload}
            />

            {isLoading
                ? (
                    <Button name="Loading...">
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
                )
                : <Button name="Create" onClick={onClickButton} />}

        </form>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCraete);