import './CreatorsCard.css';

const CreatorsCard = ({img, creator}) => {
    return (
        <div className="creator-card">
            <div className="my-flex">
            <div className="creator-img">
                <img src={img} alt="" />
            </div>
            <div className="cr-about">
                <h6>@{creator}</h6>
                <span>
                    <span className="my-icon">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" className="svg-inline--fa fa-ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    </span>
                   <span className="curr">5,486,312</span>  
                </span>
            </div>
            </div>
            <div className="ell-btn">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis" className="svg-inline--fa fa-ellipsis" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"></path></svg>
            </div>
        </div>
    );
};

export default CreatorsCard;