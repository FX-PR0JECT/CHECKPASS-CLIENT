import { ChangeEvent, useState } from 'react';

const useInput = <T>(initInputs: T) => {
  const [inputs, setInputs] = useState(initInputs);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return { inputs, setInputs, onInputChange };
};

export default useInput;
