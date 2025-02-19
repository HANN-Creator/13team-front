'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* 성공 메시지 */}
      <h2 className="text-3xl font-bold text-gray-600">축하드려요,</h2>
      <h2 className="text-3xl font-bold text-gray-600 mt-2">등록이 완료되었습니다!</h2>

      {/* 일러스트 */}
      <img src="../../success.png" alt="성공 이미지" className="mt-6" width="234" height="234" />

      {/* 홈으로 돌아가기 버튼 */}
      <button
        className="w-full max-w-md mt-10 bg-orange text-white py-3 rounded-[9px] text-normal font-semibold"
        onClick={() => router.push('/home')} // 홈으로 돌아가기
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}