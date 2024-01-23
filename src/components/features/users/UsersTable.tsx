import { PencilSquareIcon } from "@/icons/PencilSquareIcon";
import { TrashIcon } from "@/icons/TrashIcon";
import { getReadableDateTime } from "@/libs/datetime";
import UserProfile from "@/types/UserProfile";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, User as UserUI, Link } from "@nextui-org/react";

interface UsersTableProps {
  users: UserProfile[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table aria-label="Users Table" isStriped classNames={{ th: "text-md", td: "text-md text-gray-300" }}>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Created at</TableColumn>
        <TableColumn>Last Updated at</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      {users.length > 0 ? (
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <UserUI
                  avatarProps={{ src: user.image, size:'lg', showFallback: true }}
                  description={(
                    <Link href="" size="sm" className="text-blue-500">
                      {user.email}
                    </Link>
                  )}
                  name={user.name}
                  classNames={{ name: "text-md", description: "text-sm" }}
                />
              </TableCell>
              <TableCell>{user.isAdmin ? 'Admin' : 'Customer'}</TableCell>
              <TableCell>{user.createdAt && getReadableDateTime(user.createdAt)}</TableCell>
              <TableCell>{user.updatedAt && getReadableDateTime(user.updatedAt)}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit user">
                    <Link className="text-lg text-gray-300 cursor-pointer active:opacity-50" href={`/users/${user._id}`}>
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