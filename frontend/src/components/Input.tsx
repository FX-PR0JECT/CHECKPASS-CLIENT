import styled, { css } from 'styled-components';
import { colors, fontSizes } from '../Styles/theme';

export type InputVariant = 'primary' | 'search';
export type InputFontSize = 'sm' | 'md' | 'lg';
export type StartIconType = {
  url: string;
  size: number;
  position: [number, number]; // tuple
};

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  isError?: boolean;
  fontSize?: InputFontSize;
  startIcon?: StartIconType;
}

/**
 * @param variant 기본 인풋 or search 인풋 (default: primary)
 * @param isError true일 경우 border를 red 색으로 변경
 */
const Input = ({
  variant = 'primary',
  isError = false,
  fontSize = 'sm',
  startIcon,
  ...props
}: IInput) => {
  if (startIcon) {
    return (
      <Icon $startIcon={startIcon}>
        <Index $variant={variant} $isError={isError} $fontSize={fontSize} {...props} />
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
      case 'primary':
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

const Icon = styled.div<{ $startIcon?: StartIconType }>`
  width: 100%;

  ${({ $startIcon }) =>
    $startIcon &&
    css`
      & > input {
        padding-left: 48px;
      }

      &::before {
        content: '';

        width: 50px;
        height: 50px;
        z-index: 1;

        position: absolute;

        background: url(${$startIcon.url}) no-repeat;
        background-size: ${$startIcon.size}px;
        background-position: ${$startIcon.position.map((position) => `${position}px`).join(' ')};
      }
    `}
`;
