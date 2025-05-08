import React, { useState, useEffect } from 'react';
import { getMyInfo } from '../apis/auth';

const MyPage = () => {
  const [data, setData] = useState<{ name?: string; email?: string }>({}); // 초기값을 객체로 설정

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response); // 반환값 구조 확인
        setData(response.data); // response.data를 상태로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {data.name ? (
        <>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </>
      ) : (
        <p>Loading...</p> // 데이터가 없을 때 로딩 메시지 표시
      )}
    </div>
  );
};

export default MyPage;
