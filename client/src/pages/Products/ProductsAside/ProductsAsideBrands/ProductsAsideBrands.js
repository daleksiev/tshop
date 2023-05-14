import Input from '../../../../components/Shared/Input';

const ProductsAsideBrands = ({
  brands,
  onChangeFilter,
  filterBy,
}) => (
  <article>
    <Input
      onChange={onChangeFilter}
      id="all"
      name="brand"
      title="All brands"
      value=""
      type="radio"
      checked={filterBy.brand === ""}
    />

    {brands.map(brand => (
      <Input
        onChange={onChangeFilter}
        key={brand._id}
        id={brand.name}
        name="brand"
        title={brand.name}
        value={brand._id}
        type="radio"
      />
    ))}
  </article>
)

export default ProductsAsideBrands;
