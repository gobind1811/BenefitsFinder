import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const total = 4;
  const [form, setForm] = useState({ age: "", income: "", household: "", state: "", gender: "", occupation: "" });

  const canNext = useMemo(() => {
    if (step === 1) {
      return form.age !== "" && form.income !== "" && form.household !== "" && form.state !== "";
    }
    return true;
  }, [step, form]);

  const next = () => {
    if (step < total) setStep((s) => s + 1);
    else navigate("/results");
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <section className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Questionnaire</h2>
      </div>

      <div className="flex items-center gap-6 mb-10">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const active = n <= step;
          return (
            <div key={n} className="flex items-center gap-6">
              <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-medium border ${active ? "bg-primary text-white border-primary" : "bg-secondary text-foreground/70"}`}>{n}</div>
              {n !== total && <div className={`h-1 w-20 rounded ${n < step ? "bg-primary" : "bg-muted"}`}></div>}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <form className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-1">Please enter your age:</label>
            <p className="text-xs text-muted-foreground mb-2">Example: 30</p>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="Enter your age"
              className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Please enter your annual income:</label>
            <p className="text-xs text-muted-foreground mb-2">Example: ₹50,000</p>
            <input
              type="text"
              value={form.income}
              onChange={(e) => setForm({ ...form, income: e.target.value })}
              placeholder="Enter your income"
              className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Please enter your household size:</label>
            <p className="text-xs text-muted-foreground mb-2">Example: 4</p>
            <input
              type="number"
              value={form.household}
              onChange={(e) => setForm({ ...form, household: e.target.value })}
              placeholder="Enter household size"
              className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Please enter your state:</label>
            <p className="text-xs text-muted-foreground mb-2">Example: Punjab</p>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="Enter your state"
              className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>
      )}

      {step > 1 && (
        <div className="bg-accent/60 border rounded-md p-6 text-sm">This step is a placeholder. Continue to proceed to Results.</div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button onClick={prev} className="px-4 py-2 rounded-md border text-sm hover:bg-secondary">Previous</button>
        <button disabled={!canNext} onClick={next} className="px-5 py-2 rounded-md bg-primary text-white disabled:opacity-50">{step < total ? "Next" : "Finish"}</button>
      </div>
    </section>
  );
}
