import Input from '../../Shared/Input';
import './ProductsAside.scss';

const ProductsAside = () => (
    <aside className="aside-wrapper">
        <h4>Filter by:</h4>

        <Input
            id="neshto si"
            name="filterBy"
            title="neshto si"
            type="radio"
        />

        <Input
            id="neshto si2"
            name="filterBy"
            title="neshto si2"
            type="radio"
        />

        {/* <h4>Sort by:</h4> */}
    </aside>
)

export default ProductsAside;