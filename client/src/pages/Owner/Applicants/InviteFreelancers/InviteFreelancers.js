import React from "react";
import { Col, Row } from "reactstrap";
import CandidateDetails from "./CandidateDetails";
import Filters from "./Filters";
//Import images
import userImage1 from "../../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../../assets/images/user/img-08.jpg";

const InviteFreelancers = () => {
  const candidateDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateDesignation: "Project Manager",
      location: "Oakridge Lane Richardson",
      salary: "650 / hours",
      rating: 4.8,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,

      badges: [
        {
          id: 1,
          badgeName: "Leader",
        },
        {
          id: 2,
          badgeName: "Manager",
        },
        {
          id: 2,
          badgeName: "Developer",
        },
      ],
    },
    {
      id: 2,
      userImg: userImage2,
      candidateName: "Gabriel Palmer",
      candidateDesignation: "HTML Developer",
      location: "Oakridge Lane California",
      salary: "250 / hours",
      rating: 3.4,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-warning ms-1",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeName: "Design",
        },
        {
          id: 2,
          badgeName: "Developer",
        },
      ],
    },
    {
      id: 3,
      userImg: userImage3,
      candidateName: "Rebecca Swartz ",
      candidateDesignation: "Graphic Designer",
      location: "Oakridge Lane Richardson",
      salary: "380 / hours",
      rating: 4.3,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Design",
        },
        {
          id: 2,
          badgeName: "Developer",
        },
      ],
    },
    {
      id: 4,
      userImg: userImage4,
      candidateName: "Betty Richards",
      candidateDesignation: "Education Training",
      location: "Oakridge Lane Richardson",
      salary: "650 / hours",
      rating: 4.5,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
        },
      ],
    },
    {
      id: 5,
      userImg: userImage5,
      candidateName: "Jeffrey Montgomery",
      candidateDesignation: "Restaurant Team Member",
      location: "Oakridge Lane Richardson",
      salary: "125 / hours",
      rating: 4.9,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
        },
      ],
    },
    {
      id: 6,
      userImg: userImage6,
      candidateName: "Milton Osborn",
      candidateDesignation: "Assistant / Store Keeper",
      location: "Oakridge Lane Richardson",
      salary: "455 / hours",
      rating: 2.5,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-danger ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
        },
      ],
    },
    {
      id: 7,
      userImg: userImage7,
      candidateName: "Harold Jordan",
      candidateDesignation: "Executive, HR Operations",
      location: "Oakridge Lane Richardson",
      salary: "799 / hours",
      rating: 4.9,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
        },
      ],
    },
    {
      id: 8,
      userImg: userImage8,
      candidateName: "MichaeL Drake ",
      candidateDesignation: "Full Stack Engineer",
      location: "Oakridge Lane Richardson",
      salary: "240 / hours",
      rating: 3.9,
      description:
        "Also, for the webhooks for zapier.  Can you just have it send after the contact info is collected?  I think its being sent twice and its throwing it off because the second time its not sending over the email which is messing up zapier.Webhooks is sent twice when submitting and downloading the pdf, I think, should be sent once when submitting, what do you think?",
      ratingClass: "badge bg-warning ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Trainer",
        },
        {
          id: 2,
          badgeName: "Adobe illustrator",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Filters />
          <div className="candidate-list">
            {candidateDetails.map((candidateDetailsNew, key) => (
              <CandidateDetails
                key={key}
                candidateDetailsNew={candidateDetailsNew}
              />
            ))}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InviteFreelancers;
