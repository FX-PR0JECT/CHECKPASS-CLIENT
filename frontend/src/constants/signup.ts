// Prof, Staff
const REG = {
  id: /^\d{7}$/,
  pw: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
  name: /^[가-힣]+$/,
  hireDate: /^(\d{4})-(\d{2})-(\d{2})$/,
};

const PROF_STAFF = [
  { value: 'default', name: '교수/교직원' },
  { value: 'PROFESSOR', name: '교수' },
  { value: 'STAFF', name: '교직원' },
];

// Student
const GRADE = [
  { value: 'default', name: '학년' },
  { value: '1학년', name: '1학년' },
  { value: '2학년', name: '2학년' },
  { value: '3힉년', name: '3학년' },
  { value: '4학년', name: '4학년' },
  { value: '5학년', name: '5학년' },
];

const DAY_OR_NIGHT = [
  { value: 'default', name: '주간/야간' },
  { value: 'day', name: '주간' },
  { value: 'night', name: '야간' },
];

const SEMESTER = [
  { value: 'default', name: '학기' },
  { value: '1학기', name: '1학기' },
  { value: '2학기', name: '2학기' },
];

export { REG, PROF_STAFF, GRADE, DAY_OR_NIGHT, SEMESTER };
