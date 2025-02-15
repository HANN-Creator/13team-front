'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

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
    { id: 1, address: '서울시 영등포구 여의도동', post: '06635'},
    { id: 2, address: '서울시 영등포구 여의도동', post: '06636'},
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
    <div className="min-h-screen bg-gray-50 px-6 py-4 relative">
      {/* 상단 네비게이션 */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-0 text-gray-600 text-lg">
          ←
        </button>
        <p className="text-lg font-bold text-gray-600">회원가입</p>
      </div>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-1 w-1/3 bg-orange rounded mx-1"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-2xl font-bold text-gray-600">
        어느 지역에 거주 중이신가요?
      </h2>
      <p className="text-gray-500 mt-2">거주지 근처의 센터를 추천해 드릴게요.</p>

      {/* 검색 입력창 */}
      <div className="mt-6 relative">
        <FiSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="도로명주소 또는 우편번호를 입력해 주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-12 border border-gray-200 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange"
        />
      </div>

      {/* 검색 결과 */}
      {filteredAddresses.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-md max-h-64 overflow-y-auto">
          {filteredAddresses.map((adr) => (
            <div
              key={adr.id}
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleSelectAddress(adr)}
            >
              <p className="text-sm text-gray-350">도로명주소 <span className="pl-2 text-lg font-bold text-black">{adr.address}</span></p>
              <p className="text-sm text-gray-350">우편번호 <span className="pl-6 text-sm text-black">{adr.post}</span></p>
            </div>
          ))}
        </div>
      )}

      {/* 모달 창 */}
      {showModal && selectedAddress && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full max-w-md">
            <p className="text-lg font-semibold mb-4 text-gray-600">아래의 지역에 거주하시는 게 맞나요?</p>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-350">도로명주소 <span className="pl-2 text-lg font-bold text-gray-600">{selectedAddress.address}</span></p>
              <p className="text-sm text-gray-350">우편번호 <span className="pl-6 text-sm text-gray-600">{selectedAddress.post}</span></p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="w-1/2 bg-orange text-white py-3 rounded-lg font-semibold mr-2"
                onClick={() => {
                  setShowModal(false);
                  const nextUrl = `/register/selectiveInformation?role=${encodeURIComponent(role)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&residence=${encodeURIComponent(selectedAddress.address)}`;
                  router.push(nextUrl); // 선택 정보 입력 페이지로 이동
                }}
              >
                맞아요
              </button>
              <button
                className="w-1/2 bg-gray-200 text-gray-400 py-3 rounded-lg font-semibold"
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