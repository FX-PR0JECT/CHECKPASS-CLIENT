const GRADE: readonly { value: string; name: string | number }[] =
  Object.freeze([
    { value: 'default', name: '학년' },
    { value: 'freshman', name: 1 },
    { value: 'sophomore', name: 2 },
    { value: 'junior', name: 3 },
    { value: 'senior', name: 4 },
    { value: '5thGrade', name: 5 },
  ]);

const DIVISION: readonly { value: string; name: string | number }[] =
  Object.freeze([
    { value: 'default', name: '분반' },
    { value: 'division1', name: 1 },
    { value: 'division2', name: 2 },
  ]);

const GRADES: readonly { value: string; name: string | number }[] =
  Object.freeze([
    { value: 'default', name: '학점' },
    { value: 'credit1', name: 1 },
    { value: 'credit2', name: 2 },
    { value: 'credit3', name: 3 },
  ]);

const LECTURE_KIND: readonly { value: string; name: string }[] = Object.freeze([
  { value: 'default', name: '이수 구분' },
  { value: 'MANDATORY', name: '전필' },
  { value: 'CHOICE', name: '전선' },
  { value: 'AUTONOMY', name: '자선' },
  { value: 'ELECTIVE', name: '교양' },
]);

const DAY_OR_NIGHT: readonly { value: string; name: string }[] = Object.freeze([
  { value: 'default', name: '주/야 구분' },
  { value: 'day', name: '주간' },
  { value: 'night', name: '야간' },
]);

export { GRADE, DIVISION, GRADES, LECTURE_KIND, DAY_OR_NIGHT };
