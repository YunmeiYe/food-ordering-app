import { BarsIcon } from "@/icons/BarsIcon"
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon"
import { TagIcon } from "@/icons/TagIcon"
import { UserIcon } from "@/icons/UserIcon"
import { UsersIcon } from "@/icons/UsersIcon"
import { Tab, Tabs } from "@nextui-org/react"
import { usePathname } from "next/navigation"

interface UserTabsProps {
  admin: boolean;
}

const UserTabs = ({ admin }: UserTabsProps) => {
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col items-center">
      {admin && (
        <Tabs selectedKey={pathname} aria-label="Tabs" color="primary" variant="bordered" size="lg" radius="full">
          <Tab
            key="/profile"
            href="/profile"
            title={
              <div className="flex items-center space-x-2">
                <UserIcon className={"w-6"} />
                <span>Profile</span>
              </div>
            }
          />
          <Tab
            key="/categories"
            href="/categories"
            title={
              <div className="flex items-center space-x-2">
                <TagIcon className={"w-6"} />
                <span>Categories</span>
              </div>
            }
          />
          <Tab
            key={pathname.includes("/menu-items/new") ? "/menu-items/new" : (pathname.includes("/menu-items/edit") ? pathname : "/menu-items")}
            href="/menu-items"
            title={
              <div className="flex items-center space-x-2">
                <BarsIcon className={"w-6"} />
                <span>Menu Items</span>
              </div>
            }
          />
          <Tab
            key="/users"
            href="/users"
            title={
              <div className="flex items-center space-x-2">
                <UsersIcon className={"w-6"} />
                <span>Users</span>
              </div>
            }
          />
          <Tab
            key="/orders"
            href="/orders"
            title={
              <div className="flex items-center space-x-2">
                <ShoppingBagIcon className={"w-6"} />
                <span>Orders</span>
              </div>
            }
          />
        </Tabs>
      )}
    </div>
  )
}

export default UserTabs