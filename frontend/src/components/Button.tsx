import styled from 'styled-components';
import { colors, fontSizes } from '../Styles/theme';

export type ButtonStyleProps = { $width?: number; $height?: number; $border_radius?: number };

export type ButtonProps = ButtonStyleProps & {
  label: string;
};

const Button = ({ label, ...props }: ButtonProps) => {
  return <Index {...props}>{label}</Index>;
};

export default Button;

const Index = styled.button<ButtonStyleProps>`
  width: ${({ $width = 130 }) => `${$width}px`};
  height: ${({ $height = 32 }) => `${$height}px`};

  background-color: ${colors.button};
  border-radius: ${({ $border_radius = 20 }) => `${$border_radius}px`};
  border: none;
  color: ${colors['button-text']};
  font-size: ${fontSizes['button-pw']};

  cursor: pointer;
`;
