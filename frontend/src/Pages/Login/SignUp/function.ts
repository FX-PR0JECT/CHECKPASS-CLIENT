import { REG } from '@/src/constants/signup';

// SignUpProfStaff, SignUpStudent
const onCheckId = (id: string, sameId: string) => {
  if (id === '') {
    return '아이디: 필수 정보입니다.';
  }

  if (!REG.id.test(id)) {
    return '아이디: 숫자 7자리로 입력하세요';
  }

  if (sameId === 'FAIL') {
    return '아이디: 중복된 ID 입니다.';
  }

  if (sameId === 'SUCCESS') {
    return '';
  }

  return '';
};

const onCheckPw = (pw: string) => {
  if (pw === '') {
    return '비밀번호: 필수 정보입니다.';
  }

  if (!REG.pw.test(pw)) {
    return '8~16자의 영문, 숫자, 특수문자를 사용해주세요.';
  }

  return '';
};

const onCheckConfirmPw = (pw: string, confirmPw: string) => {
  if (confirmPw === '') {
    return '비밀번호 확인: 필수 정보입니다.';
  }

  if (pw !== confirmPw) {
    return '비밀번호 확인: 비밀번호와 일치하지 않습니다.';
  }

  return '';
};

const onCheckName = (name: string) => {
  if (name === '') {
    return '이름: 필수 정보입니다.';
  }

  if (!REG.name.test(name)) {
    return '이름: 한글로 입력해주세요.';
  }

  return '';
};

const onCheckProfStaff = (profStaff: string) => {
  if (profStaff === '') {
    return '교수/교직원: 필수 정보입니다.';
  }

  return '';
};

const onCheckCollege = (college: string) => {
  if (college === '') {
    return '학부: 필수 정보입니다.';
  }

  return '';
};

const getDepartment = (college: string, department: string) => {
  const collegesWithoutDepartment = ['FacultyOfLiberalArts', 'Free', 'CreativeConvergence'];

  if (collegesWithoutDepartment.includes(college)) {
    return {};
  } else {
    return { signUpDepartment: department };
  }
};

// Only SignUpProfStaff
const onCheckHireDate = (hireDate: string) => {
  if (hireDate === '') {
    return '입사일: 필수 정보입니다.';
  }

  if (!REG.hireDate.test(hireDate)) {
    return '입사일: YYYY-MM-DD 형식에 맞게 입력해주세요.';
  }

  return '';
};

const getHireDate = (hireDate: string) => {
  // 숫자만 가져오기
  let newHireDate = hireDate.replace(/[^0-9]/g, '');

  if (newHireDate.length >= 4) {
    // replace: YYYY-MM-DD 형식 만들기
    // slice: 최대 10자리까지 (YYYY-MM-DD);
    return newHireDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3').slice(0, 10);
  }

  return newHireDate;
};

// Only SignUpStudent
const onCheckGrade = (grade: string) => {
  if (grade === '') {
    return '학년: 필수 정보입니다.';
  }

  return '';
};

const onCheckDayOrNight = (dayOrNight: string) => {
  if (dayOrNight === '') {
    return '주간/야간: 필수 정보입니다.';
  }

  return '';
};

const onCheckSemester = (semester: string) => {
  if (semester === '') {
    return '학기: 필수 정보입니다.';
  }

  return '';
};

type ErrorType = {
  id: string;
  sameId: string;
  pw: string;
  confirmPw: string;
  name: string;
  college: string;
  profStaff?: string;
  hireDate?: string;
  grade?: string;
  dayOrNight?: string;
  semester?: string;
};

const onError = ({
  id,
  sameId,
  pw,
  confirmPw,
  name,
  college,
  profStaff,
  hireDate,
  grade,
  dayOrNight,
  semester,
}: ErrorType) => {
  const errorId = onCheckId(id, sameId);
  const errorPw = onCheckPw(pw);
  const errorConfirmPw = onCheckConfirmPw(pw, confirmPw);
  const errorName = onCheckName(name);
  const errorCollege = onCheckCollege(college);
  const errorProfStaff = profStaff != null ? onCheckProfStaff(profStaff) : undefined;
  const errorHireDate = hireDate != null ? onCheckHireDate(hireDate) : undefined;
  const errorGrade = grade != null ? onCheckGrade(grade) : undefined;
  const errorDayOrNight = dayOrNight != null ? onCheckDayOrNight(dayOrNight) : undefined;
  const errorSemester = semester != null ? onCheckSemester(semester) : undefined;

  return {
    errorId,
    errorPw,
    errorConfirmPw,
    errorName,
    errorCollege,
    errorProfStaff,
    errorHireDate,
    errorGrade,
    errorDayOrNight,
    errorSemester,
  };
};

export { getDepartment, getHireDate, onError };
