import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import Chart from '../../components/chart/Chart';
import { userRequest } from "../../../requestMethods";
import { useEffect, useMemo, useState } from 'react';
import {format} from "timeago.js"
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
    
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  

    return (
        <section className="dashboard-body">
            <div className="dashboard-container">
                    <Chart
                        data={userStats}
                        title="User Analytics"
                        grid
                        dataKey="Active User"
                    />
            <Container>
                <Row className="dashboard-bottom">
                    <Col md={4} className="main-bg-wh user-stat">
                        <h2>New Joined members</h2>
                        {users?.map((user) => (
                          <div key={user._id} className="user-single">
                            <span>
                              <img src={ user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" } alt="" />
                            </span>
                            <span>@{user.username}</span>
                            <span>{user.isAdmin? 'Admin' : 'member'}</span>
                          </div>
                        ))}
                        

                        
                    </Col>
                    <Col md={7} className="main-bg-wh user-transc">
                    <div className="t-heaader-box">
                      <h2>Latest Transections</h2>
                      <Link to="/dashboard/all-orders">
                      <button type="button" className="btn btn-secondary btn-sm">See all</button>
                      </Link>
                    </div>
                    <div className="transection-box">
                        <div className="transection-row header">
                            <span>Customer</span>
                            <span>Date</span>
                            <span>Amount</span>
                            <span>Status</span>
                        </div>
                    {orders?.map((order) => (
                      <div key={order._id} className="transection-row">
                        <span>{order.userId}</span>
                        <span className="date">{format(order.createdAt)}</span>
                        <span>${order.amount}</span>
                        <span className={`status ${order.status}`}>{order.status}</span>
                      </div>
                    ))}
                    </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </section>
    );
};

export default DashBoard;