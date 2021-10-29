import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;
export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: bold;
`;

const DrawByTitle = styled(FatText)`
  font-size: ${(props) => (props.large ? "50px" : "20px")};
  color: #6e62c3;
`;
export const DrawBy = ({ lg }) => {
  return (
    <Link to={routes.home}>
      <DrawByTitle large={lg}>𝑫𝒓𝒂𝒘𝑩𝒚</DrawByTitle>
    </Link>
  );
};

DrawBy.propTypes = {
  large: PropTypes.bool,
};
