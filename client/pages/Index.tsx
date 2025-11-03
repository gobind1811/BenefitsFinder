import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Index() {
  return (
    <section className="relative min-h-screen flex items-center text-center overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-accent/5 to-white"></div>
      <svg className="absolute -left-40 -top-40 w-[600px] opacity-40 -z-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(123, 31, 162, 0.85)" />
            <stop offset="100%" stopColor="rgba(103, 58, 183, 0.6)" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="260" fill="url(#g1)" />
      </svg>

      <div className="container relative z-10 py-24 flex flex-col items-center justify-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 text-white ring-1 ring-white/20 shadow-lg">
          <Search size={36} />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-bright-gradient drop-shadow-md">BenefitsFinder</h1>

        <p className="mt-4 max-w-3xl text-white/90 text-lg md:text-xl">
          Discover eligible public-aid programs quickly and easily with BenefitsFinder. Our service
          guides you through the process to ensure you get the support you need.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to="/questionnaire" className="inline-flex items-center px-6 py-3 rounded-md bg-white text-primary font-semibold hover:opacity-95 shadow-lg">
            Start Now
          </Link>
          <a href="#resources" className="inline-flex items-center px-6 py-3 rounded-md border border-white/30 text-white hover:bg-white/5">Learn more</a>
        </div>
      </div>
    </section>
  );
}
