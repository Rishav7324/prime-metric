'use client';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "/all-calculators", label: "All Calculators" },
  { href: "/all-tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <div className="sticky top-2 z-50 w-full px-3 sm:px-4">
    <header className="mx-auto max-w-6xl rounded-2xl border border-neutral-200/80 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="flex h-13 max-w-6xl items-center px-3 sm:px-4 py-2">
        <div className="mr-4 flex">
          <Link href="/" className="mr-5 flex items-center space-x-2">
            <Image src="/logo.png" alt="PrimeMetric Logo" width={28} height={28} priority />
            <span className="font-bold sm:inline-block text-base text-black">
              PrimeMetric
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black font-medium h-9 text-sm">Calculators</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-3 md:w-[500px] md:grid-cols-2 lg:w-[560px] bg-white">
                      <ListItem href="/financial-calculators" title="Financial Calculators">
                        Mortgage, loan, and investment calculators.
                      </ListItem>
                      <ListItem href="/health-calculators" title="Health Calculators">
                        BMI, BMR, and other health-related calculators.
                      </ListItem>
                      <ListItem href="/math-calculators" title="Math Calculators">
                        From basic arithmetic to complex algebra.
                      </ListItem>
                      <ListItem href="/other-calculators" title="Other Calculators">
                        A variety of other useful calculators.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href} className="text-black/70 hover:text-[#F2765E] font-medium text-sm px-2">
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
                <SheetHeader>
                    <SheetTitle>
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <Image src="/logo.png" alt="PrimeMetric Logo" width={28} height={28} />
                            <span className="font-bold sm:inline-block text-base text-black">
                            PrimeMetric
                            </span>
                        </Link>
                    </SheetTitle>
                    <SheetDescription className="text-sm text-neutral-600">
                        From financial planning to health metrics - fast calculators with instant results.
                    </SheetDescription>
                </SheetHeader>
              <nav className="grid gap-4 text-base font-medium mt-6">
                 <Link href="/financial-calculators" className="px-2.5 text-black/70 hover:text-[#F2765E]">Financial</Link>
                 <Link href="/health-calculators" className="px-2.5 text-black/70 hover:text-[#F2765E]">Health</Link>
                 <Link href="/math-calculators" className="px-2.5 text-black/70 hover:text-[#F2765E]">Math</Link>
                 <Link href="/other-calculators" className="px-2.5 text-black/70 hover:text-[#F2765E]">Daily Utilities</Link>
                  {navLinks.map((link) => (
                   <Link
                     key={link.href}
                     href={link.href}
                     className="flex items-center gap-4 px-2.5 text-black/70 hover:text-[#F2765E]"
                   >
                     {link.label}
                   </Link>
                 ))}
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        
      </div>
    </header>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-[#FFF5F2] focus:bg-[#FFF5F2]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-black">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-600">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
