import { useEffect, useState } from 'react';
import { fetchSession } from '../apiCalls';

export const useSession = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setLoading(true);

    const _getData = async () => {
      try {
        const data = await fetchSession();
        setLoading(false);
        setSession(data);
      } catch (e) {
        setLoading(false);
      }
    };

    _getData();
  }, []);

  return { loading, session };
};
