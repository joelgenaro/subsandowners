import React from "react";

const Star = ({ selected, onClick }) => {
  return (
    <React.Fragment>
      <>
        {selected ? (
          <i
            onClick={onClick}
            className="mdi mdi-star align-middle active-star"
          ></i>
        ) : (
          <i onClick={onClick} className="mdi mdi-star align-middle"></i>
        )}
      </>
    </React.Fragment>
  );
};

export default Star;
