import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingButton = ({ isLoading, title }) => {

    return (
        <React.Fragment>
            <button type="submit" disabled={isLoading} className="btn btn-primary">
                {isLoading ? <ClipLoader aria-label={title} size={20} color={'#fff'} /> : title}
            </button>
        </React.Fragment>
    );
};

export default LoadingButton;
