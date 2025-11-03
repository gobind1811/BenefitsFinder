import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Wallet, Users, MapPin, User, Briefcase, Home, ClipboardList } from "lucide-react";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const total = 5;
  const [form, setForm] = useState({
    age: "",
    income: "",
    household: "",
    state: "",
    gender: "",
    occupation: "",
    maritalStatus: "",
    dependents: "",
    education: "",
    disability: "",
    housing: "",
    benefits: [] as string[],
  });

  const toggleBenefit = (value: string) => {
    setForm((f) => {
      const has = f.benefits.includes(value);
      return { ...f, benefits: has ? f.benefits.filter((b) => b !== value) : [...f.benefits, value] };
    });
  };

  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return (
          form.age !== "" &&
          form.income !== "" &&
          form.household !== "" &&
          form.state !== "" &&
          form.gender !== "" &&
          form.occupation !== ""
        );
      case 2:
        return form.maritalStatus !== "" && form.dependents !== "";
      case 3:
        return form.education !== "" && form.disability !== "";
      case 4:
        return form.housing !== ""; // benefits optional
      default:
        return true;
    }
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

      <div className="flex items-center gap-6 mb-10 bg-black/90 p-4 rounded-md justify-center">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const active = n <= step;
          return (
            <div key={n} className="flex items-center gap-6">
              <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-medium ${active ? "bg-primary text-white border border-primary" : "bg-black text-white border border-white/20"}`}>{n}</div>
              {n !== total && <div className={`h-1 w-20 rounded ${n < step ? "bg-primary" : "bg-white/30"}`}></div>}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div className="grid gap-6">
          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-sky-50 rounded-md p-3 md:p-4">
              <Calendar className="text-sky-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Please enter your age:</label>
              <p className="text-xs text-muted-foreground mb-2">Example: 30</p>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="Enter your age"
                className="w-full h-12 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </div>

          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-emerald-50 rounded-md p-3 md:p-4">
              <Wallet className="text-emerald-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Please enter your annual income:</label>
              <p className="text-xs text-muted-foreground mb-2">Example: ₹50,000</p>
              <input
                type="text"
                value={form.income}
                onChange={(e) => setForm({ ...form, income: e.target.value })}
                placeholder="Enter your income"
                className="w-full h-12 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
          </div>

          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-violet-50 rounded-md p-3 md:p-4">
              <Users className="text-violet-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Please enter your household size:</label>
              <p className="text-xs text-muted-foreground mb-2">Example: 4</p>
              <input
                type="number"
                value={form.household}
                onChange={(e) => setForm({ ...form, household: e.target.value })}
                placeholder="Enter household size"
                className="w-full h-12 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </div>

          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-sky-50 rounded-md p-3 md:p-4">
              <User className="text-sky-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <p className="text-xs text-muted-foreground mb-2">Select your gender</p>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full h-12 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-emerald-50 rounded-md p-3 md:p-4">
              <Briefcase className="text-emerald-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Occupation</label>
              <p className="text-xs text-muted-foreground mb-2">Select your occupation</p>
              <select
                value={form.occupation}
                onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                className="w-full h-12 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <option value="">Select occupation</option>
                <option value="employed">Employed</option>
                <option value="self_employed">Self-employed</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="homemaker">Homemaker</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="card fade-in grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center justify-center bg-sky-50 rounded-md p-3 md:p-4">
              <MapPin className="text-sky-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Please enter your state:</label>
              <p className="text-xs text-muted-foreground mb-2">Example: Punjab</p>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="Enter your state"
                className="w-full h-12 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Marital status</label>
            <p className="text-xs text-muted-foreground mb-2">Select your marital status</p>
            <select
              value={form.maritalStatus}
              onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
              className="w-full h-11 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of dependents</label>
            <p className="text-xs text-muted-foreground mb-2">Example: 2</p>
            <input
              type="number"
              value={form.dependents}
              onChange={(e) => setForm({ ...form, dependents: e.target.value })}
              placeholder="Enter number of dependents"
              className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Education level</label>
            <p className="text-xs text-muted-foreground mb-2">Select highest education level</p>
            <select
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              className="w-full h-11 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select</option>
              <option value="no_formal">No formal education</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="higher_secondary">Higher Secondary</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Disability status</label>
            <p className="text-xs text-muted-foreground mb-2">Do you identify as having a disability?</p>
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2"><input type="radio" name="disability" checked={form.disability === "no"} onChange={() => setForm({ ...form, disability: "no" })} /> No</label>
              <label className="inline-flex items-center gap-2"><input type="radio" name="disability" checked={form.disability === "yes"} onChange={() => setForm({ ...form, disability: "yes" })} /> Yes</label>
              <label className="inline-flex items-center gap-2"><input type="radio" name="disability" checked={form.disability === "prefer_not"} onChange={() => setForm({ ...form, disability: "prefer_not" })} /> Prefer not to say</label>
            </div>
          </div>
        </form>
      )}

      {step === 4 && (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Current housing</label>
            <p className="text-xs text-muted-foreground mb-2">Select your current housing situation</p>
            <select
              value={form.housing}
              onChange={(e) => setForm({ ...form, housing: e.target.value })}
              className="w-full h-11 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select</option>
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="shelter">Shelter</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Receiving benefits</label>
            <p className="text-xs text-muted-foreground mb-2">Select any public benefits you already receive</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { key: "healthcare", label: "Healthcare Assistance" },
                { key: "housing", label: "Housing Support" },
                { key: "food", label: "Food Assistance" },
                { key: "education", label: "Educational Grants" },
              ].map((b) => (
                <label key={b.key} className="inline-flex items-center gap-2 border rounded px-3 py-2">
                  <input type="checkbox" checked={form.benefits.includes(b.key)} onChange={() => toggleBenefit(b.key)} />
                  <span className="ml-2">{b.label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      )}

      {step === 5 && (
        <div className="bg-accent/60 border rounded-md p-6 text-sm">
          <h3 className="text-lg font-semibold mb-3">Please recheck your answers</h3>
          <p className="mb-4">Review the information below and go back to edit any answer before confirming.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium">Age</div>
              <div>{form.age || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Income</div>
              <div>{form.income || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Household Size</div>
              <div>{form.household || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">State</div>
              <div>{form.state || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Gender</div>
              <div>{form.gender || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Occupation</div>
              <div>{form.occupation || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Marital Status</div>
              <div>{form.maritalStatus || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Dependents</div>
              <div>{form.dependents || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Education</div>
              <div>{form.education || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Disability</div>
              <div>{form.disability || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Housing</div>
              <div>{form.housing || "—"}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Receiving benefits</div>
              <div>{form.benefits.length ? form.benefits.join(", ") : "None"}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        {step === 5 ? (
          <>
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-md border text-sm hover:bg-secondary">Edit Answers</button>
            <button onClick={() => navigate('/results')} className="px-5 py-2 rounded-md bg-primary text-white">Confirm & Finish</button>
          </>
        ) : (
          <>
            <button onClick={prev} className="px-4 py-2 rounded-md border text-sm hover:bg-secondary">Previous</button>
            <button disabled={!canNext} onClick={next} className="px-5 py-2 rounded-md bg-primary text-white disabled:opacity-50">{step < total ? "Next" : "Finish"}</button>
          </>
        )}
      </div>
    </section>
  );
}
