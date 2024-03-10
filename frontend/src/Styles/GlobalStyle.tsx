import { createGlobalStyle } from 'styled-components';
import AppleTea from '/Assets/Font/AppleTea-z8R1a.woff';
import AppleGothicL from '/Assets/Font/AppleSDGothicNeoL.woff';
import AppleGothicR from '/Assets/Font/AppleSDGothicNeoM.woff';
import AppleGothicB from '/Assets/Font/AppleSDGothicNeoB.woff';
import AppleGothicEB from '/Assets/Font/AppleSDGothicNeoEB.woff';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'AppleTea';
    src: url(${AppleTea});
  }

  @font-face {
    font-family: 'AppleGothicL';
    src: url(${AppleGothicL});
  }

  @font-face {
    font-family: 'AppleGothicR';
    src: url(${AppleGothicR});
  }

  @font-face {
    font-family: 'AppleGothicB';
    src: url(${AppleGothicB});
  }

  @font-face {
    font-family: 'AppleGothicEB';
    src: url(${AppleGothicEB});
  }

  * {
    padding: 0;
    margin: 0;

    box-sizing: border-box;
  }

  html, body, #root {
    min-width: 100%;
    min-height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    
    font-family: 'NanumBarunGothic';
  }

  div {
    display: block;
  }

  a {
    text-decoration: none;
  }
`;
