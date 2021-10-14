import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import { useState } from "react";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";

const DrawBy = styled.h2`
  color: purple;
  font-size: 25px;
  font-family: -cursive;
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  return (
    <AuthLayout>
      <PageTitle title="Log In" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Log in" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
