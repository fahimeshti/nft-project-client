import '../newNft/NewNft.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditNft = () => {
    const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

    return (
    <section className="add-new-box">
        <div className="shadow-sm card border-light">
            <div className="card-header admin-title">Edit NFT</div>
            <div className="p-4 align-items-center col">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Creator Name</Form.Label>
                    <Form.Control type="text" placeholder={product.creator} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>NFT Name</Form.Label>
                    <Form.Control type="text" placeholder={product.title} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Category</Form.Label>
                    <Form.Control placeholder="Seperate by comma" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Price(ETH)</Form.Label>
                    <Form.Control type="text" placeholder={product.price} />
                    </Form.Group>
                </Row>
                    <Form.Control 
                    as="textarea" 
                    placeholder={product.desc} 
                    style={{ height: '100px' }} />

                <div className="m-3 imgUpload">
                    <div className="img-container">
                        <div md={5} className="imgSrc">
                            <img src={product.img} alt="" />
                        </div>
                        <div md={7} className="imgInput">
                            <input type="file" name="file" />
                        </div>
                    </div>
                    <div className="img-container">
                        <div md={5} className="imgSrc user">
                            <img src={product.creatorImg} alt="" />
                        </div>
                        <div md={7} className="imgInput">
                            <input type="file" name="file" />
                        </div>
                    </div>
                </div>

                <Button variant="primary" type="submit">
                    Update
                </Button>
                </Form>
            </div>
        </div>
    </section>
    );
};

export default EditNft;