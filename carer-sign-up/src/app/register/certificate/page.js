'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckIcon from '../../CheckIcon';

export default function CertificationPage() {
    const router = useRouter();
    const [certNumber, setCertNumber] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [hasNurseCert, setHasNurseCert] = useState(false);
    const [selectedNurseLevel, setSelectedNurseLevel] = useState(null);
    const [hasSocialWorkerCert, setHasSocialWorkerCert] = useState(false);

    const formatCertNumber = (value) => {
      // 숫자만 남기기
      const onlyNums = value.replace(/\D/g, '');
      
      // "20XX-XXXXXXX" 형식 적용
      if (onlyNums.length <= 4) {
        return onlyNums; // 20XX (입력 중)
      } else {
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 11); // 20XX-XXXXXXX
      }
    };
    
    const handleCertNumberChange = (event) => {
      const formattedValue = formatCertNumber(event.target.value);
      setCertNumber(formattedValue);
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedImage(URL.createObjectURL(file));
      }
    }

    // 다음 단계로 이동 (가입 성공 페이지)
    const handleNext = (event) => {
      event.preventDefault(); // 기본 동작 방지
      if (!certNumber || certNumber.length < 12) {
        alert('요양 보호사 자격증 번호를 입력해 주세요.');
        return;
      }
      if (!uploadedImage) {
        alert('자격증 사진을 업로드해 주세요.');
        return;
      }
      else router.push('/register/success');
    };

    const handleNurseCertToggle = (event) => {
      event.preventDefault();
      if (hasNurseCert) {
        setSelectedNurseLevel(null); // 선택된 급수 초기화
      }
      setHasNurseCert(!hasNurseCert);
    };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
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
        <div className="h-1 w-1/3 bg-gray-300 rounded mx-1"></div>
        <div className="h-1 w-1/3 bg-orange rounded"></div>
      </div>

      {/* 타이틀 */}
      <p className="text-gray-500 mt-6">마지막 단계예요!</p>
      <h2 className="mt-3 text-2xl font-bold text-gray-600">소유하고 계신 자격증을 입력해 주세요.</h2>

      <form onSubmit={handleNext}>
        {/* 요양 보호사 자격증 번호 입력 필드 */}
        <div className="mt-8">
          <label className="block font-medium text-gray-500">요양 보호사 자격증 번호(필수)</label>
          <input
            type="text"
            placeholder="20xx-xxxxxxx 형식으로 입력해 주세요."
            value={certNumber}
            onChange={handleCertNumberChange}
            className="w-full p-3 border border-gray-200 placeholder-gray-400 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-orange"
            maxLength={12}
          />

          {/* 자격증 사진 업로드 */}
          <p className="mt-6 font-medium text-gray-500">인증을 위해 자격증 사진을 업로드해 주세요.</p>
          <label className="mt-2 flex flex-col items-center justify-center w-full h-40 border-gray-70 rounded-lg cursor-pointer bg-gray-70">
            {uploadedImage ? (
              <img src={uploadedImage} alt="자격증 미리보기" className="h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center">
                <span className="mt-2 text-orange font-semibold">사진 업로드하기 +</span>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>

          {/* 간호조무사 자격증 보유 선택 */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-500">간호조무사 자격증 보유</p>
              <button
                type='button'
                className={'ml-auto w-8 h-8'}
                onClick={handleNurseCertToggle}
              >
                <CheckIcon selected={hasNurseCert} />
              </button>
            </div>

            {hasNurseCert && (
              <div className="flex gap-3 mt-2">
              {['1급', '2급'].map((level) => (
                <button
                  type='button'
                  key={level}
                  className={`px-20 py-2 rounded-full border ${
                    selectedNurseLevel === level ? 'bg-orange text-white' : 'bg-white text-gray-600'
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedNurseLevel(level);
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
            )}
          </div>
          
          {/* 사회복지사 자격증 보유 선택 */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-medium text-gray-500">사회복지사 자격증 보유</p>
            <button
              type='button'
              className={'w-8 h-8'}
              onClick={(event) => {
                event.preventDefault();
                setHasSocialWorkerCert(!hasSocialWorkerCert);
              }}
            >
              <CheckIcon selected={hasSocialWorkerCert} />
            </button>
          </div>
        </div>

        {/* 확인 버튼 */}
        <input
          type="submit"
          className="w-full mt-6 bg-orange text-white py-3 rounded-lg text-lg font-semibold"
          value="회원가입 완료하기"
          style={{ cursor: 'pointer' }}
        />
      </form>
    </div>
  );
}