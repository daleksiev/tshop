import Input from '../../../../components/Shared/Input';

const ProductsAsidePrice = ({
  onChangeSort,
  sortBy,
  name,
}) => (
  <article>
    <Input
      onChange={onChangeSort}
      id={"none-" + name}
      name={name}
      title="None"
      value={''}
      type="radio"
      checked={sortBy[name] === ''}
    />

    <Input
      onChange={onChangeSort}
      id={"min-" + name}
      name={name}
      title="Ascending"
      value={'asc'}
      type="radio"
      checked={sortBy[name] === 'asc'}
    />

    <Input
      onChange={onChangeSort}
      id={"max-" + name}
      name={name}
      title="Descending"
      value={'desc'}
      type="radio"
      checked={sortBy[name] === 'desc'}
    />
  </article>
)

export default ProductsAsidePrice;
