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
    grade: '',
    period: '',
    description: ''
  });

  // 현재 입력 단계
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

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className={`h-1 w-1/4 rounded ${step >= 1 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
        <div className={`h-1 w-1/4 mx-1 rounded ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
        <div className={`h-1 w-1/4 mx-1 rounded ${step >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
        <div className={`h-1 w-1/4 rounded ${step >= 4 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
      </div>

      {/* 제목 */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">센터의 정보를 받아볼게요.</h2>
      <p className="text-gray-600 mt-2">근처의 요양보호사 분들을 추천해드릴게요.</p>

      {/* 입력 필드 */}
      <div className="mt-6 space-y-4">
        {/* 센터 이름 입력 */}
        <div className={`${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
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

        {/* 센터 전화번호 입력 (센터 이름 입력 후 표시) */}
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

        {/* 센터 주소 입력 (검색 기능 포함, 전화번호 입력 후 표시) */}
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

        {/* 추가 정보 입력 (주소 입력 후 표시) */}
        {step >= 4 && (
          <>
            <h2 className="mt-6 text-lg font-bold text-gray-900">필수는 아니지만 입력하면 좋은 정보들이에요!</h2>
            <p className="text-gray-600 mt-2">나중에 작성하고 싶으시면 건너뛰기를 눌러주세요.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">센터 등급</label>
                <input
                  type="text"
                  name="grade"
                  placeholder="1등급"
                  value={centerData.grade}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">운영 기간</label>
                <input
                  type="text"
                  name="period"
                  placeholder="3년"
                  value={centerData.period}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">센터 한줄 소개</label>
              <input
                type="text"
                name="description"
                placeholder="센터의 한줄 소개를 입력해주세요."
                value={centerData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </>
        )}
      </div>

      {/* 확인 버튼 (다음 필드 활성화) */}
      <button
        className="w-full mt-6 bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition"
        onClick={handleNext}
        disabled={
          (step === 1 && !centerData.name) ||
          (step === 2 && !centerData.phone) ||
          (step === 3 && !centerData.address)
        }
      >
        {step < 4 ? '다음' : '회원가입 완료'}
      </button>

      {/* 회원가입 완료 시 다음 단계로 이동 */}
      {step >= 4 && (
        <button
          className="w-full mt-3 bg-gray-300 text-gray-700 py-3 rounded-lg text-lg font-semibold"
          onClick={() => router.push('/register/name')}
        >
          건너뛰기
        </button>
      )}
    </div>
  );
}
