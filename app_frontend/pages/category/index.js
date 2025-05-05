import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Category() {
    return (
        <>
            <Header></Header>
            
            {/* <h1 className=" text-center text-black mt-20 text-7xl items-center justify-center">หมวดหมู่</h1> */}
            <section className="p-6 sm:p-8 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">

    {/* จักสาน */}
    <Link href="/category/basketry" className="bg-[#d4a276] text-white rounded-2xl p-4 shadow-md lg:col-span-3 flex flex-col justify-between hover:scale-105 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-4xl sm:text-6xl setData text-center">จักสาน</p>
        <img src="3.png" alt="จักสาน" className="w-1/3 sm:w-1/6 h-auto" />
      </div>
    </Link>

    {/* เครื่องปั้นดินเผา */}
    <Link href="/category/earthenware" className="bg-[#c38e4d] text-white rounded-2xl p-4 shadow-md row-span-2 flex flex-col justify-between hover:scale-105 duration-500">
      <div>
        <p className="text-3xl sm:text-4xl setData">เครื่องปั้นดินเผา</p>
        <img src="7.png" alt="เครื่องปั้น" className="w-full mt-4" />
      </div>
    </Link>

    {/* สิ่งทอ */}
    <Link href="/category/textiles" className="bg-[#f5d5c5] text-white rounded-2xl p-4 shadow-md row-span-2 hover:scale-105 duration-500">
      <div>
        <p className="text-4xl sm:text-6xl setData mt-2">สิ่งทอ</p>
        <img src="2-Photoroom.png" alt="สิ่งทอ" className="w-full mt-4" />
      </div>
    </Link>

    {/* เครื่องประดับ */}
    <Link href="/category/accessories" className="bg-[#9c6733] text-white rounded-2xl p-4 shadow-md lg:col-span-2 hover:scale-105 duration-500">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <p className="text-3xl sm:text-5xl setData">เครื่องประดับ</p>
        <img src="5-Photoroom.png" alt="เครื่องประดับ" className="w-2/3 sm:w-1/2" />
      </div>
    </Link>

    {/* กลุ่มย่อย 2 ช่อง */}
    <div className="grid grid-cols-2 gap-4 col-span-1">
      {/* กะลาพร้าว */}
      <Link href="/category/coconutshell" className="bg-[#FFF3D9] rounded-xl p-2 shadow text-center hover:scale-105 duration-500">
        <p className="text-lg sm:text-2xl text-black">กะลาพร้าว</p>
        <img src="10-Photoroom.png" className="w-full mx-auto" />
      </Link>

      {/* หัตถกรรมไม้ */}
      <Link href="/category/woodenCraft" className="bg-[#754600] rounded-xl p-2 shadow text-center text-white hover:scale-105 duration-500">
        <p className="text-lg sm:text-2xl">หัตถกรรมไม้</p>
        <img src="8-Photoroom.png" className="w-full mx-auto" />
      </Link>
    </div>

    {/* สมุนไพร */}
    <Link href="/category/herb" className="bg-[#e3bba3] text-white rounded-2xl p-4 shadow-md lg:col-span-2 flex flex-col justify-between hover:scale-105 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-3xl sm:text-5xl setData text-center sm:text-left">สมุนไพร<br />เครื่องหอม</p>
        <img src="9-Photoroom.png" alt="สมุนไพร" className="w-1/2 sm:w-1/4 mt-4 sm:mt-0" />
      </div>
    </Link>
    
  </div>
</section>

            <Footer></Footer>
        </>
    );
}