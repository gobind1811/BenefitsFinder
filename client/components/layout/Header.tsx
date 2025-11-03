import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";

const navLinkBase = "px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary hover:text-foreground transition";
const navDefault = "text-dark-muted";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-md">
            <Search size={16} />
          </span>
          <span className="text-bright-gradient">BenefitsFinder</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Welcome" },
            { to: "/questionnaire", label: "Questionnaire" },
            { to: "/results", label: "Results" },
            { to: "/resources", label: "Resources" },
            { to: "/feedback", label: "Feedback" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? "bg-primary text-white" : "text-foreground/80"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/login" className={({ isActive }) => `${navLinkBase} ${isActive ? "bg-primary text-white" : "text-foreground/80"}`}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
