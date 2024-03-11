import styled from 'styled-components';
import { fontSizes } from '@/src/Styles/theme';

type ContentPropsType = {
  title: string;
  hashtag: string;
};

const CardContent = ({ title, hashtag }: ContentPropsType) => {
  return (
    <Content>
      <CardTitle>{title}</CardTitle>
      <HashTag>{hashtag}</HashTag>
    </Content>
  );
};

export default CardContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTitle = styled.span`
  font-family: 'AppleGothicB';
  font-size: 1.6rem;
`;

const HashTag = styled.span`
  word-spacing: 8px;
  font-size: ${fontSizes.medium};
  color: #6d6d6d;
`;
