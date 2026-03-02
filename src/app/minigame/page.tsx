'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/common/Header';

// Import game component với dynamic để tránh SSR issues
const GreenSmileGame = dynamic(
  () => import('./components/GreenSmileGame'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-600 font-semibold text-lg">Đang tải game...</p>
          <p className="text-green-400 text-sm mt-2">PineSmile 🌿</p>
        </div>
      </div>
    )
  }
);

export default function MinigamePage() {
  return (
    <>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-green-800 mb-2 drop-shadow-md">
              🌿 PineSmile Game
            </h1>
            <p className="text-green-600 text-lg italic">
              Nụ cười xanh từ thiên nhiên
            </p>
          </div>

          {/* Game Container */}
          <div className="mb-6">
            <GreenSmileGame />
          </div>

          {/* Instructions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <h3 className="text-green-800 font-bold text-lg mb-3">📖 Hướng dẫn chơi:</h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="mr-2">🍃</span>
                <span>Thu thập lá dứa tốt để tăng điểm</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎁</span>
                <span>Quà hiếm sẽ tăng +5 điểm</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🦠</span>
                <span>Tránh vi khuẩn để giữ mạng</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👆</span>
                <span>Vuốt trái/phải hoặc dùng phím mũi tên</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚡</span>
                <span>Mỗi 5 điểm sẽ tăng tốc độ!</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎡</span>
                <span className="font-bold">Đạt 100 điểm để quay vòng may mắn! 🎁</span>
              </li>
            </ul>
          </div>   
          {/* Footer */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-green-600 text-sm">
              🏥 Nha khoa từ lá dứa - Sạch - Tự nhiên - Thân thiện
            </p>
            <p className="text-green-500 text-xs">
              © 2024 PineSmile. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}