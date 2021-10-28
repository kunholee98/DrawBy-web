import sanitize from "sanitize-html";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../commons";

const CommentContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;
const CommentCaption = styled.div`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }) {
  const cleanedPayload = sanitize(
    payload.replace(/#[0-9a-zA-Z가-힣]+/g, "<mark>$&</mark>"),
    // mark에 onClick 추가 가능!
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <CommentContainer>
      <FatText>{author.username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
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
