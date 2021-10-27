import { isLoggedInVar, logUserOut } from "../apollo";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      author {
        username
        avatar
      }
      file
      whoLikes {
        id
        username
        avatar
      }
      caption
      totalLike
      comments {
        id
        author {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      totalComment
      createdAt
      isMine
      isLiked
    }
  }
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
