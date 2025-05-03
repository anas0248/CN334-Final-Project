export default function Login() {
    async function onLogin(event) {
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
          <h1 className="text-3xl font-bold text-center text-[#8d4c2f] mb-6">เข้าสู่ระบบ</h1>
      
          <form onSubmit={onLogin} className="space-y-4 text-base">
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
            
      
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
            >
              เข้าสู่ระบบ
            </button>
      
            <p className="text-sm text-center text-gray-600">
              ยังไม่มีบัญชี? <a href="register" className="text-yellow-600 underline">สมัครสมาชิก</a>
            </p>
          </form>
        </div>
      </main>      
      );
    }