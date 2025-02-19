'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [view, setView] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sort, setSort] = useState(null);
  
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 max-w-screen-md mx-auto">
      {/* 상단 헤더 */}
      <div className="bg-orange rounded-b-3xl h-[115px] relative flex flex-col justify-end pb-4 items-center">
        <img src="/admin.png" className="absolute left-5 w-10 h-10 rounded-full" alt="Admin" />
        <p className="absolute left-20 text-lg font-medium text-white mt-2">센터장 <span className="font-bold">이수호</span>님</p>
        <button onClick={() => router.back()} className="absolute right-4 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M19 12H5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 총 매칭 건수 및 그래프 토글 */}
      <div className="mt-6 p-4 bg-white rounded-[12px] border border-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">총 매칭 건수</p>
          <div className="flex border border-gray-300 font-semibold text-[13px] w-[156px] h-[34px] rounded-[56px]">
            {['전체', '일주일'].map((option) => (
              <button
                key={option}
                className={`px-4 py-1 text-sm ${view === option ? 'w-1/2 h-[34px] rounded-[56px] fong-bold border border-orange text-orange' : 'text-gray-400'}`}
                onClick={() => setView(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">26회</p>
      </div>

      {/* 진행 상태 */}
      <div className="mt-4 flex justify-between p-4 bg-white rounded-[12px] border border-gray-200 shadow-md">
        {[
          { label: '대기 중', value: 4 },
          { label: '진행 중', value: 2 },
          { label: '수락률', value: '72%' },
          { label: '거절률', value: '20%' }
        ].map((item, index) => (
          <div key={index} className={`text-center flex-1 ${index !== 3 ? 'border-r border-gray-300' : ''}`}> 
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 어르신 목록 */}
      <div className="mt-12">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">어르신 목록</p>
          <button 
            className="font-normal text-[15px] text-gray-500 flex items-center" 
            onClick={()=>setSort(sort.label)}>
            정렬
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7.20117L9 10.8012L13.5 7.20117" stroke="#505050" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          {/* 모달 창 */}
          {selectedStatus && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <p className="text-lg font-bold">전체</p>
                <p className="text-lg font-bold">최신 순</p>
              </div>
            </div>
          )}

        </div>
        <hr className="mt-3"/>
        <div className="mt-4 p-4 bg-white rounded-xl flex items-center">
          <img src="/senior.png" className="w-[60px] h-[60px] rounded-[14px] mr-4" alt="Senior" />
          <div className="flex-grow">
            <div className="flex items-center">
              <p className="text-black font-bold text-lg mr-2">김해란 님</p>
              <p className="font-semibold text-gray-400 text-[13px]">서울시 강동구</p>
              <button className="ml-auto">
                <svg 
                  width="22" 
                  height="22" 
                  viewBox="0 0 22 22" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex justify-between">
                    <path d="M18.887 11.5313L20.243 12.7388C20.4934 12.9478 20.6607 13.2395 20.7146 13.5611C20.7685 13.8828 20.7055 14.2131 20.537 14.4923L18.902 17.2853C18.7751 17.4991 18.594 17.6756 18.377 17.7968C18.1574 17.9183 17.9109 17.9828 17.66 17.9843C17.5043 17.9853 17.3494 17.962 17.201 17.9153L15.4655 17.3423C15.1615 17.5373 14.8455 17.7118 14.5175 17.8658L14.153 19.6253C14.0855 19.949 13.9053 20.2382 13.6445 20.4413C13.3803 20.6481 13.0528 20.7573 12.7175 20.7503H9.33196C8.99658 20.7573 8.6691 20.6481 8.40496 20.4413C8.14468 20.2379 7.96502 19.9488 7.89796 19.6253L7.53196 17.8658C7.20826 17.7097 6.89419 17.5344 6.59146 17.3408L4.84996 17.9153C4.70146 17.962 4.54661 17.9853 4.39096 17.9843C4.14055 17.9825 3.89457 17.9181 3.67546 17.7968C3.45862 17.676 3.27751 17.5001 3.15046 17.2868L1.45696 14.4923C1.2809 14.2106 1.21363 13.8743 1.26775 13.5465C1.32187 13.2188 1.49368 12.922 1.75096 12.7118L3.10546 11.0003V10.4693L1.74946 9.26181C1.49905 9.05285 1.33174 8.76114 1.27781 8.43949C1.22388 8.11784 1.2869 7.78752 1.45546 7.50831L3.14896 4.71531C3.27581 4.50151 3.45693 4.32505 3.67396 4.20381C3.89307 4.08257 4.13905 4.01811 4.38946 4.01631C4.54371 4.00658 4.69853 4.02075 4.84846 4.05831L6.55546 4.65831C6.86046 4.46331 7.17646 4.28881 7.50346 4.13481L7.86946 2.37531C7.93652 2.05186 8.11618 1.76271 8.37646 1.55931C8.6406 1.35253 8.96808 1.24337 9.30346 1.25031H12.6605C12.9958 1.24337 13.3233 1.35253 13.5875 1.55931C13.85 1.76481 14.03 2.05431 14.0945 2.37531L14.4605 4.13481C14.7855 4.28981 15.099 4.46481 15.401 4.65981L17.144 4.08681C17.3374 4.02388 17.5418 4.00179 17.7442 4.02193C17.9467 4.04207 18.1427 4.104 18.32 4.20381C18.5375 4.32681 18.7175 4.50381 18.845 4.71381L20.537 7.50831C20.7154 7.78764 20.7861 8.12236 20.7358 8.44999C20.6856 8.77761 20.5179 9.07577 20.264 9.28881L18.887 10.4618V11.5313Z" stroke="#767676"/>
                    <path d="M14.75 11C14.75 11.9946 14.3549 12.9484 13.6517 13.6517C12.9484 14.3549 11.9946 14.75 11 14.75C10.0054 14.75 9.05161 14.3549 8.34835 13.6517C7.64509 12.9484 7.25 11.9946 7.25 11C7.25 10.0054 7.64509 9.05161 8.34835 8.34835C9.05161 7.64509 10.0054 7.25 11 7.25C11.9946 7.25 12.9484 7.64509 13.6517 8.34835C14.3549 9.05161 14.75 10.0054 14.75 11Z" stroke="#767676"/>
                </svg>
              </button>
            </div>
            <div className="flex mt-2 text-gray-500 text-[15px]">
              <p className="mr-2">여</p>
              <p className="border-l border-gray-200 px-2">75세</p>
              <p className="border-l border-gray-200 px-2">3등급</p>
            </div>
          </div>
        </div>
      </div>

      {/* 대기, 진행, 완료 버튼 */}
      <div className="mt-3 flex justify-around gap-2">
        {[
          { label: '대기', count: 3 },
          { label: '진행', count: 1 },
          { label: '완료', count: 1 }
        ].map((status) => (
          <button 
            key={status.label} 
            className="px-4 py-2 border rounded-[5px] text-gray-500 flex-1 justify-between items-center"
            onClick={()=>setSelectedStatus(status.label)}
          >
            <span>{status.label}</span>
            <span className="font-bold text-[15px] text-gray-600">{status.count}</span>
          </button>
        ))}
      </div>

      {/* 모달 창 */}
      {selectedStatus && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-bold">{selectedStatus} 목록</p>
            <button className="mt-4 px-4 py-2 bg-orange text-white rounded" onClick={() => setSelectedStatus(null)}>닫기</button>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-3 flex justify-around rounded-t-3xl drop-shadow-xl z-50">
        <button className="text-[#FF8B14] font-semibold text-[13px] flex flex-col items-center" onClick={() => router.push("/")}> 
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
