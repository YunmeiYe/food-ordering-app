'use client'
import UserTabs from "@/components/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import LeftArrowIcon from "@/icons/LeftArrowIcon"
import { useParams, useRouter } from "next/navigation"
import MenuItemForm from "@/components/MenuItemForm"
import MenuItem from "@/types/MenuItem"

const EditMenuItemPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = useProfile()
  const [menuItem, setMenuItem] = useState<MenuItem|null>(null);

  useEffect(() => {
    fetch(`/api/menu-items`)
      .then((response) => response.json())
      .then((items) => {
        const item = items.find((i: MenuItem) => i._id === id);
        setMenuItem(item)
      });
  }, [])

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>,data:any): Promise<void> {
    event.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      data = {...data, _id:id};
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());

      if (response.errors) {
        reject();
      } else {
        resolve(response);
      }
    })

    await toast.promise(creationPromise, {
      loading: "Updating item...",
      success: "Update success!",
      error: "Error updating item"
    });

    router.push('/menu-items')
  }

  function handleDeleteMenuItem(): void {
    const deletionPromise = new Promise(async (resolve, reject) => { 
      const response = await fetch(`/api/menu-items?_id=${id}`, {
        method: "DELETE"
      }).then((response) => response.json());
      if (response.error) {
        reject();
      } else {
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
      <UserTabs admin={true} />
      <div className="block max-w-2xl mx-auto mt-12">
        <Link href={"/menu-items"} className="bg-primary rounded-xl p-2 text-white inline-flex gap-2 mb-12">
          <LeftArrowIcon className={"w-6"} />
          Back to Menu Items
        </Link>
        <MenuItemForm
          buttonText={"Save Changes"}
          menuItem={menuItem}
          onSubmit={handleFormSubmit}
          onDelete={()=>handleDeleteMenuItem()} />
      </div>
    </section>
  )
}

export default EditMenuItemPage