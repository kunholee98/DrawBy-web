import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../commons";

const CommentContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;
const CommentCaption = styled.div`
  margin-left: 10px;
`;

function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author.username}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  payload: PropTypes.string,
};

export default Comment;
