import React from "react";

const Stars = ({ score }) => {
  const stars = [1, 2, 3, 4, 5];
  const integerScore = Math.floor(score);
  const decimalScore = score % 1;

  const mdiStar = (item) => {
    if (integerScore === 0) {
      return "mdi mdi-star align-middle";
    } else if (item <= integerScore) {
      return "mdi mdi-star align-middle active-star";
    } else if (decimalScore !== 0 && item === integerScore + 1) {
      return "mdi mdi-star-half-full align-middle active-star";
    } else {
      return "mdi mdi-star align-middle";
    }
  };

  return (
    <React.Fragment>
      <ul className="list-inline text-muted mb-0">
        <li className="list-inline-item review-rating">
          {score == 0 ? "" : <span className="badge bg-warning">{score}</span>}
          {stars.map((star, key) => (
            <i key={key} className={mdiStar(star)}></i>
          ))}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Stars;
