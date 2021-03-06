import { connect } from 'react-redux';
import { getCategoriesList } from "../../reducers";
import { fetchAllCategoriesAsync } from "../../actions/categoriesActions";
import { useEffect } from 'react';
import CategoriesItem from './CategoriesItem';
import { getCategoriesIsLoading, getUser } from '../../reducers';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.scss';

const Categories = ({
    fetchAllCategoriesAsync,
    categories,
    isLoading,
    user,
}) => {
    useEffect(() => {
        fetchAllCategoriesAsync();
    }, [fetchAllCategoriesAsync]);

    return (
        <div className='categories'>
            <h1>
                Categories
                {user?.role === 'admin' &&
                    <Link to="/categories/create">+ Add category</Link>
                }
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
    user: getUser(state),
})

const mapDispatchToProps = {
    fetchAllCategoriesAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);