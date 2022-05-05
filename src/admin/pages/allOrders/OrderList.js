import './OrderList.css';
import approveImg from '../../resources/done.svg';
import pendingImg from '../../resources/clock.svg';
import cancelImg  from '../../resources/cross.svg';
import { Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { userRequest } from "../../../requestMethods";
import { useEffect, useState } from 'react';
import {format} from "timeago.js"

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const getOrders = async () => {
          try {
            const res = await userRequest.get("orders");
            setOrders(res.data);
          } catch {}
        };
        getOrders();
        return () => {
            setOrders([]);
          };
      }, []);




    const approveTip = props => (
        <Tooltip {...props}><span className="tool-tip">Approve</span></Tooltip>
      );
    const pendingTip = props => (
        <Tooltip {...props}><span className="tool-tip">Pending</span></Tooltip>
      );
    const cancelTip = props => (
        <Tooltip {...props}><span className="tool-tip">Cancel</span></Tooltip>
      );


     
      return (
        <div className="order-container">
            <section className="table-box">
            <div className="shadow-sm card border-light">
        <div className="card-header">
            <div className="align-items-center row">
                <div className="col">
                    <h5>All Orders</h5>
                </div>
            </div>
        </div>
        <div className="table-responsive">
            <table className="my-table align-items-center table-flush table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                        <th scope="col">address</th>
                        <th scope="col">Date Ordered</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {orders?.map((order) => (
                    <tr key={order._id}>
                        <th scope="row">{order?.userId}</th>
                        <td>
                        <Form.Select size="sm">
                            {order?.products.map((prod)=> (
                                <option key={prod.productId}>{prod.productId}</option>
                            ))}
                        </Form.Select>
                        </td>
                        <td className="quantity-row">
                            {  
                                order.products.reduce((a,b)=> a.quantity + b.quantity)
                            }
                        </td>
                        <td>${order.amount}</td>
                        <td>{order.address}</td>
                        <td>{format(order.createdAt)}</td>
                        <td className="status-row">{order.status}</td>
                        <td className="action-row">
                        <OverlayTrigger placement="top" overlay={approveTip}>
                            <button>
                                <img src={approveImg} alt="" />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={pendingTip}>
                            <button>
                                <img src={pendingImg} alt="" />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={cancelTip}>
                            <button>
                                <img src={cancelImg} alt="" />
                            </button>
                        </OverlayTrigger>
                        </td>
                    </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>

            </section>
        </div>
    );
};

export default OrderList;