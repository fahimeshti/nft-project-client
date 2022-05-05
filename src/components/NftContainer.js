import './NftContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ethColored from '../resources/ethColored.svg';
import { Link } from 'react-router-dom';

const NftContainer = (props) => {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Body bsPrefix="my-popover-body">
            <strong>ETH</strong>
          </Popover.Body>
        </Popover>
      );
      
    return (
        <div className="main-nft-container">
                <div className="nft-image">
                    <img src={props.image} alt="" />
                </div>
            <div className="nft-details">
                <div className="details-left">
                    <h6>{props.title}</h6>
                    <span className="creator">@{props.creator}</span>
                    <span className="currency">{props.price}ETH</span>
                </div>
                <div className="details-right">
                <OverlayTrigger 
                    rootClose="true" 
                    trigger="click" 
                    placement="top" 
                    overlay={popover}
                >
                    <span>
                        <img src={ethColored} alt="" />
                    </span>
                </OverlayTrigger>
                </div>
            </div>
            <div className="main-nft-btn dis-none">
                <Link to={`nft/${props.prodId}`}>
                    <button>Collect Now</button>
                </Link>
            </div>
        </div>
    );
};

export default NftContainer;