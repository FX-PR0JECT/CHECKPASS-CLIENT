import styled from 'styled-components';
import Bubble from './Bubble';
import CardContent from './CardContent';
import { ReactNode } from 'react';

type CardPropsType = {
  width?: string;
  height?: string;
  image: string;
  description: string;
  content: string;
  title: string;
  hashtag: string;
  children?: ReactNode;
};

const Card = ({
  width,
  height,
  image,
  description,
  content,
  title,
  hashtag,
  children,
}: CardPropsType) => {
  return (
    <CardContainer width={width} height={height}>
      <Bubble image={image} description={description} content={content} />
      <CardContent title={title} hashtag={hashtag} />
      {children}
    </CardContainer>
  );
};

export default Card;

export type CardstyleProps = {
  width: string | undefined;
  height: string | undefined;
};

const CardContainer = styled.div<CardstyleProps>`
  width: ${({ width }) => width || '20.8rem'};
  height: ${({ height }) => height || '15.33125rem'};

  padding: 18px 20px;

  display: flex;
  flex-direction: column;

  gap: 18px;

  background-color: ${({ theme }) => theme.itemColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  transition: margin 0.3s;

  &:hover {
    margin-bottom: 5px;
    margin-top: -5px;
  }

  cursor: pointer;
`;
