import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../commons";
import Comments from "./Comments";

const TOGGLE_LIKE_2_PICTURE_MUTATION = gql`
  mutation toggleLike2Picture($id: Int!) {
    toggleLike2Picture(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

function Photo({
  id,
  author,
  file,
  isLiked,
  totalLike,
  caption,
  comments,
  totalComment,
}) {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike2Picture: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Picture:${id}`;
      const fragment = gql`
        fragment toggleLike on Picture {
          isLiked
          totalLike
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("isLiked" in result && "totalLike" in result) {
        const { isLiked: cacheIsLiked, totalLike: cacheTotalLike } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked,
            totalLike: cacheIsLiked ? cacheTotalLike - 1 : cacheTotalLike + 1,
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_2_PICTURE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={author.avatar} lg />
        <Username> {author.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{totalLike === 1 ? "1 like" : `${totalLike} likes`}</Likes>
        <Comments
          author={author}
          caption={caption}
          totalComment={totalComment}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  caption: PropTypes.string,

  totalComment: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  totalLike: PropTypes.number.isRequired,
};

export default Photo;
