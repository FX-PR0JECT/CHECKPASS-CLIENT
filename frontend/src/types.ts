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

type TableProps = {
  data: Lecture[];
  buttonText: string;
  buttonHandler: (lectureCode: number) => void;
};

export type { Lecture, TableProps };
