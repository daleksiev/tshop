import Input from '../../../Shared/Input';

const ProductsAsidePrice = ({
    onChangeSort,
    sortBy,
}) => (
    <article>
        <Input
            onChange={onChangeSort}
            id="none"
            name="price"
            title="None"
            value={''}
            type="radio"
            checked={sortBy.price === ''}
        />

        <Input
            onChange={onChangeSort}
            id="min"
            name="price"
            title="Ascending"
            value={'asc'}
            type="radio"
            checked={sortBy.price === 'asc'}
        />

        <Input
            onChange={onChangeSort}
            id="max"
            name="price"
            title="Descending"
            value={'desc'}
            type="radio"
            checked={sortBy.price === 'desc'}
        />
    </article>
)

export default ProductsAsidePrice;