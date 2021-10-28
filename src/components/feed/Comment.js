import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../commons";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
  display: flex;
  margin-bottom: 7px;
`;
const CommentCaption = styled.div`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author.username}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[0-9a-zA-Z가-힣]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link key={index} to={`/hashtags/${word}`}>
                {word}
              </Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
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
