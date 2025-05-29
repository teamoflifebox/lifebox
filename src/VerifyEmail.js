import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function VerifyEmail() {
  const [message, setMessage] = useState('');
  const { search } = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(search).get('token');
    axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response.data.message));
  }, [search]);

  return <h2>{message}</h2>;
}
