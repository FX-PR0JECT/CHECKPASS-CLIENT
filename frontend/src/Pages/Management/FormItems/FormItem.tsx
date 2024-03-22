import styled from 'styled-components';
import React from 'react';

type ChildrenProps = {
  children: React.ReactNode;
};

const FormItem = ({ children }: ChildrenProps) => {
  return <Item>{children}</Item>;
};

const Label = ({ children }: ChildrenProps) => {
  return <span>{children}</span>;
};

type InputProps = {
  placeholder: string;
  type: 'text';
};

const Input = ({ placeholder, type }: InputProps) => {
  return <InputTag type={type} placeholder={placeholder} />;
};

type Option = {
  value: string;
  name: string | number;
};

type SelectProps = {
  options: readonly Option[];
};

const Select = ({ options }: SelectProps) => {
  return (
    <SelectTag>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </SelectTag>
  );
};

export { FormItem, Label, Input, Select };

const Item = styled.form`
  display: flex;
  align-items: center;

  gap: 5px;

  font-size: 15px;
`;

const InputTag = styled.input`
  padding: 3px 8px;

  border: 1px solid #5a5a5a;
  border-radius: 5px;

  outline: none;
`;

const SelectTag = styled.select`
  padding: 3px 3px;

  border: 1px solid #5a5a5a;
  border-radius: 5px;

  outline: none;
`;
