// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center bg-transparent text-yellow-400 font-instrument">
    <div className="font-bold text-lg">LOCONOMY</div>
    <nav className="space-x-4">
    <input type="text" placeholder="  Search" className="bg-transparent border border-yellow-500 rounded-xl input w-24 md:w-auto placeholder-yellow-500 hover:border-yellow-500"  />
    <Link href="/Home" className="hover:underline">HOME</Link>
    <Link href="/category" className="hover:underline">CATEGORY</Link>
    <Link href="/basket" className="hover:underline">CART</Link>
    <Link href="/profile" className="hover:underline">PROFILE</Link>
    </nav>
  </header>
    
  );
}
