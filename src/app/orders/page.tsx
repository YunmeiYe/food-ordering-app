'use client'
import OrdersTable from "@/components/OrdersTable";
import UserTabs from "@/components/UserTabs";
import { useProfile } from "@/components/hooks/useProfile"
import SectionHeaders from "@/components/layout/SectionHeaders";
import Order from "@/types/Order";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { data: profileData } = useProfile();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`/api/orders`)
      .then(res => res.json())
      .then(data => {console.log(data), setOrders(data.reverse()); })
  }, [])

  return (
    <section className='my-16'>
      {profileData && <UserTabs admin={profileData?.isAdmin} />}
      <div className="mt-8">
      <SectionHeaders subHeader={""} mainHeader={"Orders"}/>
      </div>
      <div className="mt-8">
        {orders && <OrdersTable orders={orders}/>}
      </div>
    </section>
  )
}

export default OrdersPage