const onCheckLogin = (id: string, pw: string, sameId: string, login: string) => {
  if (id === '') {
    return '아이디를 입력해주세요.';
  }

  if (pw === '') {
    return '비밀번호를 입력해주세요.';
  }

  if (login === 'FAIL') {
    return '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.';
  }

  if (sameId === 'SUCCESS') {
    return '아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.';
  }

  if (sameId === 'FAIL') {
    return '';
  }

  return '';
};

export { onCheckLogin };
