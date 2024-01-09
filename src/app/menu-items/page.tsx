'use client'
import UserTabs from "@/components/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { useEffect, useState } from "react"
import Link from "next/link"
import MenuItemsTable from "@/components/MenuItemsTable"
import RightArrowIcon from "@/icons/RightArrowIcon"
import MenuItem from "@/types/MenuItem"
import { Button } from "@nextui-org/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const MenuItemsPage = () => {
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = useProfile()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  function fetchMenuItems() {
    fetch("/api/menu-items")
     .then((response) => response.json())
     .then((data) => setMenuItems(data));
   }

  useEffect(() => {
    fetchMenuItems()
  }, [])

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  function handleDeleteMenuItem(menuItem: MenuItem) {
    const deletionPromise = new Promise(async (resolve, reject) => { 
      const response = await fetch(`/api/menu-items?_id=${menuItem._id}`, {
        method: "DELETE"
      }).then((response) => response.json());
      if (response.error) {
        reject();
      } else {
        fetchMenuItems();
        resolve(response);
      }
    })

    toast.promise(deletionPromise, {
      loading: "Deleting menu item...",
      success: "Menu item deleted!",
      error: "Error deleting menu item"
    });

    router.push('/menu-items')
  }

  return (
    <section className="my-8">
      <UserTabs admin={profileData.isAdmin} />
      <div className="block max-w-2xl mx-auto mt-12">
        <div className="flex">
          <h1 className="text-xl grow">Menu Items</h1>
          <Button href={"/menu-items/new"} as={Link} type="button" color="primary" endContent={<RightArrowIcon className={"w-6"} />}>Create New</Button>
        </div>
        <div className="mt-12">
          <MenuItemsTable
            menuItems={menuItems}
            onDelete={(menuItem: MenuItem) => { handleDeleteMenuItem(menuItem) }} />
        </div>
      </div>
    </section>
  )
}

export default MenuItemsPage