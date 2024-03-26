import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { colors, fontSizes } from '../Styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'code';
export type ButtonSize = 'md' | 'lg';

/**
 * primary - 검은바탕, 흰폰트
 * secondary - 흰색바탕, 검은폰트
 */

/**
 * md - medium, 400
 * lg - button-pw, 400
 */

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: PropsWithChildren<IButton>) => {
  return (
    <Index $variant={variant} $size={size} {...props}>
      {children}
    </Index>
  );
};

export default Button;

const Index = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  width: 100%;
  height: 100%;

  border: none;
  border-radius: 20px;
  outline: none;
  cursor: pointer;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: ${colors.button};
          color: ${colors['button-text']};
        `;
      case 'secondary':
        return css`
          background-color: ${colors.white};
          color: ${colors.button};
        `;
      case 'code':
        return css`
          padding: 10px;
          background-color: ${({ theme }) => theme.button_bg};
          color: ${({ theme }) => theme.button_color};
        `;
    }
  }}

  ${({ $size }) => {
    switch ($size) {
      case 'md':
        return css`
          font-size: ${fontSizes.medium};
          font-weight: 400;
        `;
      case 'lg':
        return css`
          font-size: ${fontSizes['button-pw']};
          font-weight: 400;
        `;
    }
  }}
`;
