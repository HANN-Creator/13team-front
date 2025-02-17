const BASE_URL = 'https://0a69-121-134-41-93.ngrok-free.app'; // 백엔드 주소

// 🔹 로그인 API 요청
export async function loginUser(data) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    return { message: '네트워크 오류. 다시 시도해주세요.' };
  }
}

// 🔹 회원가입 API 요청
export async function registerUser(data) {
  try {
    const response = await fetch(`${BASE_URL}/auth/carer/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    return { message: '네트워크 오류. 다시 시도해주세요.' };
  }
}

// 🔹 사용자 정보 조회 (예: 로그인된 사용자 정보 불러오기)
export async function getUserProfile(token) {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('사용자 정보를 가져오지 못했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    return { message: '사용자 정보를 불러오지 못했습니다.' };
  }
}
