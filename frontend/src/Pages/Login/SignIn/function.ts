const onCheckId = (id: string, idValid: string) => {
  if (id === '') {
    return '아이디를 입력해주세요.';
  }

  // DB에 이미 존재하는 경우가 FAIL
  if (idValid === 'SUCCESS') {
    return '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.';
  }

  if (idValid === 'FAIL') {
    return '';
  }

  return '';
};

const onCheckPw = (pw: string, login: string) => {
  if (pw === '') {
    return '비밀번호를 입력해주세요.';
  }

  if (login === 'FAIL') {
    return '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.';
  }
};

type ErrorType = {
  id: string;
  idValid: string;
  pw: string;
  login: string;
};

const onError = ({ id, pw, idValid, login }: ErrorType) => {
  // 로그인 에러메시지 순서
  // 일단 input이 입력되었는지 확인: id(빈 문자열) -> pw (빈 문자열)
  // input에 입력되었으면 조건 확인: DB에 존재하는 id -> 로그인 성공여부

  // id 먼저 빈 문자열인지 확인
  if (id === '') {
    const errorId = onCheckId(id, idValid);
    return { errorId, errorPw: '' };
  }

  // id가 문자열이면 pw가 빈 문자열인지 확인
  if (pw === '') {
    const errorPw = onCheckPw(pw, login);
    return { errorId: '', errorPw };
  }

  // id가 DB에 없는 id 일 때
  if (idValid === 'SUCCESS') {
    const errorId = onCheckId(id, idValid);
    return { errorId, errorPw: '' };
  }

  // 둘 다 빈 문자열이 아니면 기존 로직 수행
  const errorId = onCheckId(id, idValid);
  const errorPw = onCheckPw(pw, login);
  return { errorId, errorPw };
};

export { onError };
