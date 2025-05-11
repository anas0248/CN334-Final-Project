// components/Header.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบ token เมื่อ component โหลด
  useEffect(() => {
    const token = localStorage.getItem('jwt_access');
    setIsLoggedIn(!!token); // แปลงเป็น boolean
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center bg-transparent text-yellow-400 font-instrument">
      <Link href="/Home" className="text-3xl font-jaini hover:text-yellow-600">LOCONOMY</Link>
      <nav className="space-x-4 flex items-center">
  <input
    type="text"
    placeholder="  Search"
    className="hidden md:inline-block bg-transparent border border-yellow-500 rounded-xl input w-24 md:w-auto placeholder-yellow-500 hover:border-yellow-500"
  />
  <Link href="/Home" className="hover:text-yellow-600 duration-500">HOME</Link>
  <Link href="/category" className="hover:text-yellow-600 duration-500">CATEGORY</Link>


  {isLoggedIn && (
    <>
      <Link href="/cart" className="text-2xl">
      <i className="fa-solid fa-bag-shopping hover:text-yellow-600 duration-500"></i>
    </Link>
    <Link href="/profile" className="text-2xl">
      <i className="fa-solid fa-user hover:text-yellow-600 duration-500"></i>
    </Link>
    </>
  )}

  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="text-2xl text-red-500 hover:text-red-600 duration-500"
    >
      <i className="fa-solid fa-right-from-bracket"></i>
    </button>
  ) : (
<Link href="/login" className="hover:text-yellow-600 duration-500 font-instrument">LOGIN</Link>
  )}
</nav>

    </header>
  );
}
