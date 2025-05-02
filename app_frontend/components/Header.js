// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#FFF4E5] text-black p-4 flex justify-between items-center">
      <h1 className="text-xl  color-[#C7964E] font-bold">
        <Link href="/">LOCONOMY</Link>
      </h1>
      <nav className="space-x-4">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <Link href="/X" className='color-[#C7964E]'>HOME</Link>
        <Link href="/Catagory" className='color-[#C7964E]'>CATEGORY</Link>
      </nav>
    </header>
  );
}
