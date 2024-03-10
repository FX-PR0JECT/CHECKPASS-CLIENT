type Lecture = {
  lectureCode: number;
  division: string;
  lectureName: string;
  lectureGrade: string;
  lectureFull: number;
  lectureCount: number;
  professorName: string;
  lectureGrades: string;
  lectureRoom: string;
  alphaTimeCodes: string;
  lectureKind: string;
  dayOrNight: 'day' | 'night';
};

type LectureInfo = {
  lectureName: string;
  professorName: string;
  lectureRoom: string;
  alphaTimeCodes: string[];
  lectureGrade: string;
  lectureKind: string;
  lectureGrades: string;
  lectureCode: number;
  lectureTimes: string[];
};

type TableProps = {
  data: Lecture[];
  buttonText: string;
  buttonHandler: (lectureCode: number) => void;
};

export type { Lecture, LectureInfo, TableProps };
