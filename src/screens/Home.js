import { isLoggedInVar, logUserOut } from "../apollo";
import styled from "styled-components";
const Title = styled.h1`
  color: bisque;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>Log Out Now!</button>
    </div>
  );
};
export default Home;
