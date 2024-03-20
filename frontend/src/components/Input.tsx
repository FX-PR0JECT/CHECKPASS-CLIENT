import styled, { css } from 'styled-components';
import { colors, fontSizes } from '../Styles/theme';
import Icon, { IconType } from './Icon';

export type InputVariant = 'sign' | 'search';
export type InputFontSize = 'sm' | 'md' | 'lg';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  isError?: boolean;
  fontSize?: InputFontSize;
  icon?: IconType;
}

/**
 * @param variant 기본 인풋 or search 인풋 (default: primary)
 * @param isError true일 경우 border를 red 색으로 변경
 * @param fontSize font 크기
 * @param icon Icon 있으면 sign 셀렉트
 */
const Input = ({
  variant = 'search',
  isError = false,
  fontSize = 'sm',
  icon,
  ...props
}: IInput) => {
  if (icon) {
    return (
      <Icon icon={icon}>
        <Index $variant="sign" $isError={isError} $fontSize={fontSize} {...props} />
      </Icon>
    );
  }

  return <Index $variant={variant} $isError={isError} $fontSize={fontSize} {...props} />;
};

export default Input;

const Index = styled.input<{
  $variant: InputVariant;
  $isError: boolean;
  $fontSize?: InputFontSize;
}>`
  width: 100%;
  min-height: 50px;
  height: 100%;

  font-family: 'AppleGothicR';
  outline: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'sign':
        return css`
          position: relative;
          border-radius: 20px;
          border: 1px solid ${colors['border-default']};
          background-color: ${colors['form-tag']};
        `;
      case 'search':
        return css`
          padding: 7px 5px;

          border-bottom: 1.5px solid ${colors['border-default']};
          border-width: 0 0 1px;
          outline: none;

          color: ${({ theme }) => theme.color};
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
