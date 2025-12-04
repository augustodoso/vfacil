import logo from "../assets/aurevix_logo.png";

export default function Header() {
  return (
    <header className="w-full bg-aurevixBlack text-white py-4 shadow-aurevix">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        
        {/* Logo + Nome */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo Aurevix"
            className="h-10 w-10 object-contain rounded-lg"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-bold tracking-wider text-lg text-aurevixBlueLight">
              AUREVIX <span className="text-white">NFE</span>
            </span>
            <span className="text-xs text-gray-400">
              OCR Inteligente para Notas Fiscais
            </span>
          </div>
        </div>

        {/* Lado direito */}
        <span className="text-[11px] text-gray-500">
          Developer: <span className="text-aurevixBlue">augustodoso</span>
        </span>
      </div>
    </header>
  );
}
