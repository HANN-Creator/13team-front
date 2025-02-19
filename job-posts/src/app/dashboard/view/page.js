'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ViewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black bg-opacity-50 flex flex-col">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="ml-4 mt-6"
      >
        <path d="M20 24L12 16L20 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* 비디오 플레이어 자리 */}
      <div className="relative h-56 flex justify-center items-center">
        <img src="/assets/play.png" alt="재생" className="w-[96px] h-[96px]" />
      </div>
      
      {/* 정보 카드 */}
      <div className="bg-white rounded-t-3xl p-6 shadow-lg flex-1">
        <div className="p-4 border border-gray-300 rounded-[12px] w-full h-[146px] mx-auto flex items-center space-x-4">
          <img src="/assets/carer.jpg" className="w-[66px] h-[66px] rounded-full" alt="profile" />
          <div className="flex flex-col flex-grow">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold text-gray-600">김수은님</p>
              <p className="text-sm font-semibold text-gray-500">서울시 강동구 천호동</p>
            </div>
            <p className="text-[15px] text-gray-400 mt-1">1급 요양보호사</p>
            <p className="bg-[#f2f2f2] rounded-[10px] h-[40px] w-full text-gray-600 font-normal text-sm mt-4 mx-auto flex items-center justify-center">
              친절하게 케어해드릴 수 있습니다.
            </p>
          </div>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="flex border-b mt-4">
          {['기본 정보', '경력 관리', '근무 조건'].map((tab, index) => (
            <button key={index} className={`flex-1 py-2 text-center ${index === 0 ? 'border-orange text-orange font-semibold border-b-2' : 'text-gray-400'}`}>
              {tab}
            </button>
          ))}
        </div>
      
      {/* 안내 메시지 */}
      <div className="bg-gradient-to-b from-white to-gray-100 pb-16 pt-6 text-center font-semibold text-lg text-gray-600">
        <p>요양보호사님이</p>
        <p><span className="text-orange">제안을 수락하신 후</span>에</p>
        <p>열람이 가능해요!</p>
      </div>
    </div>

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-3 flex justify-around rounded-t-3xl shadow-xl z-50">
        <button className="text-gray-600 text-[13px] flex flex-col items-center" onClick={() => router.push("/")}> 
          <img src="/assets/홈화면_OFF.png" className="w-[75px] h-[64px]" /> 
        </button>
        <button className="text-gray-600 text-[13px] flex flex-col items-center" onClick={() => router.push("/chat")}> 
          <img src="/assets/대화하기_OFF.png" className="w-[65px] h-[60px]" /> 
        </button>
        <button className="text-gray-600 text-[13px] flex flex-col items-center" onClick={() => router.push("/elders")}> 
          <img src="/assets/어르신관리_OFF.png" className="w-[65px] h-[60px]" /> 
        </button>
        <button className="text-[#FF8B14] font-semibold text-[13px] flex flex-col items-center" onClick={() => router.push("/admin/dashboard")}> 
          <div className="absolute top-[1px] w-10 h-1 bg-[#FF8B14] rounded-full"></div>
          <img src="/assets/대시보드_ON.png" className="w-[65px] h-[60px]" /> 
        </button>
        <button className="text-gray-600 text-[13px] flex flex-col items-center" onClick={() => router.push("/admin/my-info")}> 
          <img src="/assets/내정보_OFF.png" className="w-[65px] h-[60px]" /> 
        </button>
      </div>
    </div>
  );
}
