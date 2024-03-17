import styled, { css } from 'styled-components';
import Icon, { IconType } from './Icon';
import { colors, fontSizes } from '../Styles/theme';

export type SelectVariant = 'sign' | 'page';
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectFontSize = 'sm' | 'md' | 'lg';

export interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectVariant;
  isError?: boolean;
  selectSize?: SelectSize;
  fontSize?: SelectFontSize;
  startIcon?: IconType;
}

/**
 * @param variant signIn,signUp 셀렉트 (default: sign) or 여러 셀렉트 (default: page)
 * @param selectSize select 크기
 * @param fontSize font 크기
 * @param isError true일 경우 border를 red 색으로 변경
 * @param startIcon Icon 있으면 sign 셀렉트
 */
const Select = ({
  variant = 'page',
  isError = false,
  selectSize,
  fontSize = 'md',
  startIcon,
  children,
  ...props
}: ISelect) => {
  if (startIcon) {
    return (
      <Icon startIcon={startIcon}>
        <Index $variant="sign" $isError={isError} $fontSize={fontSize} {...props}>
          {children}
        </Index>
      </Icon>
    );
  }

  return (
    <Index
      $variant={variant}
      $isError={isError}
      $selectSize={selectSize}
      $fontSize={fontSize}
      {...props}
    >
      {children}
    </Index>
  );
};

export default Select;

const Index = styled.select<{
  $variant: SelectVariant;
  $isError: boolean;
  $selectSize?: SelectSize;
  $fontSize: SelectFontSize;
}>`
  outline: none;
  font-family: 'AppleGothicR';

  ${({ $variant }) => {
    switch ($variant) {
      case 'sign':
        return css`
          width: 100%;
          height: 50px;

          color: ${colors['text-placeholder']};

          border-radius: 18px;
          border: 1px solid ${colors['border-default']};
          background-color: ${colors['form-tag']};
        `;
      case 'page':
        return css`
          padding: 5px;
          height: 32px;

          border: none;
          border-radius: 6px;
          box-shadow: 0px 0px 5px ${colors['shadow-default']};
        `;
    }
  }}

  ${({ $selectSize }) => {
    switch ($selectSize) {
      case 'sm': // attendance
        return css`
          width: 100px;
        `;
      case 'md': // lecture
        return css`
          width: 200px;
        `;
      case 'lg': // attendance
        return css`
          width: 220px;
        `;
    }
  }}

  ${({ $fontSize }) => {
    switch ($fontSize) {
      case 'sm':
        return css`
          font-size: ${fontSizes.small};
        `;
      case 'md':
        return css`
          font-size: ${fontSizes.medium};
        `;
      case 'lg':
        return css`
          font-size: ${fontSizes.large};
        `;
    }
  }}

  ${({ $isError }) =>
    $isError &&
    css`
      border: 1px solid ${colors['border-error']};
    `}
`;
