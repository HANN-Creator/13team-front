'use client';

import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6">
      {/* 상단 로고 및 타이틀 */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          <span className="block">돌봄과 정성을 잇는</span>
          <span className="block">따뜻한 물결,</span>
        </h1>
        <p className="inline-block px-4 py-1 mt-2 text-sm font-bold text-gray-900 bg-gray-200 rounded-md">
          로고
        </p>
      </div>

      {/* 역할 선택 */}
      <div className="w-full max-w-sm space-y-4 sm:space-y-6">
        {/* 센터 관리자 선택 */}
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
          onClick={() => router.push('/register?role=admin')}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full"></div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm text-gray-600">어르신을 돌봐 줄 보호사님을 찾아드려요.</p>
            <p className="text-sm sm:text-lg font-bold text-gray-800">센터 관리자로 시작하기 &gt;</p>
          </div>
        </div>

        {/* 요양 보호사 선택 */}
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
          onClick={() => router.push('/register?role=caregiver')}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full"></div>
          <div className="ml-3 sm:ml-4">
            <p className="text-xs sm:text-sm text-gray-600">요양 보호사님의 일자리를 찾아드려요.</p>
            <p className="text-sm sm:text-lg font-bold text-gray-800">요양 보호사로 시작하기 &gt;</p>
          </div>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="mt-6 sm:mt-8 w-full max-w-sm">
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-2">이미 회원이신가요?</p>
        <button
          className="w-full bg-primary text-white py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-opacity-80 transition"
          onClick={() => router.push('/login')}
        >
          바로 로그인하기
        </button>
      </div>
    </div>
  );
}
