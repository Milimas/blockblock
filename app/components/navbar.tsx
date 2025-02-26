"use client";

import * as React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./dark-mode-toggle";
import Link from "next/link";

export function NavBar() {
    return (
        <div className="w-full flex items-center justify-between px-8">
            <NavigationMenu className="p-4">
                <NavigationMenuList className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4 w-full">

                        <NavigationMenuItem>
                            <Link href="/" className="text-lg font-semibold">Home</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/blocks" className="text-lg font-semibold">Blocks</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/transactions" className="text-lg font-semibold">Transactions</Link>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
        </div>
    );
}

