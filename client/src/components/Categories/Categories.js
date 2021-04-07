import { connect } from 'react-redux';
import { getCategoriesList } from "../../reducers";
import { fetchAllCategoriesAsync } from "../../actions/categoriesActions";
import { useEffect } from 'react';
import CategoriesItem from './CategoriesItem';
import { getCategoriesIsLoading } from '../../reducers/categoriesReducer';
import { Spinner } from 'react-bootstrap';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';

const Categories = ({
    fetchAllCategoriesAsync,
    categories,
    isLoading,
}) => {
    useEffect(() => {
        fetchAllCategoriesAsync();
    }, [fetchAllCategoriesAsync]);

    return (
        <div className={styles.categories}>
            <h1>
                Categories

                <Link to="/categories/create">+ Add category</Link>
            </h1>

            <section>
                {isLoading
                    ? <Spinner animation="border" variant="primary" />
                    : categories.length
                        ? categories
                            .map(category =>
                                <CategoriesItem
                                    key={category._id}
                                    {...category}
                                />
                            )
                        : 'No categories found!'
                }
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: getCategoriesList(state),
    isLoading: getCategoriesIsLoading(state),
})

const mapDispatchToProps = {
    fetchAllCategoriesAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);