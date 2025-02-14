'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter(); // 사용하지 않아서 ESLint 경고 발생
  const searchParams = useSearchParams();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    console.log(router, name, phone, position);
  }, [router, name, phone, position]);
  

  // URL에서 이전 입력 데이터 가져오기
  useEffect(() => {
    const nameFromParams = searchParams.get('name');
    const phoneFromParams = searchParams.get('phone');
    const positionFromParams = searchParams.get('position');

    if (nameFromParams) setName(decodeURIComponent(nameFromParams));
    if (phoneFromParams) setPhone(decodeURIComponent(phoneFromParams));
    if (positionFromParams) setPosition(decodeURIComponent(positionFromParams));
  }, [searchParams]);

  // 회원가입 완료 후 이동
  const handleRegister = () => {
    if (id.trim() && password.trim()) {
      router.push(`/register/success?name=${encodeURIComponent(name)}`); // router 사용
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600 text-lg">
          ←
        </button>
        <p className="text-lg font-bold">회원가입</p>
        <div></div> {/* 중앙 정렬을 위해 빈 div 추가 */}
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-1 w-1/3 bg-orange-500 rounded"></div>
      </div>

      {/* 회원가입 안내 */}
      <p className="text-sm text-gray-600 mt-6">마지막 단계예요!</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        로그인 시 사용하실 아이디와 <br /> 비밀번호를 입력해주세요!
      </h2>

 
      {/* 아이디 입력 필드 */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">아이디</label>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* 확인 버튼 */}
      <button
        className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
        disabled={!id || !password}
        onClick={handleRegister}
      >
        확인
      </button>
    </div>
  );
}
