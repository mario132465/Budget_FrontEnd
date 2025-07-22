import { useState, useEffect } from "react";
import SummaryCards from "./components/BudgetSummary";
import TransactionTable from "./components/TransactionList";
import TransactionModal from "./components/TransactionModal";

type Transaction = {
  id: number;
  titre: string;
  montant: number;
};

export default function App() {
  const [depenses, setDepenses] = useState<Transaction[]>([]);
  const [revenus, setRevenus] = useState<Transaction[]>([]);
  const [modalOpen, setModalOpen] = useState<"depense" | "revenu" | null>(null);
  const [formTitre, setFormTitre] = useState("");
  const [formMontant, setFormMontant] = useState("");

  // Charger depuis l'API
  useEffect(() => {
    fetch("http://localhost:3000/depenses", {method:"GET"})
      .then(res => res.json())
      .then(data => setDepenses(data)).catch(console.log);

    fetch("http://localhost:3000/revenus")
      .then(res => res.json())
      .then(data => setRevenus(data)).catch(console.log);
  }, []);

  const totalDep = depenses.reduce((acc, d) => acc + d.montant, 0);
  const totalRev = revenus.reduce((acc, r) => acc + r.montant, 0);
  const solde = totalRev - totalDep;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const montantNum = parseInt(formMontant.replace(/[^\d]/g, ""), 10);
    if (!formTitre.trim() || isNaN(montantNum)) return alert("Champs invalides");

    const data = { titre: formTitre.trim(), montant: montantNum };

    if (modalOpen === "depense") {
      fetch("http://localhost:3000/depenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(newItem => setDepenses([...depenses, newItem]));
    } else if (modalOpen === "revenu") {
      fetch("http://localhost:3000/revenus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(newItem => setRevenus([...revenus, newItem]));
    }

    setFormTitre("");
    setFormMontant("");
    setModalOpen(null);
  }

  function supprimer(cle: "depenses" | "revenus", index: number) {
    const item = cle === "depenses" ? depenses[index] : revenus[index];

    fetch(`http://localhost:3000/${cle}/${item.id}`, {
      method: "DELETE",
    }).then(() => {
      if (cle === "depenses") {
        setDepenses(depenses.filter((_, i) => i !== index));
      } else {
        setRevenus(revenus.filter((_, i) => i !== index));
      }
    });
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 text-sm font-sans">
      <header className="text-center py-5">
        <h1>
          <span className="text-[#0b594a] font-bold text-2xl">B</span>
          <span className="text-[#f5b700] font-bold text-2xl">UDGET</span>
        </h1>
        <h2>Gestion de budget</h2>
      </header>

      <SummaryCards totalRev={totalRev} totalDep={totalDep} solde={solde} />

      <TransactionTable
        transactions={depenses}
        type="depenses"
        onDelete={supprimer}
        onAddClick={() => setModalOpen("depense")}
      />

      <TransactionTable
        transactions={revenus}
        type="revenus"
        onDelete={supprimer}
        onAddClick={() => setModalOpen("revenu")}
      />

      <TransactionModal
        isOpen={!!modalOpen}
        type={modalOpen}
        titre={formTitre}
        montant={formMontant}
        setTitre={setFormTitre}
        setMontant={setFormMontant}
        onSubmit={handleSubmit}
        onCancel={() => setModalOpen(null)}
      />
    </div>
  );
}
