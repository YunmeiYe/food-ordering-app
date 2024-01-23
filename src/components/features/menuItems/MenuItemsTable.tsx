import { PencilSquareIcon } from "@/icons/PencilSquareIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import MenuItem from "@/types/MenuItem";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Tooltip } from "@nextui-org/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalContainer from "../../common/ModalContainer";
import Category from "@/types/Category";

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  onDelete: (menuItem: MenuItem) => void;
}

const MenuItemsTable = ({ menuItems, onDelete }: MenuItemsTableProps) => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [])

  function handleOpenChange(menuItem: MenuItem, openState: boolean): void {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [menuItem._id!]: openState,
    }));
  }

  return (
    <Table aria-label="Menu Items Table" classNames={{ th: "text-md", td: "text-md text-gray-300 border-b" }}>
      <TableHeader>
        <TableColumn>Image</TableColumn>
        <TableColumn>Item Name</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Base Price</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      {menuItems.length > 0 ? (
        <TableBody>
          {menuItems.map((menuItem) => (
            <TableRow key={menuItem._id}>
              <TableCell>
                <Avatar src={menuItem.image} radius="md" className="w-20 h-auto" />
              </TableCell>
              <TableCell>{menuItem.name}</TableCell>
              <TableCell><p className="line-clamp-3">{menuItem.description}</p></TableCell>
              <TableCell>{categories.find(c => c._id === menuItem.category)?.name}</TableCell>
              <TableCell>${(menuItem.basePrice as number).toFixed(2)}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit item">
                    <Link className="text-lg cursor-pointer active:opacity-50" href={`/menu-items/edit/${menuItem._id}`}>
                      <PencilSquareIcon className={"w-6"} />
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete item">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOpenChange(menuItem, true)}>
                      <TrashIcon className={"w-6"} />
                      <ModalContainer
                        isOpen={openModals[menuItem._id!]}
                        title={`Delete item ${menuItem.name}?`}
                        content={"Are you sure you want to delete this item?"}
                        confirmText={"Yes, delete it"}
                        onConfirm={() => { onDelete(menuItem), handleOpenChange(menuItem, false) }}
                        closeText="Cancel"
                        onClose={() => handleOpenChange(menuItem, false)}
                      />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No items to display"}>{[]}</TableBody>
      )}
    </Table>
  )
}

export default MenuItemsTable