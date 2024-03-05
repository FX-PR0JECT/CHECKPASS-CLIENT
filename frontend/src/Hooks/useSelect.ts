import { ChangeEvent, useState } from 'react';

const useSelect = <T>(initSelects: T) => {
  const [selects, setSelects] = useState(initSelects);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const updatedSelects = {
      ...selects,
      [name]: value,
    };
    setSelects(updatedSelects);
  };

  return { selects, setSelects, onSelectChange };
};

export default useSelect;
