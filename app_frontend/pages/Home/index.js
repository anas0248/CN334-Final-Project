import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center  text-yellow-400 font-instrument">
      <Link href="/Home" className="text-3xl font-jaini hover:text-yellow-600">LOCONOMY</Link>
        <nav className="space-x-4">
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


    </>
  );
}