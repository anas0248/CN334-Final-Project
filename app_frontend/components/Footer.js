export default function Footer() {
  return (
    <>
      <footer className=" text-[#754600] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-bold">มือไทยใจบ้าน</h3>
            <p className="text-sm text-center">
              สนับสนุนสินค้าท้องถิ่นและชุมชน เพื่อส่งเสริมเศรษฐกิจในระดับรากหญ้า
            </p>
          </div>

          <div className="mt-8 border-t border-[#754600] pt-4 text-center text-sm">
            <p>© 2025 มือไทยใจบ้าน. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </>
  );
}