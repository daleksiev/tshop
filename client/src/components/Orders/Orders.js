import { fetchAllOrdersAsync } from '../../actions/ordersActions'
import { Link } from 'react-router-dom'
import {
    getOrdersList,
    getUser,
} from '../../reducers';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './Orders.scss';

const Orders = ({
    orders,
    user,
    fetchAllOrdersAsync,
}) => {
    useEffect(() => {
        fetchAllOrdersAsync(user.accessToken);
    }, [fetchAllOrdersAsync, user]);
    return (
        <section className="orders-container">
            <h2>Orders</h2>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id:</th>
                            <th>Order Date:</th>
                            <th>Price:</th>
                            <th>Products:</th>
                        </tr>
                    </thead>
                    {orders.length
                        ? orders.map(order => (
                            <tbody>
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.date}</td>
                                    <td>${order.price}</td>
                                    <td>
                                        <div>
                                            {order.products.map(product => (
                                                <section>
                                                    {product.count} x ${product.price}

                                                    <Link to={`products/${product._id}`}>
                                                        <img src={product.imageUrl} alt="" />
                                                        <p>{product.title}</p>
                                                    </Link>
                                                </section>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                        : <tr><td colSpan={20}>No orders found!</td></tr>
                    }
                </table>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    orders: getOrdersList(state),
    user: getUser(state),
})

const mapDispatchToProps = {
    fetchAllOrdersAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);