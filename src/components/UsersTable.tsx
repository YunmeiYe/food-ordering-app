import { CameraIcon } from "@/icons/CameraIcon";
import { PencilSquareIcon } from "@/icons/PencilSquareIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import User from "@/types/User";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Tooltip, User as UserUI, Link } from "@nextui-org/react";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({users}:UsersTableProps) => {
  return (
    <Table aria-label="Users Table" classNames={{ th: "text-sm", td: "text-md text-gray-500"}}>
    <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
      <TableColumn>ACTIONS</TableColumn>
    </TableHeader>
    {users.length > 0 ? (
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <UserUI
                avatarProps={{ radius: "lg", src: user.image, showFallback: true}}
                description={(
                  <Link href="" size="sm" className="text-blue-500">
                    {user.email}
                  </Link>
                )}
                name={user.name}
                classNames={{name: "text-md", description: "text-sm"}}
              />
            </TableCell>
            <TableCell>{user.isAdmin && 'Admin'}</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit user">
                <Link className="text-lg text-primary-400 cursor-pointer active:opacity-50" href={`/users/${user._id}`}>
                      <PencilSquareIcon className={"w-6"} />
                    </Link>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <TrashIcon className={"w-6"} />
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

export default UsersTable