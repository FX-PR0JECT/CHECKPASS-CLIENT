import styled from 'styled-components';
import { fontSizes, colors } from '../../../Styles/theme';
import { LectureInfo } from '../../../types';

interface LectureProps {
  lecture: LectureInfo[];
}

const LectureCards: React.FC<LectureProps> = ({ lecture }) => {
  const getLectureTime = (timeCode: string[]) => {
    const formattedCode: string[] = [];

    timeCode.forEach((code: string) => {
      const day = code.slice(0, 1);
      const time = code.slice(2).slice(1, -1).replace(/\s/g, '');

      formattedCode.push(`(${day} ${time})`);
    });

    return formattedCode.join(', ');
  };

  const lectureItems: JSX.Element[] = lecture.map((item: LectureInfo) => {
    const lectureGrade = `${item.lectureGrade}학년`
    const lectureGrades = `${item.lectureGrades}학점`
    const lectureTimeCodes = `${getLectureTime(item.alphaTimeCodes)}`

    return (
      <LectureItem>
        <LectureName>{item.lectureName}</LectureName>
        <Professor>{item.professorName}</Professor>
        <LectureDetail>{lectureTimeCodes}</LectureDetail>
        <LectureDetail>{item.lectureRoom}</LectureDetail>
        <LectureDetail>
          {lectureGrade} {item.lectureKind} {lectureGrades} {item.lectureCode}
        </LectureDetail>
      </LectureItem>
    );
  });

  return <LectureContainer>{lectureItems}</LectureContainer>;
};

export default LectureCards;

const LectureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  padding: 10px;
  gap: 13px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

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
  font-size: ${fontSizes.large};
  font-weight: bold;
`;

const Professor = styled.span`
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const LectureDetail = styled.span`
  color: ${colors['text-tertiary']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;
