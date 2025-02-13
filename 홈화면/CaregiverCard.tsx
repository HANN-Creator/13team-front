"use client"; // ✅ 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";

interface Caregiver {
  name: string;
  intro: string;
  proposals: number;
}

export default function CaregiverCard() {
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);

  useEffect(() => {
    // ✅ API에서 데이터 가져오기 (실제 API 주소로 변경 필요)
    fetch("/api/caregiver") 
      .then((res) => res.json())
      .then((data) => setCaregiver(data))
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center my-4">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      </div>
      
      {caregiver ? (
        <>
          <h2 className="text-lg font-bold mt-2">{caregiver.name}</h2>
          <p className="text-gray-600">{caregiver.intro}</p>
          <p className="mt-2 text-blue-600 font-semibold">
            새로운 제안이 {caregiver.proposals}건 들어왔어요!
          </p>
        </>
      ) : (
        <p className="text-gray-500 mt-2">로딩 중...</p>
      )}
    </div>
  );
}
