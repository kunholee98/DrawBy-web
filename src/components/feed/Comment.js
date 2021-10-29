import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../commons";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

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
  align-items: center;
  justify-content: space-between;
`;

const CommentUser = styled.div`
  display: flex;
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

const DeleteBtn = styled.div``;

function Comment({ id, pictureId, author, payload, isMine }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
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
      <CommentUser>
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
      </CommentUser>
      {isMine ? (
        <DeleteBtn onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </DeleteBtn>
      ) : null}
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
