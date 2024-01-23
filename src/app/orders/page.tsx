'use client'
import OrdersTable from "@/components/features/orders/OrdersTable";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/hooks/useProfile"
import Order from "@/types/Order";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/common/Loader";

const OrdersPage = () => {
  const { data:session, status } = useSession();
  const { data: profileData, loading } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
      fetch(`/api/orders`)
      .then(res => res.json())
      .then(data => { setOrders(data.reverse()); })
  }, [])

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""}/>
  }
  
  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={isAdmin!} className={isAdmin ? "" : "max-w-2xl mx-auto"} />
          <div className="mt-16 text-center">
            <h1 className="text-primary italic font-semibold">{isAdmin ? "Orders" : "Order History"}</h1>
          </div>
          <div className="mt-4">
            {orders && <OrdersTable orders={orders} isAdmin={isAdmin!} />}
          </div>
        </>
      }
    </section>
  )
}

export default OrdersPage