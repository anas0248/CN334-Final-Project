export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#fdf6ec]">  
      <div className="flex flex-col items-center space-y-4">
        {/* วงกลมหมุน */}
        {/* <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div> */}

        <h1 className="text-5xl font-jaini text-yellow-700 animate-bounce">LOCONOMY</h1>

        <p className="text-gray-700 text-lg ">Loading data...</p>
      </div>
    </div>
  );
}
