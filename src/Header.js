import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faPalette,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "./apollo";
import routes from "./routes";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import useUser from "./hooks/useUser";
import Avatar from "./components/Avatar";
import { DrawBy, FatText } from "./components/commons";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const history = useHistory();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <DrawBy />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.home} onClick={() => logUserOut(history)}>
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
