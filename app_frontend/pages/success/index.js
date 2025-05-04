import Header from "@/components/Header";


export default function Peyment() {
  const order = {
    id: "ORD123456",
    name: "Somsak J.",
    price: 599
  };

  const confrim = () => {
   window.location.href = "/profile";
  };

  return (
    <>
      <Header />
      <main className="p-6 md:p-10 bg-[#fdf6ec] min-h-screen flex items-center justify-center font-instrument">
        <div className="w-full max-w-md">
          <h1 className="text-[#754600] text-4xl md:text-6xl font-bold text-center mb-8">
            Payment
          </h1>

          <div className="relative z-10 bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <div className="text-green-600 text-9xl text-center">
            
            <i className="fa-solid fa-circle-check text-green-600 text-9xl animate__animated animate__tada"></i>

            </div>

            <h1 className="text-5xl mt-5 text-center text-[#8d4c2f] mb-6">
              {order.price} Bath
            </h1>

            <h1 className="text-2xl mt-2 text-center text-[#8d4c2f] mb-2">
              ID: {order.id}
            </h1>

            <h1 className="text-2xl mt-2 text-center text-[#8d4c2f] mb-6">
              Name: {order.name}
            </h1>

            <button onClick={confrim} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition mt-ถ">
              Confirm
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
