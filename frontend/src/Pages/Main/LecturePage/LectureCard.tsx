import styled from 'styled-components';
import { fontSizes, colors } from '../../../Styles/theme';

const LectureCard = () => {
  return (
    <LectureItem>
      <LectureName>캡스톤디자인(I)</LectureName>
      <Professor>신윤환</Professor>
      <LectureDetail>(금 5B,6A,6B,7A,7B,8A,8B,9A)</LectureDetail>
      <LectureDetail>미래융합정보관 (225)</LectureDetail>
      <LectureDetail>3학년 전필 2학점 442184-1</LectureDetail>
    </LectureItem>
  );
};

export default LectureCard;

const LectureItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 20px 15px;
  gap: 8px;

  border-radius: 20px;
  border: 1px solid ${colors['border-default']};
  box-shadow: 0px 0px 5px ${colors['shadow-default']};
`;

const LectureName = styled.span`
  color: ${colors['text-primary']};
  font-size: ${fontSizes.large};
  font-weight: bold;
`;

const Professor = styled.span`
  color: ${colors['text-secondary']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const LectureDetail = styled.span`
  color: ${colors['text-tertiary']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;
