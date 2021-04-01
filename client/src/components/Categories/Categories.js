import styles from './Categories.module.scss';
import { connect } from 'react-redux';
import { getCategoriesList } from "../../reducers";
import { fetchAllCategoriesAsync } from "../../actions/categoriesActions";
import { useEffect } from 'react';

const Categories = ({
    fetchAllCategoriesAsync,
    categories,
}) => {
    useEffect(() => {
        fetchAllCategoriesAsync();
    }, [fetchAllCategoriesAsync]);

    return (
        <div className={styles.categories}>
            <h1>Categories</h1>

            {categories.map(category => (
                <div>
                    <h2>{category.name}</h2>
                    <img src={category.imageUrl} alt="" />
                </div>
            ))}
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