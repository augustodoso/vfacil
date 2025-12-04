export default function Card({ children }) {
  return (
    <div className="bg-aurevixDark border border-aurevixBorder shadow-aurevix rounded-xl p-6 w-full max-w-xl mx-auto mt-10 text-white">
      {children}
    </div>
  );
}
