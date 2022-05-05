import './Success.css';

const Success = () => {


    return (
        <div className="success-container">
            <div className="order-box">
                <div className="order-box-header">
                    <h1>Thank you for ordering</h1>
                </div>
                <p>You have successfully ordered the following:</p>
                <div className="all-orders">
                    <span>No items Found!</span>
                </div>
            </div>
        </div>
    );
};

export default Success;