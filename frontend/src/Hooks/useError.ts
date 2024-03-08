import { useState } from 'react';

const useError = <T>(initialValue?: { message: string; type: T }) => {
  const [error, setError] = useState(initialValue);

  const onChangeError = (initialValue?: { message: string; type: T }) => {
    setError(initialValue);
  };

  return { error, setError, onChangeError };
};

export default useError;
