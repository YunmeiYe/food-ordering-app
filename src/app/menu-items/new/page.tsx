'use client'
import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { FormEvent } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import MenuItemForm from "@/components/features/menuItems/MenuItemForm"
import MenuItem from "@/types/MenuItem"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Loader from "@/components/common/Loader"

const NewMenuItemPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  if (profileData && !isAdmin) {
    router.push('/')
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""} />
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>, data: MenuItem): Promise<void> {
    event.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          image: data.image,
          description: data.description,
          category: data.category,
          basePrice: data.basePrice,
          sizes: data.sizes,
          extraIngredientsPrices: data.extraIngredientsPrices
        }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());

      if (response.errors) {
        reject();
      } else {
        resolve(response);
      }
    })

    await toast.promise(creationPromise, {
      loading: "Creating new item...",
      success: "Item created!",
      error: "Error creating item"
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
            <BreadcrumbItem>Create New </BreadcrumbItem>
          </Breadcrumbs>
          <div className="max-w-4xl mx-auto mt-12">
            <MenuItemForm buttonText={"Create"} menuItem={null} onSubmit={handleFormSubmit} onDelete={() => null} />
          </div>
        </>}
    </section>
  )
}

export default NewMenuItemPage