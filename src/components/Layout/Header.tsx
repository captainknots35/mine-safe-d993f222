import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { 
  ShieldCheck, 
  User, 
  Settings, 
  LogOut, 
  Menu 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  userRole?: 'admin' | 'instructor' | 'miner';
  userName?: string;
}

export const Header = ({ userRole = 'miner', userName = 'John Doe' }: HeaderProps) => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    { to: "/dashboard", label: t('nav.dashboard'), show: true },
    { to: "/my-courses", label: t('nav.courses'), show: true },
    { to: "/blog", label: t('nav.blog'), show: true },
    { to: "/admin", label: t('nav.administration'), show: userRole === 'admin' },
    { to: "/instructor", label: t('nav.myClasses'), show: userRole === 'instructor' },
    { to: "/certificates", label: t('nav.certificates'), show: true },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary">{t('header.brand')}</span>
            <span className="text-xs text-muted-foreground">{t('header.tagline')}</span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.filter(link => link.show).map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher variant="minimal" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                {t('nav.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                {t('nav.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('nav.signOut')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>{t('nav.menu')}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.filter(link => link.show).map(link => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
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
  );
};
