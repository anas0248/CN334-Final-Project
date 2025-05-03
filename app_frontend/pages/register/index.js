export default function register() {
  async function onregister(event) {

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center relative font-instrument">
      {/* เบลอพื้นหลัง */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('1.jpg')",
          filter: 'blur(6px)',
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>


      {/* กล่องฟอร์ม */}
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#8d4c2f] mb-6">สร้างบัญชีผู้ใช้</h1>

        <form onSubmit={onregister} className="space-y-4 text-base">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-gray-700">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
          >
            สมัครสมาชิก
          </button>

          <p className="text-sm text-center text-gray-600">
            มีบัญชีแล้ว? <a href="login" className="text-yellow-600 underline">เข้าสู่ระบบ</a>
          </p>
        </form>
      </div>
    </main>
  );
}