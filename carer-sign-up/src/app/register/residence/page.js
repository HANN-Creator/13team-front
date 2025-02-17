'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ResidencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);

    // URL에서 이름과 전화번호 가져오기
    useEffect(() => {
      const roleFromParams = searchParams.get('role');
      const nameFromParams = searchParams.get('name');
      const phoneFromParams = searchParams.get('phone');
      if (roleFromParams) setRole(decodeURIComponent(roleFromParams));
      if (nameFromParams) setName(decodeURIComponent(nameFromParams));
      if (phoneFromParams) setPhone(decodeURIComponent(phoneFromParams));
    }, [searchParams]);

  // 주소 리스트 (예제 데이터)
  const addressList = [
    { id: 1, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 2, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 3, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 4, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 5, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 6, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 7, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 8, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 9, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 10, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 11, address: '서울시 영등포구 여의도동', post: '06636' },
    { id: 12, address: '서울시 영등포구 여의도동', post: '06635' },
    { id: 13, address: '서울시 영등포구 여의도동', post: '06636' },
  ];

  // 검색어에 따라 필터링
  const filteredAddresses = search
    ? addressList.filter((adr) => adr.address.includes(search))
    : [];

  // 주소 선택 시 모달 표시
  const handleSelectAddress = (adr) => {
    setSelectedAddress(adr);
    setShowModal(true);
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
        <p className="text-lg font-semibold text-gray-600">회원가입</p>
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px]"></div>
        <div className="h-[6px] w-1/3 bg-orange rounded-[30px] mx-2"></div>
        <div className="h-[6px] w-1/3 bg-gray-300 rounded-[30px]"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-[26px] font-bold text-gray-600">
        어느 지역에 거주 중이신가요?
      </h2>
      <p className="text-base font-medium text-gray-500 mt-3">거주지 근처의 센터를 추천해 드릴게요.</p>

      {/* 검색 입력창 */}
      <div className="mt-8 relative">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
        >
          <path d="M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="도로명주소 또는 우편번호를 입력해 주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-200 placeholder:text-sm rounded-[100px] focus:outline-none focus:ring-2 focus:ring-orange"
        />
      </div>

      <div className="relative">
        {/* 검색 결과 */}
        {filteredAddresses.length > 0 && (
          <div className="mt-4 rounded-lg max-h-[400px] overflow-y-auto">
            {filteredAddresses.map((adr) => (
              <div
                key={adr.id}
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleSelectAddress(adr)}
              >
                <p className="font-semibold text-sm text-gray-350">도로명주소 <span className="pl-2 font-bold text-lg text-gray-600">{adr.address}</span></p>
                <p className="font-semibold text-sm text-gray-350">우편번호 <span className="pl-6 font-normal text-base text-500">{adr.post}</span></p>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>

      {/* 모달 창 */}
      {showModal && selectedAddress && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-t-3xl shadow-lg w-full max-w-md">
            <p className="font-bold mb-4 text-xl text-gray-600">아래의 지역에 거주하시는 게 맞나요?</p>
            <div className="p-4">
              <p className="font-semibold text-sm text-gray-350">도로명주소 <span className="pl-2 font-bold text-lg text-gray-600">{selectedAddress.address}</span></p>
              <p className="font-semibold text-sm text-gray-350">우편번호 <span className="pl-6 font-normal text-base text-gray-500">{selectedAddress.post}</span></p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="w-1/2 bg-orange text-white py-3 rounded-[7px] font-semibold text-base mr-2"
                onClick={() => {
                  setShowModal(false);
                  const nextUrl = `/register/selectiveInformation?role=${encodeURIComponent(role)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&residence=${encodeURIComponent(selectedAddress.address)}`;
                  router.push(nextUrl); // 선택 정보 입력 페이지로 이동
                }}
              >
                맞아요
              </button>
              <button
                className="w-1/2 text-gray-400 border boder-gray-200 py-3 rounded-[7px] font-semibold text-base"
                onClick={() => setShowModal(false)}
              >
                아니에요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}