'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileIcon from './job-post/ProfileIcon'; // 기본 프로필 아이콘

export default function SelectSenior() {
  const router = useRouter();
  const [selectedSenior, setSelectedSenior] = useState(null);

  const seniors = [
    { seniorID: 1, name: '김수은 님', image: '/senior.png' },
    { seniorID: 2, name: '김수은 님', image: null },
    { seniorID: 3, name: '김수은 님', image: null },
    { seniorID: 4, name: '김수은 님', image: null },
    { seniorID: 5, name: '김수은 님', image: null },
    { seniorID: 6, name: '어르신 추가', image: null },
  ];

  // 다음 단계 이동
  const handleNext = (event) => {
    event.preventDefault();
    if (selectedSenior !== null) {
      router.push('/job-post/basic');
    }
  };

  // 어르신 추가 버튼 클릭 시
  const handleAddSenior = () => {
    alert('어르신 추가 기능 구현');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <div className="relative flex items-center justify-center w-full">
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
      <div className="grid grid-cols-3 gap-x-4 gap-y-10 mt-20">
        {seniors.map((senior) => (
          <div key={senior.seniorID} className="flex flex-col items-center gap-y-2">
            <button
              className={`flex items-center justify-center rounded-full w-[100px] h-[100px] border ${
                selectedSenior === senior.seniorID ? 'border-orange border-2.5' : 'border-gray-300'
              }`}
              onClick={() => (senior.seniorID === 6 ? handleAddSenior() : setSelectedSenior(senior.seniorID))}
            >
              {senior.image ? (
                <img src={senior.image} alt={senior.name} className="w-full h-full rounded-full object-cover" />
              ) : senior.seniorID === 6 ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-30 rounded-full border-2 border-dashed border-gray-350">
                  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 33.25V8.75M8.75 21H33.25" stroke="#767676" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              ) : (
                <ProfileIcon width={100} height={100} />
              )}
            </button>
            <p className={`text-${senior.seniorID === 6 ? 'gray-500 font-medium' : 'gray-600 font-bold'} text-base`}>{senior.name}</p>
          </div>
        ))}
      </div>

      {/* 다음으로 이동 버튼 */}
      <form onSubmit={handleNext} className="w-full">
        <input
          type="submit"
          className="w-full mt-20 bg-orange text-white py-3 rounded-[9px] text-base font-semibold"
          disabled={selectedSenior === null}
          value="다음으로 이동"
          style={{ cursor: 'pointer' }}
        />
      </form>
    </div>
  );
}
