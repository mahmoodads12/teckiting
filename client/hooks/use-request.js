import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  // method === 'post', 'get', 'patch', 'delete' ....
  const [errors, setErrors] = useState(null);
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](
        url,
        { ...body, ...props },
        {
          withCredentials: true, // Wichtig: Cookies werden mitgesendet
        }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger mt-4">
          <h4>Oooops....</h4>
          <ul>
            {err.response?.data?.errors?.map((error) => (
              <li key={error.message}>{error.message}</li>
            )) || <li>Unbekannter Fehler</li>}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
