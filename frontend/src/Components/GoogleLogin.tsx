import { apiCallPost } from '../Utilities/ApiCalls';
import { useNavigate } from 'react-router-dom';
import { getUrl } from '../Utilities/ServerEnv';

export const useGoogleLogin = () => {

  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const data = await apiCallPost('api/auth/google-login/', { id_token: credentialResponse.credential }, false);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      localStorage.setItem('url', getUrl());
      localStorage.setItem('token-expiry', data.expiry)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Google login error');
  };

  return { handleGoogleLoginSuccess, handleGoogleLoginError };
};