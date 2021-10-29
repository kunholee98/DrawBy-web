import { useParams } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PICTURE_FRAGMENT } from "../fragment";
import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { FatText } from "../components/commons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/auth/Button";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

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

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  border-top: 1px solid rgb(219, 219, 219);
  padding-top: 15px;
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Picture = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

function Profile() {
  const { username } = useParams();
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    refetchQueries: [
      { query: SEE_PROFILE_QUERY, variables: { username } },
      {
        query: SEE_PROFILE_QUERY,
        variables: { username: userData?.me?.username },
      },
    ],
  });
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    refetchQueries: [
      { query: SEE_PROFILE_QUERY, variables: { username } },
      {
        query: SEE_PROFILE_QUERY,
        variables: { username: userData?.me?.username },
      },
    ],
  });
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn onClick={unfollowUser}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
    }
  };
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile'`
        }
      />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowings}</Value> followings
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>{data?.seeProfile?.username}</Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.pictures?.map((picture) => (
          <Picture key={picture.id} bg={picture.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {picture.totalLike}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {picture.totalComment}
              </Icon>
            </Icons>
          </Picture>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
