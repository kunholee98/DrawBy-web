import { gql } from "@apollo/client";

export const PICTURE_FRAGMENT = gql`
  fragment PictureFragment on Picture {
    id
    file
    totalLike
    totalComment
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    author {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
