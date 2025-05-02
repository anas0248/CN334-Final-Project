import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Category() {
    return (
        <>
            <Header></Header>
            <section className="p-10 bg-[#fdf6ec] min-h-screen">
                <h2 className="text-4xl font-bold text-center text-[#8d4c2f] my-10">หมวดหมู่สินค้า</h2>
                <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">

                    {/* จักสาน */}
                    <Link href="/" className="bg-[#d4a276] text-white rounded-2xl p-4 shadow-md col-span-3 row-span-1 flex flex-col justify-between hover:scale-105 duration-500">
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-7xl font-bold text-center">จักสาน</p>
                            <img src="3.png" alt="จักสาน" className="w-1/6 h-auto" />
                        </div>
                    </Link>


                    {/* เครื่องปั้นดินเผา */}
                    <Link href="/" className="bg-[#c38e4d] text-white rounded-2xl p-4 shadow-md row-span-2 flex flex-col justify-between hover:scale-105 duration-500">
                        <div>
                            <p className="text-4xl font-bold">เครื่องปั้นดินเผา</p>
                            <img src="7.png" alt="เครื่องปั้น" className="w-full self-end" />
                        </div>
                    </Link>

                    {/* สิ่งทอ */}
                    <Link href="/" className="bg-[#f5d5c5] text-white rounded-2xl p-4 row-span-2 shadow-md hover:scale-105 duration-500">
                        <div >
                            <p className="text-7xl font-bold mt-2">สิ่งทอ</p>
                            <img src="2-Photoroom.png" alt="สิ่งทอ" className="w-full mt-4" />
                        </div>
                    </Link>

                    {/* เครื่องประดับ */}
                    <Link href="/category/accessories" className="bg-[#9c6733] text-white rounded-2xl col-span-2 p-4 shadow-md hover:scale-105 duration-500">
                        <div className="flex justify-center gap-4 items-center">
                            <p className="text-6xl font-bold">เครื่องประดับ</p>
                            <img src="5-Photoroom.png" alt="เครื่องประดับ" className="w-1/2 self-end " />
                        </div>
                    </Link>

                    {/* ย่อย 3 ช่องเล็ก */}
                    <div className="col-span-1 grid grid-cols-2 gap-10">
                        <Link href="/" className="bg-[#FFF3D9] rounded-xl p-2 shadow text-center hover:scale-105 duration-500">
                            <div >
                                <p className="text-3xl text-black">กะลาพร้าว</p>
                                <img src="10-Photoroom.png" className="w-full mx-auto" />
                            </div>
                        </Link>
                        <Link href="/" className="bg-[#754600] rounded-xl p-2 shadow text-center hover:scale-105 duration-500">
                            <div>
                                <p className="text-3xl">หัตถกรรมไม้</p>
                                <img src="8-Photoroom.png" className="w-full mx-auto" />
                            </div>
                        </Link>
                    </div>

                    {/* สมุนไพร */}
                    <Link href="/" className="  bg-[#e3bba3] text-white rounded-2xl p-4 shadow-md col-span-2 flex flex-col justify-between hover:scale-105 duration-500 ">
                        <div className="flex justify-between">
                            <p className="font-bold text-6xl ">สมุนไพร<br />เครื่องหอม</p>
                            <img src="9-Photoroom.png" alt="สมุนไพร" className="w-1/4 mx-auto self-end" />
                        </div>
                    </Link>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}