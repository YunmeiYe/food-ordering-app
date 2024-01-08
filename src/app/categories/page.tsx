'use client'
import CategoriesTable from "@/components/CategoriesTable";
import ImageUploader from "@/components/ImageUploader";
import UserTabs from "@/components/UserTabs"
import { useProfile } from "@/components/hooks/useProfile";
import { PlusIcon } from "@/icons/PlusIcon";
import { UploadIcon } from "@/icons/UploadIcon";
import Category from "@/types/Category";
import { Button, Input, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile()
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

  function fetchCategories() {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }

  if (profileLoading) {
    return 'Loading user info...'
  }

  if (!profileData?.isAdmin) {
    return <h1>You are not an admin</h1>
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
    <section className="my-8">
      <UserTabs admin={profileData.isAdmin} />
      <div className="block max-w-2xl mx-auto mt-12">
        <div className="flex">
          <h1 className="text-xl grow">Categories</h1>
          <Button
            className={`${showAddNewBtn ? "" : "hidden"}`}
            color="primary"
            disabled={submitting}
            endContent={<PlusIcon className={"w-6"} />}
            onClick={() => setShowAddNewBtn(!showAddNewBtn)}>
            Add New
          </Button>
        </div>
        <form className={`mt-12 ${showAddNewBtn ? "hidden" : "grid grid-cols-12 gap-6"}`} onSubmit={handleFormSubmit}>
          <div className={`col-span-3 relative ${categoryImage ? "" : "bg-blue-100 border-dashed border-3 border-blue-500 rounded-lg flex flex-col text-center justify-center"} `}>
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
              <ImageUploader
                imageLink={categoryImage}
                setImageLink={setCategoryImage}
                children={<> </>}
              />
            </label>
          </div>
          <div className="col-span-9">
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
            <div className="flex gap-2 mt-4">
              <Button type="submit" color="primary" fullWidth disabled={submitting}>
                {selectedCategory ? "Save Changes" : "Add Category"}
              </Button>
              <Button className="px-12 bg-transparent border-2 border-gray-700" disabled={submitting} onClick={() => { setShowAddNewBtn(!showAddNewBtn), setSelectedCategory(null), setCategoryName(''), setCategoryImage(''), setError('') }}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
        <div className="text-red-600 mt-3">{error}</div>
        <div className="mt-8">
          <CategoriesTable
            onEdit={(category) => { setShowAddNewBtn(false), setSelectedCategory(category), setCategoryImage(category.image), setError('') } }
            onDelete={(category) => { handleDeleteCategory(category) }}
            categories={categories}
          />
        </div>
      </div>
    </section>
  )
}

export default CategoriesPage