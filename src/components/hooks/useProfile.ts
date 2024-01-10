import UserProfile from "@/types/UserProfile";
import { useEffect, useState } from "react";

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
