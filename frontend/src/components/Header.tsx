import styled from 'styled-components';
import DropDown from './Dropdown';
import { IMAGE } from '../constants/image';
import { colors, fontSizes } from '../Styles/theme';

const Header = ({ mode, themeHandler }: any) => {
  return (
    <HeaderTag>
      <Logo>CHECKPASS</Logo>
      <RightWrapper>
        {mode ? (
          <ThemeButton
            src={IMAGE.DarkThemeIcon}
            alt="ThemeIcon"
            onClick={themeHandler}
          ></ThemeButton>
        ) : (
          <ThemeButton
            src={IMAGE.LightThemeIcon}
            alt="ThemeIcon"
            onClick={themeHandler}
          ></ThemeButton>
        )}
        <DropDown />
      </RightWrapper>
    </HeaderTag>
  );
};

export default Header;

const HeaderTag = styled.div`
  width: 90%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;

  border-bottom: 1.5px solid ${colors['border-default']};
`;

const Logo = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['header-logo']};
  color: ${({ theme }) => theme.color};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeButton = styled.img`
  width: 44px;
  height: 44px;

  padding: 8px;

  cursor: pointer;

  &:hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.themeHover};
  }
`;
