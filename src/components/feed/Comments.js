import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($pictureId: Int!, $payload: String!) {
    createComment(pictureId: $pictureId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostComment = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({ pictureId, author, caption, totalComment, comments }) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, error, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        payload,
        author: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment comment on Comment {
            id
            createdAt
            isMine
            payload
            author {
              username
              avatar
            }
          }
        `,
      });
      console.log(newCacheComment);
      cache.modify({
        id: `Picture:${pictureId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          totalComment(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onVaild = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        pictureId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {totalComment === 1 ? "1 comment" : `${totalComment} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          pictureId={pictureId}
          author={comment.author}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onVaild)}>
          <PostComment
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  pictureId: PropTypes.number.isRequired,
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
