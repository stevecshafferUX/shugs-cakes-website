import { Facebook, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full border-t bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; 2016 Shug's Cakes - All rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/shugscakes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/shugscakes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
