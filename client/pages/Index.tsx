import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Index() {
  return (
    <section className="container flex flex-col items-center justify-center text-center py-24">
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
        <Search size={36} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-bright-gradient">BenefitsFinder</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Discover eligible public-aid programs quickly and easily with BenefitsFinder. Our service
        guides you through the process to ensure you get the support you need.
      </p>
      <div className="mt-8">
        <Link to="/questionnaire" className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 shadow">
          Start Now
        </Link>
      </div>
    </section>
  );
}
