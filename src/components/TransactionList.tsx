type Transaction = {
  titre: string;
  montant: number;
};

type Props = {
  transactions: Transaction[];
  type: "depenses" | "revenus";
  onDelete: (type: "depenses" | "revenus", index: number) => void;
  onAddClick: () => void;
};

export default function TransactionTable({
  transactions,
  type,
  onDelete,
  onAddClick,
}: Props) {
  const isDepense = type === "depenses";
  return (
    <section className="max-w-4xl mx-auto my-10">
      <h2 className="text-[#0b594a] text-lg">
        Liste des {isDepense ? "dépenses" : "revenus"}
      </h2>
      <table className="w-full border-collapse mt-4 table-fixed">
        <thead className="bg-[#0b594a] text-white">
          <tr>
            <th className="px-3 py-3 border border-gray-300 text-left font-bold">Titre</th>
            <th className="px-3 py-3 border border-gray-300 text-left font-bold">Montant</th>
            <th className="px-3 py-3 border border-gray-300 text-left font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="px-3 py-2 border border-gray-300">{t.titre}</td>
              <td className="px-3 py-2 border border-gray-300">{t.montant.toLocaleString()} F CFA</td>
              <td className="px-3 py-2 border border-gray-300">
                <button
                  onClick={() => onDelete(type, i)}
                  className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer transition-colors duration-300 hover:bg-red-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onAddClick}
        className="bg-green-100 border border-green-300 rounded-full px-3 py-1 mt-5 shadow-sm text-base cursor-pointer"
      >
        + Ajouter {isDepense ? "dépense" : "revenu"}
      </button>
    </section>
  );
}
