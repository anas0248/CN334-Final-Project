import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // สำหรับจัดการ Hamburger Menu
  const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

  // ตรวจสอบ token เมื่อ component โหลด
  useEffect(() => {
    const token = localStorage.getItem('jwt_access');
    if (token) {
      setIsLoggedIn(true);

      fetch(`${userApiUrl}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Profile Data:', data);
          setIsAdmin(data.is_staff); // ตรวจสอบว่าเป็น Admin หรือไม่
          console.log('Is Admin:', data.is_staff);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <>
    <header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center bg-transparent  text-yellow-400 font-instrument">
      <Link href="/Home" className="text-3xl font-jaini hover:text-yellow-600">LOCONOMY</Link>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`absolute md:static text-center items-center top-16 left-0 w-full md:w-auto bg-transparent bg-black/50 md:bg-transparent md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'
          }`}
      >
        <Link href="/Home" className="hover:text-yellow-600 duration-500 block md:inline">HOME</Link>
        <Link href="/category" className="hover:text-yellow-600 duration-500 block md:inline">CATEGORY</Link>

        {/* แสดง Dashboard เฉพาะ Admin */}
        {isAdmin && (
          <Link href="/dashboard" className="bg-[#ff8800] text-white p-1 rounded hover:bg-[#cc6f00] duration-300 block md:inline">
            DASHBOARD
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link href="/cart" className="text-2xl block md:inline">
              <i className="fa-solid fa-bag-shopping hover:text-yellow-600 duration-500">
                <span className="md:hidden text-sm ml-2">CART</span>
              </i>
              
            </Link>
            <Link href="/profile" className="text-2xl block md:inline ">
              <i className="fa-solid fa-user hover:text-yellow-600 duration-500" id="user-profile">
                <span className="md:hidden text-sm ml-2">PROFILE</span>
              </i>
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-2xl text-red-500 hover:text-red-600 duration-500 self-end md:self-auto"
            id="logout-button"
          >
            <i className="fa-solid fa-right-from-bracket">
              <span className="md:hidden text-sm ml-2">LOGOUT</span>
            </i>
          </button>
        ) : (
          <Link href="/login" className="hover:text-yellow-600 duration-500 font-instrument block md:inline">
            LOGIN
          </Link>
        )}
      </nav>
    </header>

      <main className="relative h-screen w-full bg-cover bg-center font-instrument" style={{ backgroundImage: "url('1.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

          {/* Welcome Admin */}
          {isAdmin && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 animate-fadeInUp mb-4">
              Welcome, Admin
            </h1>
          )}

          {/* LOCONOMY */}
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] font-bold text-yellow-400 font-jaini animate-fadeInUp">
            LOCONOMY
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fadeInUp">
            Crafted with Heart, Rooted in Tradition
          </p>

          {/* View Products Button */}
          <Link
            href="/category"
            className="mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 hover:scale-105 transition-transform duration-500 text-white rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg animate-fadeInUp"
          >
            View Products
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}