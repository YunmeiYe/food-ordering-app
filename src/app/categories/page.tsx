'use client'
import CategoriesTable from "@/components/features/categories/CategoriesTable";
import ImageUploader from "@/components/common/ImageUploader";
import UserTabs from "@/components/layout/UserTabs"
import { useProfile } from "@/components/hooks/useProfile";
import { PlusIcon } from "@/icons/PlusIcon";
import { UploadIcon } from "@/icons/UploadIcon";
import Category from "@/types/Category";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/common/Loader";

const CategoriesPage = () => {
  const { data: session, status } = useSession();
  const { loading, data: profileData } = useProfile();
  const isAdmin = profileData?.isAdmin;
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showAddNewBtn, setShowAddNewBtn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [])

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  if (profileData && !isAdmin) {
    redirect('/');
  }

  if (status === 'loading' || loading && session) {
    return <Loader className={""}/>
  }

  function fetchCategories() {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }


  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName, image: categoryImage } as Category;
      if (selectedCategory) {
        data._id = selectedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: selectedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());

      if (response.error) {
        setError(response.message);
        reject();
      } else {
        setShowAddNewBtn(!showAddNewBtn);
        setSelectedCategory(null);
        setCategoryName("");
        setCategoryImage("");
        fetchCategories();
        resolve(response);
      }
    })
    setSubmitting(false);

    toast.promise(creationPromise, {
      loading: selectedCategory ? "Updating category..." : "Creating new category...",
      success: selectedCategory ? "Update success!" : "Category created!",
      error: selectedCategory ? "Error updating category" : "Error creating category"
    });
  }

  async function handleDeleteCategory(category: Category) {
    const deletionPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/categories?_id=${category._id}`, {
        method: "DELETE"
      }).then((response) => response.json());
      if (response.error) {
        reject();
      } else {
        fetchCategories();
        resolve(response);
      }
    })

    toast.promise(deletionPromise, {
      loading: "Deleting category...",
      success: "Category deleted!",
      error: "Error deleting category"
    });
  }

  return (
    <section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
        <>
          <UserTabs admin={profileData.isAdmin} />
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex px-2">
              <h1 className="text-2xl font-semibold italic grow text-primary">Categories</h1>
              <Button
                className={`text-dark hover:text-white ${showAddNewBtn ? "" : "hidden"}`}
                color="primary"
                disabled={submitting}
                endContent={<PlusIcon className={"w-6"} />}
                onClick={() => setShowAddNewBtn(!showAddNewBtn)}>
                Add New
              </Button>
            </div>
            <form className={`mt-12 ${showAddNewBtn ? "hidden" : "grid grid-cols-3 gap-6"}`} onSubmit={handleFormSubmit}>
              <div className={`relative ${categoryImage ? "" : "bg-blue-100 border-dashed border-3 border-blue-500 rounded-lg flex flex-col text-center justify-center"} `}>
                <label className="cursor-pointer h-full flex flex-col justify-center">
                  {categoryImage ? (
                    <Tooltip content={"Click to upload image"} placement="bottom">
                      <span className="h-full relative">
                        <Image src={categoryImage} alt={categoryImage} className="rounded-xl" fill />
                      </span>
                    </Tooltip>
                  ) : (
                    <>
                      <UploadIcon className={"w-14 fill-blue-500 place-self-center"} />
                      Upload Image
                    </>
                  )}
                  <ImageUploader setImageLink={setCategoryImage} />
                </label>
              </div>
              <div className="col-span-2 flex flex-col gap-4 py-6">
                <Input
                  isRequired
                  type="text"
                  label={selectedCategory ? `Selected Category: ${selectedCategory.name}` : "New category"}
                  labelPlacement="outside"
                  placeholder={selectedCategory ? "Update category name" : "Enter new category name"}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  isDisabled={submitting}
                />
                {error &&
                  <div className="text-danger mt-3">{error}</div>
                }
                <div className="flex gap-2 mt-4">
                  <Button type="submit" color="primary" fullWidth className="font-semibold hover:text-white" disabled={submitting}>
                    {selectedCategory ? "Save Changes" : "Add Category"}
                  </Button>
                  <Button color="danger" variant='flat' fullWidth className="border border-danger hover:text-white" disabled={submitting} onClick={() => { setShowAddNewBtn(!showAddNewBtn), setSelectedCategory(null), setCategoryName(''), setCategoryImage(''), setError('') }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-12">
              <CategoriesTable
                onEdit={(category) => { setShowAddNewBtn(false), setSelectedCategory(category), setCategoryImage(category.image), setError('') }}
                onDelete={(category) => { handleDeleteCategory(category) }}
                categories={categories}
              />
            </div>
          </div>
        </>
      }
    </section>
  )
}

export default CategoriesPage