import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

// This function will trigger in every refersh
export function useLoadingWithRefresh() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Here we calling the refersh token api from backend
      try {
        const { data } = await axios.get(`http://localhost:5000/api/refresh`, {
          withCredentials: true,
        });

        dispatch(setAuth(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}
