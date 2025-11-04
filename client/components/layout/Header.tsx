import { Link, NavLink, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { useI18n } from "../../lib/i18n";

const navLinkBase =
  "px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary hover:text-foreground transition";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const headerClass = isHome
    ? "sticky top-0 z-50 bg-black/40 backdrop-blur-sm"
    : "sticky top-0 z-50 bg-white/90 backdrop-blur border-b";
  const navDefault = isHome ? "text-white/95 drop-shadow-sm" : "text-black";

  return (
    <header className={headerClass}>
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full shadow-md ${isHome ? "bg-primary text-white" : "bg-white text-black border"}`}
          >
            <Search
              size={16}
              className={isHome ? "text-white" : "text-black"}
            />
          </span>
          <span
            className={isHome ? "text-white font-bold" : "text-black font-bold"}
          >
            BenefitFinder
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {[
            { to: "/", key: "nav.welcome" },
            { to: "/questionnaire", key: "nav.questionnaire" },
            { to: "/results", key: "nav.results" },
            { to: "/resources", key: "nav.resources" },
            { to: "/feedback", key: "nav.feedback" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? "bg-primary text-white" : navDefault}`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-primary text-white" : navDefault}`
            }
          >
            {t("nav.login")}
          </NavLink>

          {/* Language selector */}
          <div className="ml-2">
            <select
              aria-label="Language selector"
              defaultValue={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-sm text-white/90 border border-[rgba(255,255,255,0.06)] px-2 py-1 rounded-md"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
