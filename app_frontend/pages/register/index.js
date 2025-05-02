export default function register() {
    async function onregister(event) {
        // event.preventDefault();
        // const formData = new FormData(event.target)
        // console.log(formData)
        // console.log(formData.get('username'))
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }
        // const response = await fetch('http://127.0.0.1:3342/api/token/', {
        //     method: 'POST',
        //     body: formData,
        // });
        // try {
        //     const data = await response.json();
        //     localStorage.setItem('jwt_access', data.access);
        //     console.log(localStorage.getItem('jwt_access'));
        //     alert("Login success!")
        // } catch (error) {
        //     alert("Your username/password are incorrect!");
        // }
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center relative">
          {/* เบลอพื้นหลัง */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('1.jpg')",
              filter: 'blur(5px)',
            }}
          ></div>
    
          {/* กล่องฟอร์ม */}
          <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-[#8d4c2f] mb-6">สร้างบัญชีผู้ใช้</h1>
    
            <form onSubmit={onregister} className="space-y-4 text-base">
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-700">อีเมล</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
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
    
              {/* <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 mr-2 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  ฉันยอมรับ <a href="#" className="text-yellow-600 underline">เงื่อนไขและข้อตกลง</a>
                </label>
              </div> */}
    
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