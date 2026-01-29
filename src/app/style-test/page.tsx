'use client';

export default function StyleTest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50">
      <div className="rounded-2xl bg-white p-12 text-center shadow-2xl">
        <h1 className="mb-6 text-5xl font-bold">
          <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
            PineSmile
          </span>
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Nếu bạn thấy gradient màu xanh-vàng ở trên, Tailwind CSS đang hoạt động!
        </p>
        
        <div className="space-y-4">
          <button className="block w-full rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg">
            Nút Xanh Lá
          </button>
          <button className="block w-full rounded-full bg-amber-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-lg">
            Nút Vàng Cam
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8">
          <div>
            <p className="text-2xl font-bold text-emerald-600">100%</p>
            <p className="text-sm text-gray-600">Tự nhiên</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-500">✓</p>
            <p className="text-sm text-gray-600">Bền vững</p>
          </div>
        </div>
      </div>
    </div>
  );
}
