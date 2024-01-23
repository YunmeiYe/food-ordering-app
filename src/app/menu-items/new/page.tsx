'use client'
import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { FormEvent } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import MenuItemForm from "@/components/features/menuItems/MenuItemForm"
import MenuItem from "@/types/MenuItem"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"

const NewMenuItemPage = () => {
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = useProfile()

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
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
      <UserTabs admin={profileData.isAdmin} />
      <Breadcrumbs size='lg' className="mt-12">
        <BreadcrumbItem href='/menu-items'>Menu Items</BreadcrumbItem>
        <BreadcrumbItem>Create New </BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-4xl mx-auto mt-12">
        <MenuItemForm buttonText={"Create"} menuItem={null} onSubmit={handleFormSubmit} onDelete={() => null} />
      </div>
    </section>
  )
}

export default NewMenuItemPage