import UserProfile from "@/types/UserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
    }
  }, [session, status])

  return { data, loading }
}
