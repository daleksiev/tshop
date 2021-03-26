import data from './data';
import ProductsItem from './ProductsItem';
import styles from './Products.module.scss';

const Products = () => (
    <section className={styles['products-wrapper']}>
        {data.map(product =>
            <ProductsItem {...product} />
        )}
    </section>
)

export default Products;