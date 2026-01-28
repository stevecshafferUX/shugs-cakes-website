import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

function Header() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">Shug's Cakes</h1>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Welcome
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Cake Gallery
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuItem asChild>
                <Link to="/gallery/birthdays" className="cursor-pointer">
                  Birthday Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/kids-birthday" className="cursor-pointer">
                  Kids Birthday Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/first-birthday" className="cursor-pointer">
                  1st Birthday Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/smash-cakes" className="cursor-pointer">
                  Smash Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/graduation" className="cursor-pointer">
                  Graduation Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/bridal-shower" className="cursor-pointer">
                  Bridal Shower & Engagement
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/anniversary" className="cursor-pointer">
                  Anniversary Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/religious" className="cursor-pointer">
                  Religious Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/holiday" className="cursor-pointer">
                  Holiday Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/fun-cakes" className="cursor-pointer">
                  Fun Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/3d-cakes" className="cursor-pointer">
                  3D Cakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/cupcakes" className="cursor-pointer">
                  Cupcakes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/gallery/cookies" className="cursor-pointer">
                  Cookies
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>

          <Link
            to="/flavors"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Cake Flavors
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>

          <Link
            to="/order"
            className="text-sm font-medium text-primary-foreground bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Order Form
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.user_metadata?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/my-orders" className="cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer">
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login or Sign Up
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Welcome
              </Link>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Cake Gallery</p>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/gallery/birthdays"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Birthday Cakes
                  </Link>
                  <Link
                    to="/gallery/kids-birthday"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kids Birthday Cakes
                  </Link>
                  <Link
                    to="/gallery/first-birthday"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    1st Birthday Cakes
                  </Link>
                  <Link
                    to="/gallery/smash-cakes"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Smash Cakes
                  </Link>
                  <Link
                    to="/gallery/graduation"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Graduation Cakes
                  </Link>
                  <Link
                    to="/gallery/bridal-shower"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bridal Shower & Engagement
                  </Link>
                  <Link
                    to="/gallery/anniversary"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Anniversary Cakes
                  </Link>
                  <Link
                    to="/gallery/religious"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Religious Cakes
                  </Link>
                  <Link
                    to="/gallery/holiday"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Holiday Cakes
                  </Link>
                  <Link
                    to="/gallery/fun-cakes"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fun Cakes
                  </Link>
                  <Link
                    to="/gallery/3d-cakes"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    3D Cakes
                  </Link>
                  <Link
                    to="/gallery/cupcakes"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cupcakes
                  </Link>
                  <Link
                    to="/gallery/cookies"
                    className="block text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cookies
                  </Link>
                </div>
              </div>

              <Link
                to="/pricing"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              <Link
                to="/flavors"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cake Flavors
              </Link>

              <Link
                to="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Link
                to="/order"
                className="text-sm font-medium text-primary-foreground bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Form
              </Link>

              {user ? (
                <>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  <Link
                    to="/my-orders"
                    className="text-sm transition-colors hover:text-primary pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/account"
                    className="text-sm transition-colors hover:text-primary pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm text-destructive hover:text-destructive/90 flex items-center gap-2 pl-4"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login or Sign Up
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
