'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function selectiveInformationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [period, setPeriod] = useState('');

  // URL에서 이름, 전화번호, 거주지 가져오기
  useEffect(() => {
    const roleFromParams = searchParams.get('role');
    const nameFromParams = searchParams.get('name');
    const phoneFromParams = searchParams.get('phone');
    const residenceFromParams = searchParams.get('residence');
    if (roleFromParams) setRole(decodeURIComponent(roleFromParams));
    if (nameFromParams) setName(decodeURIComponent(nameFromParams));
    if (phoneFromParams) setPhone(decodeURIComponent(phoneFromParams));
    if (residenceFromParams) setSelectedAddress(decodeURIComponent(residenceFromParams).split('%20'));  // 시, 구, 동으로 분리
  }, [searchParams]);

  // 다음 단계로 이동 (certificate 페이지)
  const handleNext = () => {
    if (period.trim()) {
        const nextUrl = `/register/certificate?role=${encodeURIComponent(role)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&residence=${encodeURIComponent(selectedAddress.address)}&period=${encodeURIComponent(period)}`;
        router.push(nextUrl);
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
        <button onClick={() => {
            router.push(`/register/certificate?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&residence=${encodeURIComponent(selectedAddress)}`)
            }} className="absolute right-0 text-gray-400 text-md">
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

      {/* 직책 입력 필드 */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-500">경력 기간</label>
        <input
          type="text"
          placeholder="경력 기간을 입력해주세요. (예: 2년)"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange"
        />
      </div>

      {/* 확인 버튼 */}
      <button
        className="w-full mt-6 bg-orange text-white py-3 rounded-lg text-lg font-semibold"
        disabled={!period}
        onClick={handleNext} // 클릭 시 자격증 입력 페이지로 이동
      >
        확인
      </button>
    </div>
  );
}