import Input from '../../../../components/Shared/Input';
import Button from '../../../../components/Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

const BrandsEditForm = ({
  onChangeInput,
  isLoading,
  onSubmit,
  onImageUpload,
  brand,
  state,
}) => {
  const [didLoaded, setDidLoad] = useState(false);

  return (
    <form method="post">
      <h1>Update Brand</h1>

      <Spinner style={!didLoaded ? {} : { 'display': 'none' }} animation="border" variant="primary" />

      <img
        alt={brand.name}
        style={didLoaded ? {} : { 'display': 'none' }}
        src={brand.imageUrl}
        onLoad={e => setDidLoad(true)}
        onError={e => setDidLoad(false)}
      />

      <Input
        id="name"
        type="text"
        name="name"
        title="Name:"
        value={state.name}
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
        : <Button name="Update" onClick={onSubmit} />}

    </form>
  )
}

export default BrandsEditForm;
