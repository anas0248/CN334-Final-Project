export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#fdf6ec]">
      <div className="flex flex-col items-center space-y-4 text-center">
        <i className="fa-solid fa-triangle-exclamation text-6xl text-red-500 animate-pulse"></i>
        <h1 className="text-5xl  text-red-700">Something went wrong</h1>
        <p className="text-gray-700 text-lg">Oops! We couldn't load your data.</p>
        <a
          href="/Home"
          className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  );
}
