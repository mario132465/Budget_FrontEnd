
type Props = {
  totalRev: number;
  totalDep: number;
  solde: number;
};

export default function SummaryCards({ totalRev, totalDep, solde }: Props) {
  return (
    <section className="flex justify-center gap-5 my-5 max-w-4xl mx-auto flex-wrap">
      <div className="bg-white rounded-md shadow-md p-5 text-center w-48">
        <h3 className="mb-2 text-[#0b594a]">Revenus</h3>
        <p>{totalRev.toLocaleString()} F CFA</p>
      </div>
      <div className="bg-white rounded-md shadow-md p-5 text-center w-48">
        <h3 className="mb-2 text-[#0b594a]">Dépenses</h3>
        <p>{totalDep.toLocaleString()} F CFA</p>
      </div>
      <div className="bg-white rounded-md shadow-md p-5 text-center w-48">
        <h3 className="mb-2 text-[#0b594a]">Solde</h3>
        <p>{solde.toLocaleString()} F CFA</p>
      </div>
    </section>
  );
}
