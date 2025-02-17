'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function CustomCenterRegisterPage() {
  const router = useRouter();

  // 입력 데이터 상태
  const [centerData, setCenterData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [step, setStep] = useState(1);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setCenterData({ ...centerData, [e.target.name]: e.target.value });
  };

  // 다음 필드 표시
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center">
        <button onClick={() => router.back()} className="text-gray-600 text-lg">←</button>
      </div>

      {/* 진행 상태 바 (고정) */}
      <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-orange-500 rounded"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded mx-1"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
      </div>

      {/* 제목 */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">센터의 정보를 받아볼게요.</h2>
      <p className="text-gray-600 mt-2">근처의 요양보호사 분들을 추천해드릴게요.</p>

      {/* 입력 필드 (위에서 아래로 추가) */}
      <div className="mt-6 space-y-4">
        {step >= 3 && (
          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700">센터 주소</label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
              <input
                type="text"
                name="address"
                placeholder="지역을 선택해주세요."
                value={centerData.address}
                onChange={handleChange}
                className="w-full p-3 pl-12 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700">센터 전화번호</label>
            <input
              type="text"
              name="phone"
              placeholder="센터의 전화번호를 입력해주세요."
              value={centerData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700">센터 이름</label>
          <input
            type="text"
            name="name"
            placeholder="센터 이름을 입력해주세요."
            value={centerData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      {/* 확인 버튼 (다음 필드 활성화) */}
      {step < 3 ? (
        <button
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition"
          onClick={handleNext}
          disabled={(step === 1 && !centerData.name) || (step === 2 && !centerData.phone)}
        >
          확인
        </button>
      ) : (
        <button
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition"
          onClick={() => router.push('/register/additional-info')}
        >
          확인
        </button>
      )}
    </div>
  );
}
