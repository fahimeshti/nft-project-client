import './PrimaryBtn.css';

const PrimaryBtn = (props) => {
    return (
        <div className="primarybtn">
            {props.btnText}
        </div>
    );
};

export default PrimaryBtn;