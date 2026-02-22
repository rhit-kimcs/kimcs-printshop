import { Label } from "./ui/label";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  BadgeCheckIcon,
  LogOutIcon,
  SettingsIcon,
  User,
  UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export function AppHeader() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="min-h-14 mx-7 flex justify-between items-center">
        <Label className="text-2xl font-bold">Print and Copy Order Form</Label>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <span className="text-lg">Jessica Smith</span>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <Link to="/order#">
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    New Print Order
                  </DropdownMenuItem>
                </Link>
                <Link to="/user#">
                  <DropdownMenuItem>
                    <UserIcon />
                    User Settings
                  </DropdownMenuItem>
                </Link>
                <Link to="/templates">
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Print Order Templates
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
