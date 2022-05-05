import './NftSingleItem.css';
import ethIcon from "../../resources/ethIcon.svg";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faEllipsisV, faExternalLinkAlt, faHeart, faRedo, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../../redux/cartRedux';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';
import SubjectIcon from '@mui/icons-material/Subject';

const NftSingleItem = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
      const defaultText = "'Lorem ipsum dolor sit amet consectetur adipisicing elit.'"
    const id = location.pathname.split("/")[2]
    const [showMore, setShowMore] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState(null);
    const [shortText, setShortText] = useState(defaultText);
    const [randomLikes, setRandomLikes] = useState(0);
    const [prodTooLong, setProdTooLong] = useState(null);
    

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
      const getProducts = async () => {
          try {
            const res = await publicRequest.get("/products/find/" + id);
            setProducts(res.data)
          } catch (err) {}
      }
          getProducts()
          return () => {
            setProducts([]);
          };
    }, [id])

    useEffect(()=> {
      const prodTooLongg = products?.desc?.length > 150
      setProdTooLong(prodTooLongg)
    },[products])

    useEffect(()=>{
      const getText = async () => {
        if (products?.desc.length <= 150) {
          setShortText(products.desc)
        } else if (products?.desc.length > 150 && showMore) {
          setShortText(products.desc)
        } else if (products?.desc.length > 150) {
          const newText = products.desc.slice(0, 150);
          setShortText(newText)
        }

      };
      getText()
      return () => {
        setShortText(defaultText);
      };
    },[products, showMore])

    const popupToggleHandler = () => {
      setShowPopup(prevCheck => !prevCheck);
    }

    const refreshHover = props => (
      <Tooltip {...props}><span className="tool-tip">Refresh metadata</span></Tooltip>
    );
    const externalHover = props => (
      <Tooltip {...props}><span className="tool-tip">Go to site</span></Tooltip>
    );
    const shareHover = props => (
      <Tooltip {...props}><span className="tool-tip">Share</span></Tooltip>
    );
    
    const handleClick = () => {
      dispatch(addProduct({ products }))
    }

      useEffect(()=> {
        const randomLike = Math.round(Math.random() * 1000)
        setRandomLikes(randomLike)
      },[])

  return (
      <>
      <NavigationBar />
      <section className="main-container">
        <Row className="info-item-container">
        <div className="info-item-btn-group">
          <OverlayTrigger placement="top" overlay={refreshHover}>
            <div className="info-item-box-sm">
                <span>
                <FontAwesomeIcon className="see-more-icon" icon={faRedo} />
                </span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={externalHover}>
            <div className="info-item-box-sm">
                <span>
                <FontAwesomeIcon className="see-more-icon" icon={faExternalLinkAlt} />
                </span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={shareHover}>
            <div className="info-item-box-sm">
                <span>
                <FontAwesomeIcon className="see-more-icon" icon={faShareAlt} />
                </span>
            </div>
          </OverlayTrigger>
            { showPopup && (
            <span className="report-box my_smol_card shadow-sm">
              <button>Report</button>
            </span>)}
            <div className="info-item-box-sm" onClick={popupToggleHandler}>
              <span>
                <FontAwesomeIcon className="see-more-icon" icon={faEllipsisV} />
              </span>
            </div>
        </div>
                
        </Row>
      <Row>
        <Col md={3}>
          <div className="left-container">
            <div className="my_smol_card shadow-lg">
              <div className="top-info">
                <span className="tech-block">
                  <img className="eth-image" src={ethIcon} alt="Eth Icon" />
                </span>
                <span className="my_icon">
                <FontAwesomeIcon className="my__icon" icon={faHeart} />
                <span> {randomLikes}</span>
                </span>
              </div>
              <div className="image">
                <img src={products?.img} alt="" />
              </div>
            </div>
            <div className="my_card">
              <div className="my-card-header">
                <span>
                  <SubjectIcon />
                </span>
                <span className="artist-desc">Artist Description</span>
              </div>
               <div className="my-card-body make-numb">
               <span className="cb">Created by </span>
               <span className="author">{products?.creator}</span>
               <br />
               <br />
               A human being, artist inspired by the Universe.
                </div>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="right-container">
            <h1>{products?.title}</h1>
            <div className="item-credit">
            Owned by <span className="author">&nbsp;{products?.creator}</span>
            </div>
            <div className="trade-main">
                <span className="ash-color">Current price</span>
                <div className="trade-price-detail">
                  <span>
                  <img className="eth-image" src={ethIcon} alt="Eth Icon" />
                  </span>
                  <span>{products?.price}</span>
                  <span>(${((products?.price) * 3020.40).toFixed(2)})</span>
                </div>
                <div className="big-btns">
                {user ? 
                <button className="add-to-wallet" onClick={handleClick}>Add to wallet</button> : 
                <Link to="/login">
                  <button className="add-to-wallet">Sign in to collect</button>
                </Link>
                }
                </div>
            </div>
            
            <div className="my_my_smol_card long">
              <div className="my-card-header">
              Description
              </div>
              <div className="my-card-body long">
                <div className="description">
                  <p className={showMore ? 'text-expand' : ''}>{shortText}</p>
                  { prodTooLong && (<button 
                    className="see-more-btn"
                    onClick={() => setShowMore(prevCheck => !prevCheck)}>
                    <FontAwesomeIcon className="see-more-icon" icon={ showMore ? faChevronUp : faChevronDown } />
                  </button>)}
                </div>
              </div>
            </div>

          </div>
        </Col>
      </Row>
      </section>
      <div style={{height:"80px"}}></div>
      <Footer />
     </>
    );
};

export default NftSingleItem;