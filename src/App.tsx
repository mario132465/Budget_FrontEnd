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

  // Fonction pour charger les données
  const fetchData = () => {
    fetch("https://budget-backend-rpbe.onrender.com/depenses")
      .then(res => res.json())
      .then(data => setDepenses(data))
      .catch(err => console.error("Erreur fetch depenses:", err));

    fetch("https://budget-backend-rpbe.onrender.com/revenus")
      .then(res => res.json())
      .then(data => setRevenus(data))
      .catch(err => console.error("Erreur fetch revenus:", err));
  };

  // Charger les données au montage
  useEffect(() => {
    fetchData();
  }, []);

  const totalDep = depenses.reduce((acc, d) => acc + d.montant, 0);
  const totalRev = revenus.reduce((acc, r) => acc + r.montant, 0);
  const solde = totalRev - totalDep;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const montantNum = parseInt(formMontant.replace(/[^\d]/g, ""), 10);
    if (!formTitre.trim() || isNaN(montantNum)) return alert("Champs invalides");

    const data = { titre: formTitre.trim(), montant: montantNum };

    let url = "";
    if (modalOpen === "depense") {
      url = "https://budget-backend-rpbe.onrender.com/depenses";
    } else if (modalOpen === "revenu") {
      url = "https://budget-backend-rpbe.onrender.com/revenus";
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP! status: ${res.status}`);
        return res.json();
      })
      .then(() => {
        fetchData(); // recharge les données après ajout
      })
      .catch(err => {
        console.error("Erreur POST:", err);
        alert("Une erreur est survenue lors de l'ajout");
      });

    setFormTitre("");
    setFormMontant("");
    setModalOpen(null);
  }

  function supprimer(cle: "depenses" | "revenus", index: number) {
    const item = cle === "depenses" ? depenses[index] : revenus[index];

    fetch(`https://budget-backend-rpbe.onrender.com/${cle}/${item.id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP! status: ${res.status}`);
        fetchData(); // recharge les données après suppression
      })
      .catch(err => {
        console.error("Erreur DELETE:", err);
        alert("Une erreur est survenue lors de la suppression");
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
