import { useEffect, useState } from "react";

interface UserProfile {
  isAdmin: boolean;
}

export const useProfile = () => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
  }, [])

  return { data, loading }
}
