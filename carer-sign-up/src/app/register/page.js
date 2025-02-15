'use client';

import { useRouter,useSearchParams } from 'next/navigation';
import { useState,useEffect } from 'react';

export default function NamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // URL에서 role값 가져오기
    const roleFromParams = searchParams.get('role');
    if (roleFromParams) setRole(decodeURIComponent(roleFromParams));
  }, [searchParams]);

  const handleNext = async (event) => {
    event.preventDefault(); // 기본 동작 방지
    if (name.trim()) {
      try {
        // API 호출
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role, name }),
        }
        // const response = await fetch('/auth/carer/register', options);
        const response = await fetch('http://localhost:9999/posts', options);
        if (!response.ok) {
          throw new Error('API 요청 실패');
          console.error('API 요청 실패:', response.status, response.statusText, errorText);
        }
        const data = await response.json();
        console.log(data);

        // 이름 값을 다음 페이지로 넘길 수 있도록 URL 파라미터 사용
        const nextUrl = `/register/phone?role=${encodeURIComponent(role)}&name=${encodeURIComponent(name)}`;
        router.push(nextUrl); // 다음 페이지로 이동
      }
      catch (error) {
        console.error('API 호출 중 오류 발생:',error);
      }
    }
  };

  if (role === "caregiver"){
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-4">
        {/* 상단 네비게이션 */}
        <div className="relative flex items-center justify-center">
          <button onClick={() => router.back()} className="absolute left-0 text-gray-600 text-lg">
            ←
          </button>
          <p className="text-lg font-bold">회원가입</p>
        </div>
  
        {/* 진행 상태 바 */}
        <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-1 w-1/3 bg-orange rounded mx-1"></div>
          <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        </div>
  
        {/* 타이틀 */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900">이름이 어떻게 되세요?</h2>
        <p className="text-gray-600 mt-2">센터 관리자분들이 필요로 하시는 정보를 받아볼게요.</p>
      
      <form onSubmit={handleNext}>
        {/* 이름 입력 필드 */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange"
          />
        </div>
  
        {/* 확인 버튼 */}
        <input
          type="submit"
          className="w-full mt-6 bg-orange text-white py-3 rounded-lg text-lg font-semibold"
          disabled={!name}
          value="확인"
          style={{ cursor: 'pointer' }}
        />
      </form>
    </div>
    );
  } else {
    return null; // role이 caregiver가 아닌 경우 아무것도 렌더링하지 않음
  }
}