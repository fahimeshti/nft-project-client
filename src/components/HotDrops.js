import './HotDrops.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ethColored from '../resources/ethColored.svg';


const HotDrops = (props) => {
    

    const popover = (
        <Popover id="popover-basic">
          <Popover.Body bsPrefix="my-popover-body">
            <strong>ETH</strong>
          </Popover.Body>
        </Popover>
      );

    return (
        <div className="main-nft-container-2">
            <div className="nft-image-2">
                <img src={props.image} alt="" />
            </div>
            <div className="nft-details-2">
                <span className="cr-image-small">
                    <span className="inner-cont">
                        <img src={props.creatorImg} alt="" />
                    </span>
                </span>
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
        </div>
    );
};

export default HotDrops;