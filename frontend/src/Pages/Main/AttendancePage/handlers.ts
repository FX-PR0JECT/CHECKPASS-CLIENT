import { SetStateAction } from 'react';

// 강의별 분반 조회
const handleDivisionChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setSelectedDivision: (value: SetStateAction<string>) => void
) => {
  setSelectedDivision(e.target.value);
};

// 강의/분반별 주차 조회
const handleWeekChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setSelectedWeek: (value: SetStateAction<string>) => void
) => {
  const week = e.target.value;
  if (week !== '--주차 선택--') setSelectedWeek(week);
};

export { handleDivisionChange, handleWeekChange };
