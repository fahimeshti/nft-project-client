import './NftContainer.css';

const NftContainerCart = (props) => {
    return (
        <div className="main-nft-container">
            <div className="nft-image">
                <img src={props.image} alt="" />
            </div>
            <div className="nft-details">
                <div className="details-left cart">
                    <div>
                        <h6>{props.title}</h6>
                        <span className="creator">@{props.creator}</span>
                    </div>
                    <span className="currency">{props.price}ETH</span>
                </div>
            </div>
            <div className="main-nft-btn">
                <button onClick={()=> props.remove(props.data)}>Remove</button>
            </div>
        </div>
    );
};

export default NftContainerCart;