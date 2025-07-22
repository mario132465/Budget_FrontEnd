type Props = {
  isOpen: boolean;
  type: "depense" | "revenu" | null;
  titre: string;
  montant: string;
  setTitre: (val: string) => void;
  setMontant: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function TransactionModal({
  isOpen,
  type,
  titre,
  montant,
  setTitre,
  setMontant,
  onSubmit,
  onCancel,
}: Props) {
  if (!isOpen || !type) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg min-w-[300px]">
        <h2 className="mb-4">Ajouter {type === "depense" ? "Dépense" : "Revenu"}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="titre" className="block mb-1 font-bold text-[#0b594a] text-sm">Titre</label>
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full p-2 mb-8 border border-gray-300 rounded text-sm"
            required
          />
          <label htmlFor="montant" className="block mb-1 font-bold text-[#0b594a] text-sm">Montant</label>
          <input
            id="montant"
            type="text"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="w-full p-2 mb-8 border border-gray-300 rounded text-sm"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-green-100 border border-green-300 rounded-full px-3 py-1 max-w-[150px] mt-5 shadow-sm text-green-800 font-bold cursor-pointer hover:bg-green-200">Valider</button>
            <button type="button" onClick={onCancel} className="bg-red-100 border border-red-300 rounded-full px-3 py-1 max-w-[150px] mt-5 shadow-sm text-red-800 font-bold cursor-pointer hover:bg-red-200">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
