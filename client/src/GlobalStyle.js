import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  a{
    text-decoration: none;
    color: inherit;
  }
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0
  }
  button{
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }
  body{
    font-family: "Apple SD Gothic Neo", Arial, sans-serif;
    font-size: 14px;
  }
  #root{
    height: 100vh;
  }

`;

export default GlobalStyle;
