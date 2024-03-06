import styled from 'styled-components';
import axios from 'axios';
import Modal from '../../components/Modal';
import ListTable from './Table/ListTable';
import Header from '../../components/Header';

import { Lecture } from '../../types';
import { useState, useEffect } from 'react';

const EnrollmentPage = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [enrolledLectures, setEnrolledLectures] = useState<Lecture[]>([]);
  const [enrolledGrades, setEnrolledGrades] = useState<number>(0);
  const [enrolledMessage, setEnrolledMessage] = useState<String>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletedMessage, setDeletedMessage] = useState<String>('');

  const lectureList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/lectures/search');
      const resultSet = response.data.resultSet;

      return resultSet;
    } catch (error: any) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await lectureList();

        if (Array.isArray(result)) {
          setLectures(result);
        }
      } catch (error: any) {
        console.error(error.response.data.resultSet);
      }
    };
    fetchLectures();
  }, []);

  const enrollmentMessage = async (lectureCode: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/enrollment/${lectureCode}`
      );

      setEnrolledMessage(response.data.resultSet);
      setIsModalOpen(true);
    } catch (error: any) {
      setEnrolledMessage(error.response.data.resultSet);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const enrollmentLecture = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/enrollment`);
      const resultSet = response.data.resultSet;

      let score = 0;

      for (let i = 0; i < resultSet.length; i++) {
        score += Number(resultSet[i].lectureGrades[0]);
      }

      setEnrolledGrades(score);

      return resultSet;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const result = await enrollmentLecture();

        if (Array.isArray(result)) {
          setEnrolledLectures(result);
        }
      } catch (error: any) {
        console.error(error.response.data.resultSet);
      }
    };

    fetchEnrollment();
  }, []);

  const deleteMessage = async (lectureCode: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/enrollment/${lectureCode}`
      );

      setDeletedMessage(response.data.resultSet);
      setIsModalOpen(true);
    } catch (error: any) {
      console.error(error.response.data.resultSet);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          text={enrolledMessage || deletedMessage}
          isClose={handleCloseModal}
        />
      )}
      <Container>
        <Header />
        <Main>
          <Section>
            <TextContent>
              <Title>개설 강의 목록</Title>
            </TextContent>
            <SearchContainer></SearchContainer>
          </Section>
          <LectureSection>
            <ListTable
              data={lectures}
              buttonText="신청"
              buttonHandler={enrollmentMessage}
            />
          </LectureSection>
          <Section>
            <TextContent>
              <Title>
                <span>수강 신청 내역 </span>
              </Title>
              <div>
                <span>총 신청 가능 학점 20 | </span>
                <span>신청 강의 수 {enrolledLectures.length} | </span>
                <span>신청 학점 {enrolledGrades}</span>
              </div>
            </TextContent>
            <ListTable
              data={enrolledLectures}
              buttonText="취소"
              buttonHandler={deleteMessage}
            />
          </Section>
        </Main>
      </Container>
    </>
  );
};

export default EnrollmentPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  width: 91%;

  padding: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding-top: 20px;
  padding-bottom: 20px;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 120px;

  border: 1px solid #000;
`;

const LectureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding-bottom: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
`;
