import { useEffect, useRef } from 'react';

declare global {
  interface KakaoMap {
    setCenter(position: KakaoLatLng): void;
    getCenter(): KakaoLatLng;
    setLevel(level: number): void;
    getLevel(): number;
  }

  interface KakaoMarker {
    setPosition(position: KakaoLatLng): void;
    getPosition(): KakaoLatLng;
  }

  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        services: {
          Geocoder: new () => {
            addressSearch: (address: string, callback: (result: KakaoAddressResult[], status: string) => void) => void;
          };
          Status: {
            OK: string;
          };
        };
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
        Marker: new (options: { position: KakaoLatLng; map: KakaoMap }) => KakaoMarker;
      };
    };
  }
}

interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
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
        if (!mapRef.current) {
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: KakaoAddressResult[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const map = new window.kakao.maps.Map(mapRef.current!, {
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
