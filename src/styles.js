import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  accent: "#6666CC",
  borderColor: "rgb(205,209,255)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "rgb(100,100,170)",
  accent: "#6666CC",
  borderColor: "white",
};

export const GlobalStyles = createGlobalStyle`
      ${reset}
      input {
        all:unset;
      }
      * {
        box-sizing:border-box;
      }
      body {
          background-color: ${(props) => props.theme.bgColor};
          font-size:14px;
          font-family:'Open Sans', sans-serif;
          color: ${(props) => props.theme.fontColor}
      }
      a {
        text-decoration: none;
        color: inherit;
      }
  `;
