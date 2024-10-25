import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (!isKakaoLoaded || !mapRef.current || !window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const options = {
            center: coords,
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);

          new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
        } else {
          console.error('주소를 찾을 수 없습니다.');
        }
      });
    });
  }, [isKakaoLoaded, address]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        onLoad={() => setIsKakaoLoaded(true)}
      />
      <div ref={mapRef} style={{ width: '100%', height: '476px' }}>
        {!isKakaoLoaded && <p>지도를 불러오는 중...</p>}
      </div>
    </>
  );
}
