import Swal from "sweetalert2";


export default function register() {
  async function onregister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

    if (!username || !password || !confirmPassword) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const registrationData = {
      username: username,
      password1: password,
      password2: confirmPassword,
    };


    try {
      const response = await fetch(`${userApiUrl}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      console.log('Response:', response);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        await Swal.fire({
          title: "สร้างบัญชีผู้ใช้สำเร็จ!",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
          icon: "success",
          confirmButtonColor: "yellow",
        });
        window.location.href = '/login';
      } else {
        // แปลง error object เป็นข้อความ
        let errorMsg = data?.message || data?.error || "ไม่สามารถสมัครสมาชิกได้ในขณะนี้";
        if (data?.details) {
          // รวมข้อความ error ของแต่ละฟิลด์
          errorMsg += "\n" + data.details.map((detail) => {
            return `${detail.message}`;
          }).join("\n");
        }
        await Swal.fire({
          title: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
          text: errorMsg,
          icon: "error",
          confirmButtonColor: "#D33"
        });
        console.log('Registration error:', data);
        console.error('Registration failed:', data);
      }

    } catch (error) {
      console.error('Fetch error during registration:', error);
      await Swal.fire({
        title: "ข้อผิดพลาด",
        text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
        icon: "warning",
        confirmButtonColor: "#F59E0B" // สีเหลืองอ่อน
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
        <h1 className="text-3xl font-bold text-center text-[#2D3748] mb-6">สร้างบัญชีผู้ใช้</h1>

        <form onSubmit={onregister} className="space-y-4 text-base">
          <div>
            <label htmlFor="username" className="block mb-1 text-[#4A5568]">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="ชื่อผู้ใช้"
              required
              className="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-[#4A5568]">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-[#4A5568]">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              required
              className="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
          >
            สมัครสมาชิก
          </button>

          <p className="text-sm text-center text-[#2D3748]">
            มีบัญชีแล้ว? <a href="login" className="text-yellow-400 underline">เข้าสู่ระบบ</a>
          </p>
        </form>
      </div>


    </main>
  );
}