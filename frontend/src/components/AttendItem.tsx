import styled, { css } from 'styled-components';
import { colors, fontSizes } from '../Styles/theme';
import { PropsWithChildren } from 'react';

export interface IAttendItem {
  attend: string;
}

const getColorByAttend = (attend: string): [string, string] => {
  switch (attend) {
    case '1':
      return [colors['attendance-item-b1'], colors['attendance-item-b2']];
    case '2':
      return [colors['attendance-item-y1'], colors['attendance-item-y2']];
    case '3':
      return [colors['attendance-item-r1'], colors['attendance-item-r2']];
    default:
      return [colors['attendance-item-g1'], colors['attendance-item-g2']];
  }
};

const AttendItem = ({ children, attend }: PropsWithChildren<IAttendItem>) => {
  const variant = attend.length === 1 ? 'full' : 'separate';

  if (variant === 'full') {
    return <FullContainer $color={getColorByAttend(attend)}>{children}</FullContainer>;
  }

  const leftAttend = attend.charAt(0); // attendanceStatus 첫번째 출석
  const rightAttend = attend.charAt(1); // attendanceStatus 두번째 출석

  return (
    <SeparateContainer>
      <LeftSeparate $color={getColorByAttend(leftAttend)} />
      <RightSeparate $color={getColorByAttend(rightAttend)} />
      <Value>{children}</Value>
    </SeparateContainer>
  );
};

export default AttendItem;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 110px;
  height: 110px;

  border-radius: 27px;
  box-shadow: 0px 0px 4px ${colors['shadow-default']};

  font-size: ${fontSizes.large};
  font-family: 'AppleGothicR';
  color: black;

  cursor: pointer;
`;

const FullContainer = styled(Container)<{ $color: [string, string] }>`
  ${({ $color }) => {
    const [first, second] = $color;
    return css`
      background: linear-gradient(${first}, ${second});
    `;
  }}
`;

const SeparateContainer = styled(Container)`
  position: relative;
  overflow: hidden;
`;

const LeftSeparate = styled.div<{ $color: [string, string] }>`
  position: absolute;
  width: 100%;
  height: 100%;

  border: none;

  ${({ $color }) => {
    const [first, second] = $color;
    return css`
      background: linear-gradient(${first}, ${second});
    `;
  }}

  clip-path: polygon(100% 0, 0 100%, 0 0);
`;

const RightSeparate = styled.div<{ $color: [string, string] }>`
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ $color }) => {
    const [first, second] = $color;
    return css`
      background: linear-gradient(${first}, ${second});
    `;
  }}

  clip-path: polygon(0 100%, 100% 0, 100% 100%);
`;

const Value = styled.span`
  z-index: 1;
`;
