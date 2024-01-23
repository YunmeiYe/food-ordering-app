import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Chip } from "@nextui-org/react"
import Link from "next/link";
import Order from "@/types/Order";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { getReadableDateTime } from "@/libs/datetime";

interface OrdersTableProps {
  orders: Order[];
  isAdmin: boolean;
}

const OrdersTable = ({ orders, isAdmin }: OrdersTableProps) => {
  return (
    <Table aria-label="Orders Table" isStriped
      topContent={'Total Orders: ' + orders.length}
      classNames={{ th: "text-md text-center", td: "text-md text-center text-gray-300", table: 'gap-4' }}>
      <TableHeader>
      <TableColumn>Order Date</TableColumn>
        <TableColumn>Order Number</TableColumn>
        <TableColumn className={isAdmin ? "" : "hidden"}>Customer Email</TableColumn>
        <TableColumn>Item Name</TableColumn>
        <TableColumn>Payment Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      {orders.length > 0 ? (
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell><p className="whitespace-nowrap">{getReadableDateTime(order.createdAt)}</p></TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell className={isAdmin ? "" : "hidden"}>{order.userEmail}</TableCell>
              <TableCell className="text-sm">
                {order.cartProducts.length > 1
                  ? (`${order.cartProducts[0].menuItem.name} + ${order.cartProducts.length - 1} more`)
                  : order.cartProducts[0].menuItem.name
                }
              </TableCell>
              <TableCell>
                {order.paid
                  ? <Chip className="capitalize" color='success' size="md" variant="flat">Paid</Chip>
                  : <Chip className="capitalize" color='danger' size="md" variant="flat">Cancelled</Chip>}
              </TableCell>
              <TableCell>
                <div className="relative flex items-center justify-center">
                  <Tooltip content="View order">
                    <Link className="text-lg cursor-pointer active:opacity-50" href={`/orders/${order._id}`}>
                      <EyeFilledIcon className={"w-6"} />
                    </Link>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={isAdmin
          ? "No orders to display"
          : <p>You haven&apos;t placed any orders. <Link href={"/menu"} className="text-primary">Start shopping</Link></p>
        }>
          {[]}
        </TableBody>
      )}
    </Table>
  )
}

export default OrdersTable