export default function TestPage() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-emerald-600 mb-4">PineSmile Test</h1>
        <p className="text-gray-600 mb-6">Nếu bạn thấy text xanh lá và background trắng, Tailwind đã hoạt động!</p>
        <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300">
          Nút Test
        </button>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">Test đơn giản để kiểm tra Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
