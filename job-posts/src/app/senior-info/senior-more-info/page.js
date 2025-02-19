'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../Modal';

export default function SeniorMoreInformationPage() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [careDays, setCareDays] = useState([]);
  const [careStartHour, setCareStartHour] = useState('10:00');
  const [careEndHour, setCareEndHour] = useState('18:00');
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const careDaysList = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const additionalInfoList = ['가사도우미 있음', '주차가능', '반려동물 있음', '집 평수 30평 이상'];

  // 다음 단계로 이동 (채용 공고 등록 페이지)
  const handleNext = (event) => {
    event.preventDefault(); // 기본 동작 방지
    if (!address) {
      alert('거주지를 선택해 주세요.');
      return;
    }
    if (!careDays.length) {
      alert('돌봄을 필요로 하는 요일을 선택해 주세요.');
      return;
    }
    if (!careStartHour.length) {
      alert('돌봄을 필요로 하는 시간을 선택해 주세요.');
      return;
    }
    else router.push('/senior-info/service');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* 상단 네비게이션 */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-0 text-gray-500 text-lg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 24L12 16L20 8" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-lg font-semibold text-gray-600">어르신 정보 등록</p>
        <button onClick={() => setShowModal(true)} className="absolute right-0 font-semibold text-gray-400 text-base">
          임시저장
        </button>
        <Modal 
            showModal={showModal} 
            onClose={() => {setShowModal(false);}} 
            onConfirm={() => {
                setShowModal(false);
                router.push('/'); // 홈으로 이동
        }}/>
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px]"></div>
        <div className="h-[6px] w-1/3 bg-orange rounded-[30px] mx-2"></div>
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px]"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-[26px] font-bold text-gray-600">어르신 상세 정보를 받아볼게요!</h2>
      <p className="text-base font-medium text-gray-500 mt-3">보다 원활한 연결을 위해 필요한 정보예요.</p>

      <form onSubmit={handleNext}>
        {/* 거주지 선택 */}
        <div className="mt-12">
          <div>
            <p className="text-lg font-bold text-gray-600">
              어느 지역에 거주 중이신가요?&nbsp;
              <span className="text-red">
                *
              </span>
            </p>
          </div>
          {/* 검색 입력창 */}
            <div className="mt-3 relative">
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                >
                    <path d="M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                type="text"
                placeholder="지역을 선택해 주세요."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-200 placeholder:text-base rounded-[100px] focus:outline-none focus:ring-2 focus:ring-orange"
                />
                <svg 
                    width="8" 
                    height="12" 
                    viewBox="0 0 8 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                        <path d="M1.5 11L6.5 6L1.5 1" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>

        {/* 요일 선택 */}
        <div className="mt-12">
          <div>
            <p className="text-lg font-bold text-gray-600">
              돌봄을 필요로 하시는 요일이 어떻게 되세요?&nbsp;
              <span className="text-red">
                *
              </span>
            </p>
            <p className="font-normal text-sm text-gray-400 mt-1">중복 선택 가능</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-base font-semibold">
            {careDaysList.map((day, index) => (
              <button
                type='button'
                key={index}
                className={`w-[calc(50%-0.75rem)] py-4 rounded-[61px] border ${
                  careDays.includes(day) ? 'bg-orange bg-opacity-10 border-orange text-orange' : 'bg-white text-gray-600'
                }`}
                onClick={() => {
                  setCareDays((prev) =>
                    prev.includes(day) ? prev.filter((req) => req !== day) : [...prev, day]
                  );
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 돌봄 시간 선택 */}
        <div className="mt-12">
          <div>
            <p className="text-lg font-bold text-gray-600">
              돌봄을 필요로 하시는 시간이 어떻게 되세요?&nbsp;
              <span className="text-red">
                *
              </span>
            </p>
            <p className="font-normal text-sm text-gray-400 mt-1">채용 공고 등록 또는 프로필에서 변경이 가능해요.</p>
          </div>
          <div className="mt-3 flex gap-3 items-center">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-500">시작 시간</label>
              <select
                value={careStartHour}
                onChange={(e) => setCareStartHour(e.target.value)}
                className="w-full mt-2 p-3 text-base font-semibold text-gray-600 border border-gray-200 rounded-[9px] focus:outline-none focus:ring-2 focus:ring-orange"
              >
                {/* 시간 옵션 추가 */}
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>
                    {`${i < 10 ? '0' : ''}${i}:00`}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-gray-600 mt-6">~</span>
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-500">종료 시간</label>
              <select
                value={careEndHour}
                onChange={(e) => setCareEndHour(e.target.value)}
                className="w-full mt-2 p-3 text-base font-semibold text-gray-600 border border-gray-200 rounded-[9px] focus:outline-none focus:ring-2 focus:ring-orange"
              >
                {/* 시간 옵션 추가 */}
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i < 10 ? '0' : ''}${i}:00`}>
                    {`${i < 10 ? '0' : ''}${i}:00`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 추가 사항 */}
        <div className="mt-12">
          <div>
            <p className="text-lg font-bold text-gray-600">근무지의 부가사항을 선택해 주세요.</p>
            <p className="font-normal text-sm text-gray-400 mt-1">중복 선택 가능</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-base font-semibold">
            {additionalInfoList.map((additional, index) => (
              <button
                type='button'
                key={index}
                className={`w-[calc(50%-0.75rem)] py-4 rounded-[61px] border ${
                  additionalInfo.includes(additional) ? 'bg-orange bg-opacity-10 border-orange text-orange' : 'bg-white text-gray-600'
                }`}
                onClick={() => {
                  setAdditionalInfo((prev)=>
                    prev.includes(additional) ? prev.filter((req) => req !== additional) : [...prev, additional]
                )}}
              >
                {additional}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-14">
          {/* 이전 버튼 */}
          <button
            type="button"
            className="w-1/3 bg-gray-200 text-white py-3 rounded-[9px] text-base font-semibold mx-1"
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          >
            이전
          </button>

          {/* 다음으로 버튼 */}
          <button
            type="submit"
            className="w-2/3 bg-orange text-white py-3 rounded-[9px] text-base font-semibold mx-1"
            style={{ cursor: 'pointer' }}
          >
            다음으로 이동
          </button>
        </div>
      </form>
    </div>
  );
}