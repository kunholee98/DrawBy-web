import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 12px;
`;

function Comments({ author, caption, totalComment, comments }) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {totalComment === 1 ? "1 comment" : `${totalComment} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  totalComment: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      payload: PropTypes.string.isRequired,
      author: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
