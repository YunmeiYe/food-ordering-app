import { MenuIcon } from "@/icons/MenuIcon"
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon"
import { TagIcon } from "@/icons/TagIcon"
import { UserIcon } from "@/icons/UserIcon"
import { UsersIcon } from "@/icons/UsersIcon"
import { Button, Link } from "@nextui-org/react"
import { usePathname } from "next/navigation"

interface UserTabsProps {
  admin: boolean
  className?: string
}

const UserTabs = ({ admin, className }: UserTabsProps) => {
  const pathname = usePathname();
  const activeTabStyle = "bg-primary text-dark border-white"
  const inactiveTabStyle = "bg-dark border-primary text-primary hover:bg-primary hover:text-dark hover:border-white"

  return (
    <div className={`w-full flex justify-center items-center gap-6 ${className}`}>
      <Button
        as={Link}
        fullWidth
        radius="full"
        href="/profile"
        startContent={<UserIcon className={"w-6 stroke-2"} />}
        className={`border-2 font-semibold ${pathname.includes("/profile") ? activeTabStyle : inactiveTabStyle}`}>
        Profile
      </Button>
      <Button
        as={Link}
        fullWidth
        radius="full"
        href="/orders"
        startContent={<ShoppingBagIcon className={"w-6 stroke-2"} />}
        className={`border-2 font-semibold ${pathname.includes("/orders") ? activeTabStyle : inactiveTabStyle}`}>
        Orders
      </Button>
      {admin && (
        <>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/categories"
            startContent={<TagIcon className={"w-6 stroke-2"} />}
            className={`border-2 font-semibold ${pathname.includes("/categories") ? activeTabStyle : inactiveTabStyle}`}>
            Categories
          </Button>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/menu-items"
            startContent={<MenuIcon className={"w-6 stroke-2"} />}
            className={`border-2 ${pathname.includes("/menu-items") ? activeTabStyle : inactiveTabStyle}`}>
            Menu Items
          </Button>
          <Button
            as={Link}
            fullWidth
            radius="full"
            href="/users"
            startContent={<UsersIcon className={"w-6 stroke-2"} />}
            className={`border-2 ${pathname.includes("/users") ? activeTabStyle : inactiveTabStyle}`}>
            Users
          </Button>
        </>
      )}
    </div>
  )
}

export default UserTabs