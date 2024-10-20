import React, { useState } from 'react';
import axios from 'axios';

export default function AddressT() {
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');

  const fetchAddress = async (zip: string) => {
    try {
      const response = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
      );
      const result = response.data.results?.[0];
      
      if (result) {
        const { address1, address2, address3 } = result;
        setAddress(`${address1} ${address2} ${address3}`);
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소 조회 실패:', error);
      setAddress('오류가 발생했습니다.');
    }
  };

  const onZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setZipCode(zip);

    if (zip.length === 7) {
      fetchAddress(zip);
    }else{
        setAddress('');
    }
  };

  return (
    <div>
      <label>우편번호: </label>
      <input 
        type="text" 
        value={zipCode} 
        onChange={onZipCodeChange} 
        maxLength={7} 
        placeholder="7자리 우편번호 입력" 
      />
      <div>
        <label>주소: </label>
        <input 
          type="text" 
          value={address} 
          readOnly 
          placeholder="주소가 여기에 표시됩니다." 
        />
      </div>
    </div>
  );
};

