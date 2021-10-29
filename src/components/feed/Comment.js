import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../commons";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

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

function Comment({ id, pictureId, author, payload, isMine }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok, error },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Picture:${pictureId}`,
        fields: {
          totalComment(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${author.username}`}>
        <FatText>{author.username}</FatText>
      </Link>
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
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  pictureId: PropTypes.number,
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  payload: PropTypes.string,
  isMine: PropTypes.bool,
};

export default Comment;
