
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบ token เมื่อ component โหลด
  useEffect(() => {
    const token = localStorage.getItem('jwt_access');
    setIsLoggedIn(!!token); // แปลงเป็น boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_access');
    localStorage.removeItem('jwt_refresh');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };
  return (
    <>
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
    <Link href="/login">
      <i className="fa-solid fa-user hover:text-yellow-700 duration-500"> ลงทะเบียน </i>
    </Link>
  )}
</nav>

    </header>
      <main className="relative h-screen w-full bg-cover bg-center font-instrument" style={{ backgroundImage: "url('1.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-[13rem] font-bold text-yellow-400 font-jaini">LOCONOMY</h1>
          <p className="text-3xl">Crafted with Heart, Rooted in Tradition</p>
          <Link href="/category" className="mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 hover:scale-105 duration-500 text-white rounded-full text-3xl shadow-lg">
            view products
          </Link>
        </div>
      </main>
      <Footer/>


    </>
  );
}