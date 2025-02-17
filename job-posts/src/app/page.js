'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileIcon from './job-post/ProfileIcon'; // ProfileIcon 컴포넌트 임포트

export default function SelectSenior() {
  const router = useRouter();
  const [selectedSenior, setSelectedSenior] = useState(null);

  const seniors = [
    { id: 1, name: '김수은 님', image: '/senior.png' },
    { id: 2, name: '김수은 님', image: null },
    { id: 3, name: '김수은 님', image: null },
    { id: 4, name: '김수은 님', image: null },
    { id: 5, name: '김수은 님', image: null },
    { id: 6, name: '어르신 추가', image: null }, // 추가 버튼
  ];

  // 다음 단계로 이동
  const handleNext = (event) => {
    event.preventDefault(); // 기본 동작 방지
    router.push('/job-post/basic');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 flex flex-col">
      {/* 상단 네비게이션 */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-0 text-gray-500 text-lg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 24L12 16L20 8" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-lg font-semibold text-gray-600">채용 공고 등록</p>
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-[6px] w-1/3 bg-orange rounded-[30px]"></div>
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px] mx-2"></div>
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px]"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-[26px] font-bold text-gray-600">어떤 어르신의 채용이 필요하신가요?</h2>

      {/* 어르신 선택 */}
      <div className="grid grid-cols-3 gap-y-10 mt-6">
        {seniors.map((senior) => (
          <button
            key={senior.id}
            className={`flex flex-col items-center justify-center p-2 rounded-full w-24 h-24 border ${
              selectedSenior === senior.id ? 'border-orange border-2.5' : 'border-gray-300'
            }`}
            onClick={() => setSelectedSenior(senior.id)}
          >
            {senior.image ? (
              <img src={senior.image} alt={senior.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              senior.id === 6 ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-gray-500 text-2xl">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 33.25V8.75M8.75 21H33.25" stroke="#767676" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              ) : (
                <ProfileIcon />
              )
            )}
            <p className="mt-2 text-sm text-gray-600">{senior.name}</p>
          </button>
        ))}
      </div>

      {/* 확인 버튼 */}
      <form onSubmit={handleNext}>
        <input
          type="submit"
          className="w-full mt-40 bg-orange text-white py-3 rounded-[9px] text-base font-semibold"
          disabled={!selectedSenior}
          value="확인"
          style={{ cursor: 'pointer' }}
        />
      </form>
    </div>
  );
}
