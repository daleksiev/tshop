import Input from '../../../Shared/Input';
import Button from '../../../Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

const CategoriesEditForm = ({
    onImageUpload,
    onSubmit,
    onChangeInput,
    isLoading,
    state,
    category,
}) => {
    const [didLoaded, setDidLoad] = useState(false);

    return (
        <form method="post">
            <h1>Update Category</h1>

            <Spinner style={!didLoaded ? {} : { 'display': 'none' }} animation="border" variant="primary" />

            <img
                alt={category.name}
                style={didLoaded ? {} : { 'display': 'none' }}
                src={category.imageUrl}
                onLoad={e => setDidLoad(true)}
                onError={e => setDidLoad(false)}
            />

            <Input
                id="name"
                type="text"
                name="name"
                title="Name:"
                value={state?.name}
                onChange={onChangeInput}
            />

            <Input
                id="image"
                type="file"
                name="image"
                fileName={state?.image?.name}
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
                : <Button name="Update" onClick={onSubmit} />}

        </form>
    )
}

export default CategoriesEditForm;