import React, { useState } from 'react';
import { Search, MapPin, Star, Utensils, ChevronRight, AlertCircle, ArrowLeft, RotateCw } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => {
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('input');

  const loadGoogleMaps = () => {
    return new Promise((resolve) => {
      if (window.google?.maps?.importLibrary) return resolve();
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  };

  const searchRestaurants = async (e) => {
    if (e) e.preventDefault();
    if (!city.trim() || !food.trim()) return setError('도시와 메뉴를 입력해주세요.');

    setLoading(true);
    setError('');
    setStep('loading');

    try {
      await loadGoogleMaps();
      const { Place } = await window.google.maps.importLibrary("places");
      
      const query = `일본 ${city} ${food} 맛집`;
      const { places } = await Place.searchByText({
        textQuery: query,
        fields: ['displayName', 'formattedAddress', 'rating', 'userRatingCount', 'id'],
      });

      if (!places?.length) throw new Error('결과가 없습니다.');

      const filtered = places
        .filter(p => !p.formattedAddress.includes("대한민국"))
        .map(p => ({
          id: p.id,
          name: p.displayName,
          rating: p.rating || 0,
          reviewCount: p.userRatingCount || 0,
          address: p.formattedAddress,
        }))
        .sort((a, b) => b.rating - a.rating);

      setResults(filtered);
      setStep('results');
    } catch (err) {
      setError('맛집을 불러오지 못했습니다. 다시 시도해주세요.');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-gray-800 relative overflow-hidden">
      {/* 배경 애니메이션 생략 (기존 코드와 동일하게 유지 가능) */}
      
      <main className="max-w-md mx-auto pt-20 px-6">
        {step === 'input' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold leading-tight">일본,<br />어디서 드시나요?</h1>
            <form onSubmit={searchRestaurants} className="space-y-4">
              <input 
                className="w-full p-4 rounded-2xl border bg-white/60 backdrop-blur-md" 
                placeholder="도시 (예: 도쿄)" 
                value={city} 
                onChange={e => setCity(e.target.value)}
              />
              <input 
                className="w-full p-4 rounded-2xl border bg-white/60 backdrop-blur-md" 
                placeholder="메뉴 (예: 라멘)" 
                value={food} 
                onChange={e => setFood(e.target.value)}
              />
              <button className="w-full py-4 bg-black text-white rounded-2xl font-bold">맛집 검색하기</button>
            </form>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </div>
        )}

        {step === 'loading' && (
          <div className="text-center py-20">
            <RotateCw className="animate-spin mx-auto mb-4 text-blue-500" />
            <p>맛집을 찾고 있어요...</p>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">검색 결과</h2>
              <button onClick={() => setStep('input')} className="p-2 bg-white rounded-full border"><ArrowLeft size={18}/></button>
            </div>
            {results.map(item => (
              <div key={item.id} className="p-5 bg-white rounded-[24px] shadow-sm border border-white">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.address}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Star size={14} className="fill-orange-500 text-orange-500" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-xs text-gray-400">리뷰 {item.reviewCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
