import './BrandsItem.scss';

const BrandsItem = ({
    brand,
}) => (
    <article className='brands-item-container'>
        <img src={brand.imageUrl} alt={brand.name} />
        <p>{brand.name}</p>
    </article>
)

export default BrandsItem;