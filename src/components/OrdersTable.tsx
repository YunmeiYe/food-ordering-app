import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Chip } from "@nextui-org/react"
import Link from "next/link";
import Order from "@/types/Order";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { getReadableDateTime } from "@/libs/datetime";
import { CreditCardIcon } from "@/icons/CreditCardIcon";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <Table aria-label="Orders Table" isStriped
      topContent={'Total Orders: ' + orders.length}
      classNames={{ th: "text-md text-center", td: "text-md text-gray-700 text-center", table:'gap-4'}}>
      <TableHeader>
        <TableColumn>Order ID</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Order Items</TableColumn>
        <TableColumn>Order Date</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      {orders.length > 0 ? (
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell className="pl-8">{order.userEmail}</TableCell>
              <TableCell className="text-start text-sm text-gray-500 px-8">{order.cartProducts.map((product, index) => (
                <span key={index}>{product.menuItem.name + " x 1" }{index !== order.cartProducts.length - 1 && ", " }</span>
              ))}</TableCell>
              <TableCell><p className="whitespace-nowrap">{getReadableDateTime(order.createdAt)}</p></TableCell>
              <TableCell>
                {order.paid
                  ? <Chip className="capitalize" color='success' size="md" variant="flat">Paid</Chip>
                  : <Chip className="capitalize" color='danger' size="md" variant="flat">Not Paid</Chip>}
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="View order">
                    <Link className="text-lg text-primary-400 cursor-pointer active:opacity-50" href={`/orders/${order._id}`}>
                      <EyeFilledIcon className={"w-6"} />
                    </Link>
                  </Tooltip>
                  {!order.paid &&
                  <Tooltip content="Make a payment">
                    <Link className="text-lg text-primary-400 cursor-pointer active:opacity-50" href={`/orders/${order._id}`}>
                      <CreditCardIcon className={"w-6"} />
                    </Link>
                    </Tooltip>
                  }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No orders to display"}>{[]}</TableBody>
      )}
    </Table>
  )
}

export default OrdersTable