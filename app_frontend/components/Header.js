// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
<header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center bg-transparent text-yellow-400 font-instrument">
  <Link href="/Home" className="text-3xl font-jaini hover:text-yellow-600">LOCONOMY</Link>
  <nav className="space-x-4 flex items-center">
    <input
      type="text"
      placeholder="  Search"
      className="hidden md:inline-block bg-transparent border border-yellow-500 rounded-xl input w-24 md:w-auto placeholder-yellow-500 hover:border-yellow-500"
    />
    <Link href="/Home" className=" hover:text-yellow-600 duration-500">HOME</Link>
    <Link href="/category" className="hover:text-yellow-600 duration-500">CATEGORY</Link>
    <Link href="/cart" className=" text-2xl"><i className="fa-solid fa-bag-shopping hover:text-yellow-600 duration-500"></i></Link>
    <Link href="/profile" className=" text-2xl"><i className="fa-solid fa-user hover:text-yellow-600 duration-500"></i></Link>
  </nav>
</header>

    
  );
}
