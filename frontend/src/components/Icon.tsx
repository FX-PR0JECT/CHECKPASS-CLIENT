import styled, { css } from 'styled-components';

export type IconType = {
  url: string;
  size: number;
  position: [number, number]; // tuple
};

export interface IIcon extends React.HTMLAttributes<HTMLDivElement> {
  startIcon?: IconType;
}

const Icon = ({ startIcon, children }: IIcon) => {
  return <Index $startIcon={startIcon}>{children}</Index>;
};

export default Icon;

const Index = styled.div<{ $startIcon?: IconType }>`
  width: 100%;

  ${({ $startIcon }) =>
    $startIcon &&
    css`
      & > input,
      select {
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
