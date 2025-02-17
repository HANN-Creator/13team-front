'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 카카오 API를 이용한 센터 검색
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/kakao-search?query=${query}`);
      const data = await response.json();
      setSearchResults(data.documents || []);
    } catch (error) {
      console.error('검색 오류:', error);
      setSearchResults([]);
    }
  };

  // 센터 선택 시 모달 표시
  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 relative">
      {/* 상단 네비게이션 */}
      <button onClick={() => router.back()} className="text-gray-600 text-lg">
        ←
      </button>

      {/* 진행 상태 바 */}
      <div className="mt-3 w-full flex">
        <div className="h-1 w-1/3 bg-orange-500 rounded"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded mx-1"></div>
        <div className="h-1 w-1/3 bg-gray-300 rounded"></div>
      </div>

      {/* 타이틀 */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        어느 센터에서 근무 중이신가요?
      </h2>
      <p className="text-gray-600 mt-2">근처의 요양보호사 분들을 추천해드릴게요.</p>

      {/* 검색 입력창 */}
      <div className="mt-6 relative">
        <FiSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="건물명 또는 주소를 입력해주세요."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 ? (
        <div className="mt-4 bg-white rounded-lg shadow-md max-h-64 overflow-y-auto">
          {searchResults.map((center) => (
            <div
              key={center.id}
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleSelectCenter(center)}
            >
              <p className="text-lg font-bold">{center.place_name}</p>
              <p className="text-sm text-gray-600">{center.address_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-4">검색 결과가 없습니다.</p>
      )}

      {/* 직접 센터 등록 버튼 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">센터가 검색이 안되시나요?</p>
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition mt-2"
          onClick={() => router.push('/register/custom-center')}
        >
          직접 센터 등록하기
        </button>
      </div>

      {/* 모달 창 */}
      {showModal && selectedCenter && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full max-w-md">
            <p className="text-lg font-semibold mb-4">아래의 지역에 거주하시는 게 맞나요?</p>
            <div className="p-4 border rounded-md">
              <p className="text-lg font-bold">{selectedCenter.place_name}</p>
              <p className="text-sm text-gray-600">{selectedCenter.address_name}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="w-1/2 bg-orange-500 text-white py-3 rounded-lg font-semibold mr-2"
                onClick={() => {
                  setShowModal(false);
                  router.push('/register/name'); // 이름 입력 페이지로 이동
                }}
              >
                맞아요
              </button>
              <button
                className="w-1/2 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
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
