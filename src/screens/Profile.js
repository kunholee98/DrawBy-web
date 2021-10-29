import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { PICTURE_FRAGMENT } from "../fragment";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      bio
      avatar
      pictures {
        ...PictureFragment
      }
      totalFollowings
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PICTURE_FRAGMENT}
`;

function Profile() {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, { variables: { username } });
  console.log(data);
  return <h1>{username}</h1>;
}

export default Profile;
