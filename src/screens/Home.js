import { isLoggedInVar, logUserOut } from "../apollo";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PICTURE_FRAGMENT } from "../fragment";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PictureFragment
      author {
        username
        avatar
      }
      whoLikes {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PICTURE_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  const history = useHistory();
  return (
    <div>
      <PageTitle title={"Home"} />
      <button onClick={() => logUserOut(history)}>Log Out Now!</button>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};
export default Home;
