import { NavLink } from "react-router-dom";

export default function Navbar() {
  const link = "px-3 py-2 rounded hover:bg-blue-50";
  const active = "text-blue-600 font-semibold";
  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="text-xl font-bold text-blue-700">V-Fácil</div>
        <div className="flex gap-2">
          <NavLink to="/" className={({isActive}) => `${link} ${isActive?active:""}`}>Home</NavLink>
          <NavLink to="/docs" className={({isActive}) => `${link} ${isActive?active:""}`}>Docs</NavLink>
          <NavLink to="/upload" className={({isActive}) => `${link} ${isActive?active:""}`}>Upload</NavLink>
          <NavLink to="/chat" className={({isActive}) => `${link} ${isActive?active:""}`}>Chat</NavLink>
          <NavLink to="/sobre" className={({isActive}) => `${link} ${isActive?active:""}`}>Sobre</NavLink>
        </div>
      </div>
    </nav>
  );
}
