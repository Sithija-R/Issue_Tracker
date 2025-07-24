import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Settings, User, Bug } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "./ThemeToggle";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky bg-gradientcard1/60   top-0 z-50 w-full border-b border-border/50 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
              <Bug className="h-4 w-4 " />
            </div>
            <h1 className="text-xl font-bold  bg-gradient-to-r from-gradient1 to-gradient2 bg-clip-text text-transparent  ">
              IssueTracker
            </h1>
          </div>

          {/* <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-sm font-medium"
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/issues")}
              className="text-sm font-medium"
            >
              Issues
            </Button>
          </nav> */}
        </div>

        <div className="flex items-center space-x-3">
     

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-lg bg-card/50 border border-border/50 hover:bg-accent/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-gradient1 to-gradient2  text-primary-foreground text-xs font-medium"> S</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-popover/80 backdrop-blur-glass border-border/50"
              align="end"
            >
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">name</p>
                  <p className="text-xs text-muted-foreground">mail</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
