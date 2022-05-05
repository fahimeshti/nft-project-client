import '../allOrders/OrderList.css';
import './NftListAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from "../../../redux/apiCalls";
import { useEffect } from 'react';

const NftListAdmin = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
      }, [dispatch]);

      const handleDelete = (id) => {
        deleteProduct(id, dispatch);
        console.log("Deleted!");
      };
      
    const getText = (lgText) => {
        if (lgText.length <= 10) return lgText;

        if (lgText.length > 10) {
        return (
          <>
            {`${lgText.slice(0, 10)}...`}
          </>
        );
      }
    }

    
    const warningDelete = props => (
        <Tooltip {...props}><span className="danger tool-tip">This action is irreversible</span></Tooltip>
      );
        
    return (
        <div className="order-container">
            <section className="table-box">
            <div className="shadow-sm card border-light">
        <div className="card-header">
            <div className="align-items-center row">
                <div className="col">
                    <h5>All NFTs</h5>
                </div>
                {/* <div className="text-end col"><button type="button" className="btn btn-secondary btn-sm">See all</button></div> */}
            </div>
        </div>
        <div className="table-responsive">
            <table className="my-table align-items-center table-flush table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">NFT</th>
                        <th scope="col">Name</th>
                        <th scope="col">creator</th>
                        <th scope="col">Description</th>
                        <th scope="col">categories</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => 
                    (<tr key={product._id}>
                        <th scope="row">
                            <div className="img-box">
                                <img src={product.img} alt="" />
                            </div>
                        </th>
                        <td>{product.title}</td>
                        <td>@{product.creator}</td>
                        <td>
                        <OverlayTrigger placement="left" overlay={<Tooltip><span className="tool-tip">{product.desc}</span></Tooltip>}>
                            <p>{getText(product.desc)}</p>
                        </OverlayTrigger>
                        </td>
                        <td>
                        <Form.Select size="sm">
                            {product.categories?.map((cat)=> (
                                <option key={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                        </td>
                        <td>{product.price}ETH</td>
                        <td>
                        <Link to={`edit/${product._id}`}>
                            <Button variant="primary">
                                Edit
                            </Button>
                        </Link>
                        </td>
                        <td className="action-row-nft">
                        <OverlayTrigger placement="top" overlay={warningDelete}>
                            <Button onClick={()=> handleDelete(product._id)} variant="danger">Delete</Button>
                        </OverlayTrigger>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>

            </section>
        </div>
    );
};

export default NftListAdmin;