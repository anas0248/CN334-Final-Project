import Header from "@/components/Header";
import Link from "next/link";

export default function Accessories() {
    return (<>
        <Header></Header>
        <main className="bg-[#fdf6ec]">
            <h1 className="text-5xl font-bold text-center text-[#8d4c2f]  mb-8">เครื่องประดับ</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-10">
                <Link href="/" className="hover:scale-105 duration-500">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                        <a href="1.png">
                            <img className="rounded-t-lg" src="../5-Photoroom.png" alt="" />
                        </a>
                        <div className="p-5 bg-[#D89C42] ">
                            <h5 className="mb-2 text-xl font-bold text-gray-900 text-center">ต่างหูแก้วคริสตัล</h5>
                            <h5 className="mb-2 text-xl font-bold text-gray-900 text-center">399 บาท</h5>
                        </div>
                    </div>
                </Link>
                
                

            </div>
        </main>

    </>
    );
}