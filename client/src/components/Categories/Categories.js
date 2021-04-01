import { connect } from 'react-redux';
import { getCategoriesList } from "../../reducers";
import { fetchAllCategoriesAsync } from "../../actions/categoriesActions";
import { useEffect } from 'react';
import CategoriesItem from './CategoriesItem';
import styles from './Categories.module.scss';

const Categories = ({
    fetchAllCategoriesAsync,
    categories,
}) => {
    useEffect(() => {
        if (!categories.length) {
            fetchAllCategoriesAsync();
        }
    }, [fetchAllCategoriesAsync]);

    const onClickRefreshProducts = () => fetchAllCategoriesAsync();

    return (
        <div className={styles.categories}>
            <div>
                <button className={"filter " + styles.filter} onClick={onClickRefreshProducts}>Refresh Categories</button>

                <h1>Categories</h1>
            </div>

            <section>
                {categories
                    .map(category =>
                        <CategoriesItem
                            key={category._id}
                            {...category}
                        />)
                }
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: getCategoriesList(state),
})

const mapDispatchToProps = {
    fetchAllCategoriesAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);