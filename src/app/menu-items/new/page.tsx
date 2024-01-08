'use client'
import UserTabs from "@/components/UserTabs"
import { useProfile } from "@/components/hooks/useProfile"
import { FormEvent} from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import LeftArrowIcon from "@/icons/LeftArrowIcon"
import { useRouter } from "next/navigation"
import MenuItemForm from "@/components/MenuItemForm"
import MenuItem from "@/types/MenuItem"

const NewMenuItemPage = () => {
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = useProfile()

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>, data:MenuItem): Promise<void> {
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
    <section className="my-8">
      <UserTabs admin={true} />
      <div className="block max-w-2xl mx-auto mt-12">
        <Link href={"/menu-items"} className="bg-primary rounded-xl p-2 text-white inline-flex gap-2 mb-12">
          <LeftArrowIcon className={"w-6"} />
          Back to Menu Items
        </Link>
        <MenuItemForm buttonText={"Create"} menuItem={null} onSubmit={handleFormSubmit} onDelete={()=>null} />
      </div>
    </section>
  )
}

export default NewMenuItemPage