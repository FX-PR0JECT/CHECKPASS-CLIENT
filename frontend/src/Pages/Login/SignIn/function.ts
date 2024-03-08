const isExistError = (id: string, pw: string) => {
  const isExistId = !!id;
  const isExistPw = !!pw;
  if (!isExistId) {
    return { message: '아이디를 입력해주세요.', type: 'id' };
  }
  if (!isExistPw) {
    return { message: '비밀번호를 입력해주세요.', type: 'pw' };
  }
};

const isIdValidError = (idValid: string) => {
  if (idValid === 'SUCCESS') {
    return {
      message: '아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.',
      type: 'id',
    };
  }
};

export { isExistError, isIdValidError };
