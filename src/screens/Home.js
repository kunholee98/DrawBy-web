import { isLoggedInVar, logUserOut } from "../apollo";
import styled from "styled-components";
import { useHistory } from "react-router";
const Title = styled.h1`
  color: bisque;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log Out Now!</button>
    </div>
  );
};
export default Home;
