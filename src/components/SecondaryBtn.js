import './SecondaryBtn.css';

const SecondaryBtn = (props) => {
    return (
        <div className="secondaryBtn">
            {props.btnText}
        </div>
    );
};

export default SecondaryBtn;