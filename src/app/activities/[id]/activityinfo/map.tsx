import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoAddressResult {
  x: number;
  y: number;
}

export default function Map({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: KakaoAddressResult[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const map = new window.kakao.maps.Map(mapRef.current, {
              center: coords,
              level: 3,
            });
            new window.kakao.maps.Marker({ position: coords, map: map });
          }
        });
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);
  return <div ref={mapRef} style={{ width: '100%', height: '476px' }} />;
}
