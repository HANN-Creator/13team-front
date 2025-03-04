"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 font-[pretendard]">
      {/* 상단 타이틀과 로고 */}
      <div className="w-full max-w-sm">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-900 leading-tight">
          <span className="block">돌봄과 정성을 잇는</span>
          <span className="block flex items-center">
            따뜻한 물결,
            <Image
              src="/assets/logo.png" // ✅ 로고 이미지
              alt="로고"
              width={50}
              height={20}
              className="ml-2 bg-[#FF8B14] bg-opacity-50 p-1 rounded-md"
            />
          </span>
        </h1>

        {/* 이용 안내 */}
        <p className="mt-6 text-sm text-gray-500">이용이 처음이신가요?</p>
      </div>

      {/* 역할 선택 */}
      <div className="w-full max-w-sm space-y-4 sm:space-y-6 mt-4">
        {/* 센터 관리자 선택 */}
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
          onClick={() => router.push("/register?role=admin")}
        >
          <Image
            src="/assets/센터관리자회원가입.png" // ✅ 업로드한 이미지 적용
            alt="센터 관리자 아이콘"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="text-sm text-gray-600">
              어르신을 돌봐 줄 보호사님을 찾아드려요.
            </p>
            <p className="text-base font-bold text-gray-800">
              센터 관리자로 시작하기 &gt;
            </p>
          </div>
        </div>

        {/* 요양 보호사 선택 */}
        <div
          className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
          onClick={() => router.push("/caregiver-register?role=caregiver")}
        >
          <Image
            src="/assets/요양보호사회원가입.png" // ✅ 업로드한 이미지 적용 (다른 이미지가 필요하면 변경)
            alt="요양 보호사 아이콘"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="text-sm text-gray-600">
              요양 보호사님의 일자리를 찾아드려요.
            </p>
            <p className="text-base font-bold text-gray-800">
              요양 보호사로 시작하기 &gt;
            </p>
          </div>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="mt-8 w-full max-w-sm">
        <p className="text-sm text-gray-600 text-center mb-2">
          이미 회원이신가요?
        </p>
        <button
          className="w-full bg-[#FF8B14] text-white py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-[#e07812] transition"
          onClick={() => router.push("/login")}
        >
          바로 로그인하기
        </button>
      </div>
    </div>
  );
}
