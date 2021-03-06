import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import React from "react";
import { useForm } from "react-hook-form";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { DrawBy } from "../components/commons";

const BoxContainer = styled.div`
  display: flex;
  width: 800px;
  justify-content: center;
`;
const LeftBox = styled.div`
  width: 100%;
  max-width: 415px;
  min-width: 415px;
`;
const RightBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
  margin-bottom: 10px;
`;

const InstagramLogin = styled.div`
  color: #dd2a7b;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
  margin-top: 4px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };
  const lg = true;
  return (
    <AuthLayout>
      <PageTitle title="Log In" />
      <BoxContainer>
        <LeftBox>
          <FormBox>
            <div>
              <FontAwesomeIcon icon={faPalette} size="3x" color="#6e62c3" />
            </div>
            <Notification>{location?.state?.message}</Notification>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 5,
                    message: "Username should be longer than 5 chars",
                  },
                })}
                onFocus={clearLoginError}
                type="text"
                placeholder="Username"
                hasError={Boolean(errors?.username?.message)}
              />
              <FormError message={errors?.username?.message} />
              <Input
                {...register("password", { required: "Password is required" })}
                onFocus={clearLoginError}
                type="password"
                placeholder="Password"
                hasError={Boolean(errors?.password?.message)}
              />
              <FormError message={errors?.password?.message} />
              <Button
                type="submit"
                value={loading ? "Loading..." : "Log in"}
                disabled={!isValid || loading}
              />
              <FormError message={errors?.result?.message} />
            </form>
            <Separator />
            <a href={"http://facebook.com"}>
              <FacebookLogin>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <span>Log in with Facebook</span>
              </FacebookLogin>
            </a>
            <a href={"http://instagram.com"}>
              <InstagramLogin>
                <FontAwesomeIcon icon={faInstagram} />
                <span>Log in with Instagram</span>
              </InstagramLogin>
            </a>
          </FormBox>
          <BottomBox
            cta="Don't have an account?"
            linkText="Sign up"
            link={routes.signUp}
          />
        </LeftBox>
        <RightBox>
          <DrawBy lg />
        </RightBox>
      </BoxContainer>
    </AuthLayout>
  );
}
export default Login;
