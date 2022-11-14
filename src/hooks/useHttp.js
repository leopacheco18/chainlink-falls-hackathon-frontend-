import { useState } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = async ({
    type = "get",
    endpoint,
    data = {}
  }) => {
    try {
      setLoading(true);
      const response = await axios[type](backendUrl + endpoint, data, {
        headers
      });
      setLoading(false);
      return response.data;
    } catch (e) {
      setLoading(false);
      return e;
    }
  };

  return { loading, request };
};

export default useHttp;