import { Link } from "react-router-dom";

const programs = [
  {
    id: "healthcare",
    title: "Healthcare Assistance",
    desc: "Provides financial aid for medical expenses. Eligible for families with low income.",
  },
  {
    id: "housing",
    title: "Housing Support",
    desc: "Assistance for rental costs. Eligible for individuals facing housing instability.",
  },
  {
    id: "education",
    title: "Educational Grants",
    desc: "Financial aid for educational expenses. Eligible for students from low-income families.",
  },
];

export default function Results() {
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Eligible Public-Aid Programs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {programs.map((p) => (
          <div key={p.id} className="bg-white rounded-md shadow p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            </div>
            <div>
              <Link to={`/resources/${p.id}`} className="inline-block w-full text-center px-4 py-2 bg-primary text-white rounded shadow-sm hover:opacity-95">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/questionnaire" className="block w-full text-center px-4 py-3 bg-primary text-white rounded-md shadow">Start a New Search</Link>
      </div>
    </section>
  );
}
