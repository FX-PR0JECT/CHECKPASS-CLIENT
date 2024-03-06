import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const auth = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    async function auth() {
      axios
        .get('http://localhost:8080/users')
        .then(({ data }) => {
          setUserName(data.resultSet.userName);
          setUserId(data.resultSet.userId);
        })
        .catch((error) => {
          navigate('/signIn');
          console.log(error);
        });
    }
    auth();
  }, []);

  return { userName, userId };
};

export default auth;
