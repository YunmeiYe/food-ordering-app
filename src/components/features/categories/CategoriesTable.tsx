import { PencilSquareIcon } from "@/icons/PencilSquareIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import Category from "@/types/Category";
import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalContainer from "../../common/ModalContainer";

interface CategoriesTableProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  categories: Category[];
}

const CategoriesTable = ({ onEdit, onDelete, categories }: CategoriesTableProps) => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

  function handleOpenChange(category: Category, openState: boolean): void {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [category._id]: openState,
    }));
  }

  return (
    <Table aria-label="Categories Table" isStriped classNames={{ th: "text-md", td: "text-md text-gray-300" }}>
      <TableHeader>
        <TableColumn>Image</TableColumn>
        <TableColumn>Category Name</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      {categories.length > 0 ? (
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                <Avatar src={category.image} radius="md" className="bg-transparent w-[140px] h-auto" />
              </TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit category">
                    <span className="text-lg cursor-pointer active:opacity-50" onClick={() => onEdit(category)}>
                      <PencilSquareIcon className={"w-6"} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete category">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOpenChange(category, true)}>
                      <TrashIcon className={"w-6"} />
                      <ModalContainer
                        isOpen={openModals[category._id]}
                        title={`Delete category ${category.name}?`}
                        content={"Are you sure you want to delete this category?"}
                        confirmText={"Yes, delete it"}
                        onConfirm={() => { onDelete(category), handleOpenChange(category, false) }}
                        closeText="Cancel"
                        onClose={() => handleOpenChange(category, false)}
                      />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No categories to display"}>{[]}</TableBody>
      )}
    </Table>
  )
}

export default CategoriesTable