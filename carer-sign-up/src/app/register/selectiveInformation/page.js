'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckIcon from '../../CheckIcon';

export default function SelectiveInformationPage() {
  const router = useRouter();
  const [period, setPeriod] = useState('');
  const [careerList, setCareerList] = useState([]);
  const [newCareer, setNewCareer] = useState({ institution: '', task: '', term: '' });
  const [intro, setIntro] = useState('');
  const [hasCar, setHasCar] = useState(false);
  const [dementiaTraining, setDementiaTraining] = useState(false);

  // 경력 추가 핸들러
  const handleAddCareer = (event) => {
    event.preventDefault(); // 기본 동작 방지
    if (newCareer.institution && newCareer.task && newCareer.term) {
      setCareerList([...careerList, newCareer]);
      setNewCareer({ institution: '', task: '', term: '' }); // 입력 폼 초기화
    }
  };

  // 경력 입력 필드 변경 핸들러
  const handleNewCareerChange = (field, value) => {
    setNewCareer({ ...newCareer, [field]: value });
  };

  // 다음 단계로 이동 (certificate 페이지)
  const handleNext = (event) => {
    event.preventDefault(); // 기본 동작 방지
    if (period || careerList.length > 0 || intro || hasCar || dementiaTraining) {
      router.push('/register/certificate');
    } else {
      if (confirm('아직 입력하지 않은 정보가 있어요. 건너뛰시겠어요?')) {
        router.push('/register/certificate');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* 상단 네비게이션 */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-0 text-gray-600 text-lg">
          ←
        </button>
        <p className="text-lg font-bold text-gray-600">회원가입</p>
        <button onClick={() => router.push('/register/certificate')} className="absolute right-0 text-gray-400 text-sm">
          건너뛰기
        </button>
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded mx-1"></div>
        <div className="h-1 w-1/3 bg-orange rounded"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-2xl font-bold text-gray-600">필수는 아니지만 입력하면 좋은 정보들이에요!</h2>
      <p className="text-gray-500 mt-3">나중에 작성하고 싶으시다면 건너뛰기를 눌러주세요.</p>
      
      <form onSubmit={handleNext}>
        {/* 경력 기간 입력 필드 */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-600">경력 기간</label>
          <input
            type="text"
            placeholder="경력 기간을 입력해 주세요. (예: 2년)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>
        
        {/* 주요 경력 */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <label className="font-normal text-gray-600">주요 경력</label>
            <button
              onClick={handleAddCareer}
              className="text-orange font-semibold text-sm flex items-center"
            >
              추가하기 +
            </button>
          </div>
          
          <div className="mt-3 space-y-2 bg-gray-100 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-600">기관명</label>
              <input
                type="text"
                placeholder="기관명을 입력해 주세요."
                value={newCareer.institution}
                onChange={(e) => handleNewCareerChange('institution', e.target.value)}
                className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">업무</label>
              <input
                type="text"
                placeholder="하셨던 업무를 입력해 주세요."
                value={newCareer.task}
                onChange={(e) => handleNewCareerChange('task', e.target.value)}
                className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">기간</label>
              <input
                type="text"
                placeholder="업무 기간을 입력해 주세요."
                value={newCareer.term}
                onChange={(e) => handleNewCareerChange('term', e.target.value)}
                className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange mt-2"
              />
            </div>
          </div>

          {/* 추가된 경력 리스트 */}
          <div className="mt-4">
            {careerList.map((career, index) => (
              <div key={index} className="p-2 border border-gray-200 rounded-lg mb-2">
                <p className="text-sm text-blue">
                  {career.institution} <span className="text-gray-200">|</span> {career.task} <span className="text-gray-200">|</span> {career.term}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 한줄 소개 */}
        <label className="block mt-6 font-medium text-gray-700">한줄 소개</label>
        <input
          type="text"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
          placeholder="한줄 소개를 입력해 주세요."
        />

        {/* 차량 소유 선택 */}
        <div className="mt-6 flex items-center justify-between">
          <p className="font-medium text-gray-600">개인 차량을 소유하고 계신가요?</p>
          <button
            type='button'
            className={'w-8 h-8'}
            onClick={(event) => {
              event.preventDefault();
              setHasCar(!hasCar);
            }}
          >
            <CheckIcon selected={hasCar} />
          </button>
        </div>

        {/* 치매 교육 이수 여부 선택 */}
        <div className="mt-6 flex items-center justify-between">
          <p className="font-medium text-gray-600">치매 교육을 이수하셨나요?</p>
          <button
            type='button'
            className={'w-8 h-8'}
            onClick={(event) => {
              event.preventDefault();
              setDementiaTraining(!dementiaTraining);
            }}
          >
            <CheckIcon selected={dementiaTraining} />
          </button>
        </div>

        {/* 확인 버튼 */}
        <input
          type="submit"
          className="w-full mt-6 bg-orange text-white py-3 rounded-lg text-lg font-semibold"
          value="확인"
          style={{ cursor: 'pointer' }}
        />
      </form>
    </div>
  );
}