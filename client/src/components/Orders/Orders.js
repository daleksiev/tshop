import { fetchAllOrdersAsync } from '../../actions/ordersActions'
import { Link } from 'react-router-dom'
import moment from 'moment'
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

    let total = orders.reduce((a, b) => ({ price: a.price + b.price }), { price: 0 });
    total = total.price;

    return (
        <section className="orders-container">
            <h2>Orders</h2>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order Id:</th>
                            <th>Order Date:</th>
                            <th>Price:</th>
                            <th>Products:</th>
                        </tr>
                    </thead>
                    {orders.length
                        ? orders.map((order, i) => (
                            <tbody key={order._id}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{order._id}</td>
                                    <td>{moment(order.date).format("DD.MM.YYYY H:m:s")}</td>
                                    <td>${order.price}</td>
                                    <td>
                                        <div>
                                            {order.products.map(product => (
                                                <section key={product._id}>
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
                        : <tbody><tr><td colSpan={20}>No orders found!</td></tr></tbody>
                    }
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Total orders: {orders.length}</td>
                            <td colSpan={2}>Total price: ${total}</td>
                        </tr>
                    </tfoot>
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