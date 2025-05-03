import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center  text-yellow-400 font-instrument">
        <div className="font-bold text-lg">LOCONOMY</div>
        <nav className="space-x-4">
          <input type="text" placeholder="  Search" className="bg-transparent border border-yellow-500 rounded-xl input w-24 md:w-auto placeholder-yellow-500 hover:border-yellow-500" />
          <Link href="/Home" className="hover:underline">HOME</Link>
          <Link href="/category" className="hover:underline">CATEGORY</Link>
          <Link href="/Basket" className="hover:underline">CART</Link>
          <Link href="/profile" className="hover:underline">PROFILE</Link>
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