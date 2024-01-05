import { CameraIcon } from "@/icons/CameraIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import Category from "@/types/Category";
import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";

interface CategoriesTableProps {
  onEdit: (category: Category) => void;
  categories: Category[];
}

const CategoriesTable = ({ onEdit, categories }: CategoriesTableProps) => {

  return (
    <Table aria-label="Categories Table" classNames={{ th: "text-sm", td: "text-md text-gray-500" }}>
      <TableHeader>
        <TableColumn>IMAGE</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      {categories.length > 0 ? (
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                <Avatar src={category.image} showFallback fallback={
                  <CameraIcon className="animate-pulse w-6 h-6 text-default-500" />
                } />
              </TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit category">
                    <span className="text-lg text-primary-400 cursor-pointer active:opacity-50" onClick={() => onEdit(category)}>
                      <EditIcon className={"w-6"} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete category">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon className={"w-6"} />
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