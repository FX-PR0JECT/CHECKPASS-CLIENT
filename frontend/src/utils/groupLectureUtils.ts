import { ProfessorLectures } from '@/src/types';

// 강의 정보를 이름별로 그룹화하는 함수
const groupByName = (professorLectures: ProfessorLectures[]) => {
  const lecturesByName = new Map<string, ProfessorLectures[]>();

  professorLectures.forEach((lecture) => {
    const existingGroup = lecturesByName.get(lecture.lectureName) || [];

    existingGroup.push(lecture);
    lecturesByName.set(lecture.lectureName, existingGroup);
  });

  return lecturesByName;
};

// 강의 코드별로 분반 정보를 그룹화하는 함수
const groupByCode = (lectures: ProfessorLectures[]) => {
  const lecturesByCodeMap: Map<number, string[]> = new Map();

  lectures.forEach((lecture) => {
    const divisions = lecturesByCodeMap.get(lecture.lectureCode) || [];

    divisions.push(lecture.division);
    lecturesByCodeMap.set(lecture.lectureCode, divisions);
  });

  const lecturesByCode = Array.from(lecturesByCodeMap).map(([lectureCode, divisions]) => ({
    lectureCode,
    divisions,
  }));

  return lecturesByCode;
};

// 강의 정보 처리 함수
const groupLectures = (professorLectures: ProfessorLectures[]) => {
  const lecturesByName = groupByName(professorLectures);

  const groupedLectures = Array.from(lecturesByName).map(([lectureName, lectures]) => ({
    lectureName,
    lecturesByCode: groupByCode(lectures),
  }));

  return groupedLectures;
};

export default groupLectures;
