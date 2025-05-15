// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">pages/index.js</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }

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
      <Link href="/" className="text-3xl font-jaini hover:text-yellow-600">LOCONOMY</Link>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`absolute md:static text-center items-center top-16 left-0 w-full md:w-auto bg-black/60 md:bg-transparent md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'
          }`}
      >
        <Link href="/" className="hover:text-yellow-600 duration-500 block md:inline">HOME</Link>
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
    </>
  );
}