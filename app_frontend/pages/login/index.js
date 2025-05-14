import Swal from "sweetalert2";
const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

export default function Login() {
  async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    const response = await fetch(`${userApiUrl}/api/token/`, {
      method: 'POST',
      body: formData,
    });
    try {
      const data = await response.json();
      console.log(response);

      if (response.status == 401) {
        if (response.status == 401) {
          await Swal.fire({
            title: "ไม่พบบัญชีผู้ใช้!",
            text: "กรุณาสมัครสมาชิกก่อนเข้าสู่ระบบ",
            icon: "warning",
            confirmButtonColor: "#754600"
          });
          return;
        }

      }

      localStorage.setItem('jwt_access', data.access);
      // console.log(localStorage.getItem('jwt_access'));

      await Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        iconColor: "#28a745"
      });


      window.location.href = "/Home";

    } catch (error) {
      await Swal.fire({
        title: "เข้าสู่ระบบล้มเหลว!",
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        icon: "error",
        confirmButtonColor: "#D33"
      });

    }



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
      <div className="relative z-10 bg-white bg-opacity-60 p-10 rounded-lg shadow-md w-full max-w-md backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center text-[#2D3748] mb-6">เข้าสู่ระบบ</h1>

        <form onSubmit={onLogin} className="space-y-4 text-base">
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-700">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
              className="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
            id="login-button"
          >
            เข้าสู่ระบบ
          </button>

          <p className="text-sm text-center text-gray-600">
            ยังไม่มีบัญชี? <a href="register" className="text-yellow-400 underline">สมัครสมาชิก</a>
          </p>
        </form>
      </div>

    </main>
  );
}