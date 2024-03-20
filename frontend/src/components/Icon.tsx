import styled, { css } from 'styled-components';

export type IconType = {
  url: string;
  size: number;
  position: [number, number]; // tuple
};

export interface IIcon extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconType;
}

const Icon = ({ icon, children }: IIcon) => {
  return <Index $icon={icon}>{children}</Index>;
};

export default Icon;

const Index = styled.div<{ $icon?: IconType }>`
  width: 100%;

  ${({ $icon }) =>
    $icon &&
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

        background: url(${$icon.url}) no-repeat;
        background-size: ${$icon.size}px;
        background-position: ${$icon.position.map((position) => `${position}px`).join(' ')};
      }
    `}
`;
