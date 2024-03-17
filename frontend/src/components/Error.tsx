import styled, { css } from 'styled-components';
import { colors } from '../Styles/theme';

export type ErrorVariant = 'primary' | 'signIn';

export interface IError extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ErrorVariant;
}

const Error = ({ variant = 'primary', ...props }: IError) => {
  return <Index $variant={variant} {...props} />;
};

export default Error;

const Index = styled.div<{
  $variant: ErrorVariant;
}>`
  width: 100%;
  font-size: 12px;
  color: ${colors['text-error']};

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css``;

      case 'signIn':
        return css`
          white-space: pre-wrap;
        `;
    }
  }}
`;
