import './Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import NftContainer from '../../components/NftContainer';
import { useEffect, useState } from 'react';
import axios from "axios";

const Products = () => {
    const [filters, setFilters] = useState('all categories');
    const [products, setProducts] = useState([]);
    const [isProductEmpty, setIsProductEmpty] = useState(false);


    const handleFilters = (e) => {
        const value = e.target.value.toLowerCase();
            setFilters(value);
      };

      useEffect(() => {
        const getProducts = async () => {
            try {
              const res = await axios.get(
                  filters === 'all categories' 
              ? "https://nft-api-esti.onrender.com/api/products" 
              : `https://nft-api-esti.onrender.com/api/products?category=${filters}`) 
              setProducts(res.data);
            } catch (err) {}
        }
            getProducts()
    }, [filters])

    useEffect(()=> {
        if (products.length === 0) {
            setIsProductEmpty(true)
        } else {
            setIsProductEmpty(false)
        }
    },[products])

    return (
        <section>
            <div className="my-select-box">
                    <h2>Trending in </h2>
                        <Form.Select 
                            name="filter" 
                            onChange={handleFilters} 
                            className="my-select" 
                            aria-label="Default select example"
                        >
                            <option value='all categories'>all categories▼</option>
                            <option>Art</option>
                            <option>Collectibles</option>
                            <option>Domain Names</option>
                            <option>Music</option>
                            <option>Photography</option>
                            <option>Sports</option>
                            <option>Trading Cards</option>
                        </Form.Select>
                </div>
            <div className="nft-market">
                { products && products.map(product => (
                    <NftContainer 
                    key={product._id} 
                    prodId={product._id}
                    image={product.img}
                    title={product.title}
                    creator={product.creator}
                    price={product.price}
                     />
                ))
                }
               { isProductEmpty && <span className="empty-tag">No NFT Found.</span>}
            </div>
        </section>
    );
};

export default Products;