import React from 'react';
import { Input } from "reactstrap";

const JobSearch = ({title}) => {
    return (
        <React.Fragment>
            <Input type="search" id="job-title" className="form-control filter-input-box" placeholder={title} />
        </React.Fragment>
    )
}

export default JobSearch;
