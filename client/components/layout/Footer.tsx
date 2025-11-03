export default function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <nav className="flex items-center gap-6">
          <a className="hover:text-foreground" href="#">Privacy Policy</a>
          <a className="hover:text-foreground" href="#">Terms of Service</a>
          <a className="hover:text-foreground" href="#">Contact Us</a>
        </nav>
        <p>© {new Date().getFullYear()} BenefitsFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
