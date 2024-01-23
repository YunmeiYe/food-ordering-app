'use client'
import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import MenuItemForm from "@/components/features/menuItems/MenuItemForm"
import MenuItem from "@/types/MenuItem"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Loader from "@/components/common/Loader"

const EditMenuItemPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch(`/api/menu-items`)
      .then((response) => response.json())
      .then((items) => {
        const item = items.find((i: MenuItem) => i._id === id);
        setMenuItem(item)
      });
  }, [id])

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  if (profileData && !isAdmin) {
    router.push('/')
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""} />
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>, data: any): Promise<void> {
    event.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      data = { ...data, _id: id };
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
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin} />
          <Breadcrumbs size='lg' className="mt-12">
            <BreadcrumbItem href='/menu-items'>Menu Items</BreadcrumbItem>
            <BreadcrumbItem>Edit </BreadcrumbItem>
          </Breadcrumbs>
          <div className="max-w-4xl mx-auto mt-12">
            {menuItem &&
              <MenuItemForm
                buttonText={"Save Changes"}
                menuItem={menuItem}
                onSubmit={handleFormSubmit}
                onDelete={() => handleDeleteMenuItem()} />
            }
          </div>
        </>}
    </section>
  )
}

export default EditMenuItemPage