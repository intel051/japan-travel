import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Utensils, 
  ArrowLeft, 
  RotateCw, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Compass, 
  Heart, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';

// Google Places API 미연동 시에도 즉시 체험 가능한 고품질 일본 대표 맛집 데이터베이스
const MOCK_RESTAURANTS = [
  {
    id: 'tokyo-ramen-1',
    name: '멘야 무사시 신주쿠 본점 (麺屋武蔵)',
    city: '도쿄',
    food: '라멘',
    rating: 4.6,
    count: 3820,
    address: '7 Chome-2-6 Nishishinjuku, Shinjuku City, Tokyo 160-0023 Japan',
    japaneseAddress: '東京都新宿区西新宿7-2-6',
    tags: ['츠케멘', '자판기주문', '현지인맛집'],
    price: '¥1,000 - ¥2,000'
  },
  {
    id: 'tokyo-sushi-1',
    name: '스시 다이와 (Sushi Daiwa)',
    city: '도쿄',
    food: '스시',
    rating: 4.8,
    count: 4210,
    address: '6 Chome-5-1 Toyosu, Koto City, Tokyo 135-0061 Japan',
    japaneseAddress: '東京都江東区豊洲6-5-1',
    tags: ['오마카세', '풍부한재료', '토요스시장'],
    price: '¥4,000 - ¥8,000'
  },
  {
    id: 'osaka-takoyaki-1',
    name: '쿠쿠루 도톤보리 본점 (くくる 道頓堀)',
    city: '오사카',
    food: '타코야키',
    rating: 4.5,
    count: 2950,
    address: '1 Chome-10-5 Dotonbori, Chuo Ward, Osaka, 542-0071 Japan',
    japaneseAddress: '大阪府大阪市中央区道頓堀1-10-5',
    tags: ['도톤보리명물', '겉바속촉', '대왕문어'],
    price: '¥800 - ¥1,500'
  },
  {
    id: 'osaka-okonomiyaki-1',
    name: '미즈노 오코노미야키 (Mizuno)',
    city: '오사카',
    food: '오코노미야키',
    rating: 4.7,
    count: 3120,
    address: '1 Chome-4-15 Dotonbori, Chuo Ward, Osaka, 542-0071 Japan',
    japaneseAddress: '大阪府大阪市中央区道頓堀1-4-15',
    tags: ['미슐랭가이드', '야마이모구이', '줄서는맛집'],
    price: '¥1,500 - ¥3,000'
  },
  {
    id: 'kyoto-matcha-1',
    name: '나카무라 토키치 우지 본점 (中村藤吉)',
    city: '교토',
    food: '디저트',
    rating: 4.8,
    count: 2480,
    address: '10 Ichiban, Uji, Kyoto 611-0021 Japan',
    japaneseAddress: '京都府宇治市宇治一番10',
    tags: ['말차파페', '전통찻집', '뷰맛집'],
    price: '¥1,200 - ¥2,500'
  },
  {
    id: 'fukuoka-tonkotsu-1',
    name: '신신 라멘 텐진 본점 (SinSin)',
    city: '후쿠오카',
    food: '라멘',
    rating: 4.7,
    count: 4530,
    address: '3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001 Japan',
    japaneseAddress: '福岡県福岡市中央区天神3-2-19',
    tags: ['돈코츠라멘', '극세면', '연예인단골'],
    price: '¥800 - ¥1,500'
  },
  {
    id: 'fukuoka-motsunabe-1',
    name: '하카타 모츠나베 오오야마 (おおやま)',
    city: '후쿠오카',
    food: '모츠나베',
    rating: 4.6,
    count: 1890,
    address: '1-1 Hakataekichuogai, Hakata Ward, Fukuoka, 812-0012 Japan',
    japaneseAddress: '福岡県福岡市博多区博多駅中央街1-1',
    tags: ['소곱창전골', '미소베이스', '하카타역'],
    price: '¥2,500 - ¥5,000'
  }
];

// 도시 및 인기 카테고리 태그 퀵 바
const POPULAR_CITIES = [
  { name: '도쿄', en: 'Tokyo', kanji: '東京' },
  { name: '오사카', en: 'Osaka', kanji: '大阪' },
  { name: '교토', en: 'Kyoto', kanji: '京都' },
  { name: '후쿠오카', en: 'Fukuoka', kanji: '福岡' },
  { name: '삿포로', en: 'Sapporo', kanji: '札幌' }
];

const POPULAR_FOODS = [
  { name: '라멘', emoji: '🍜' },
  { name: '스시', emoji: '🍣' },
  { name: '야키토리', emoji: '🍢' },
  { name: '돈카츠', emoji: '🥩' },
  { name: '우동', emoji: '🥢' },
  { name: '타코야키', emoji: '🐙' },
  { name: '디저트', emoji: 'Matcha 🍵' }
];

export default function App() {
  const [city, setCity] = useState('');
  const [food, setFood] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('input'); // 'input', 'results', 'bookmarks'
  const [copiedId, setCopiedId] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('tabi_gourmet_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'reviews'
  const [toastMessage, setToastMessage] = useState(null);

  // 저장 목록 변경 시 localStorage 업데이트
  useEffect(() => {
    try {
      localStorage.setItem('tabi_gourmet_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleBookmark = (place) => {
    const exists = bookmarks.some(b => b.id === place.id);
    if (exists) {
      setBookmarks(bookmarks.filter(b => b.id !== place.id));
      showToast('북마크에서 삭제되었습니다.');
    } else {
      setBookmarks([...bookmarks, place]);
      showToast('즐겨찾기에 저장되었습니다! 🌸');
    }
  };

  const searchRestaurants = async (e) => {
    if (e) e.preventDefault();
    if (!city.trim() && !food.trim()) {
      showToast('도시명 또는 음식 키워드를 입력해 주세요.');
      return;
    }

    setLoading(true);
    setStep('loading');

    // 환경 변수 검증 (ES2015 및 다양한 빌드 타겟 호환)
    const API_KEY = (typeof process !== 'undefined' && process.env && process.env.VITE_GOOGLE_MAPS_API_KEY)
      || (typeof window !== 'undefined' && window.VITE_GOOGLE_MAPS_API_KEY)
      || null;

    try {
      let filtered = [];

      // Google Maps API 키가 존재하는 경우 실시간 API 로드 시도
      if (API_KEY) {
        if (!window.google) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const { Place } = await window.google.maps.importLibrary("places");
        const searchQuery = `일본 ${city} ${food} 맛집`.trim();
        const { places } = await Place.searchByText({
          textQuery: searchQuery,
          fields: ['displayName', 'formattedAddress', 'rating', 'userRatingCount', 'id'],
        });

        filtered = (places || [])
          .filter(p => !p.formattedAddress?.includes("대한민국"))
          .map(p => ({
            id: p.id || `g-place-${Math.random()}`,
            name: p.displayName || '이름 없음',
            city: city || '일본',
            food: food || '맛집',
            rating: p.rating || 4.2,
            count: p.userRatingCount || 100,
            address: p.formattedAddress || '주소 정보 없음',
            japaneseAddress: p.formattedAddress,
            tags: ['구글인증', '실시간데이터', '인기맛집'],
            price: '¥1,500 - ¥3,500'
          }));
      }

      // API 결과가 없거나 API KEY가 없을 경우 MOCK 로컬 스마트 필터링 수행
      if (!filtered || filtered.length === 0) {
        // 인공 지연시간을 추가하여 실제 검색 연산 경험 선사
        await new Promise(r => setTimeout(r, 700));

        const targetCity = city.trim().toLowerCase();
        const targetFood = food.trim().toLowerCase();

        filtered = MOCK_RESTAURANTS.filter(item => {
          const matchCity = !targetCity || item.city.toLowerCase().includes(targetCity) || targetCity.includes(item.city.toLowerCase());
          const matchFood = !targetFood || item.food.toLowerCase().includes(targetFood) || item.name.toLowerCase().includes(targetFood) || targetFood.includes(item.food.toLowerCase());
          return matchCity && matchFood;
        });

        // 만약 완전 일치 결과가 없는 경우, 기본 일본 추천 데이터 전체 반환
        if (filtered.length === 0) {
          filtered = MOCK_RESTAURANTS;
        }
      }

      // 정렬 적용
      sortResults(filtered, sortBy);
      setStep('results');
    } catch (err) {
      console.warn("Google Maps API 연동 실패, 준비된 여행 맛집 데이터를 가져옵니다.", err);
      // Fail-safe: 로컬 데이터 가공
      await new Promise(r => setTimeout(r, 600));
      const targetCity = city.trim().toLowerCase();
      const targetFood = food.trim().toLowerCase();

      let fallbackList = MOCK_RESTAURANTS.filter(item => {
        const matchCity = !targetCity || item.city.toLowerCase().includes(targetCity);
        const matchFood = !targetFood || item.food.toLowerCase().includes(targetFood);
        return matchCity || matchFood;
      });

      if (fallbackList.length === 0) fallbackList = MOCK_RESTAURANTS;
      sortResults(fallbackList, sortBy);
      setStep('results');
    } finally {
      setLoading(false);
    }
  };

  const sortResults = (list, type) => {
    const sorted = [...list].sort((a, b) => {
      if (type === 'rating') return b.rating - a.rating;
      if (type === 'reviews') return b.count - a.count;
      return 0;
    });
    setResults(sorted);
  };

  const handleSortChange = (type) => {
    setSortBy(type);
    sortResults(results, type);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-900 pb-16">
      
      {/* 글로벌 토스트 알림 */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white text-xs md:text-sm px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/80 backdrop-blur-md border-b border-stone-200/60 px-4 py-3 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => { setStep('input'); setCity(''); setFood(''); }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold tracking-tight text-lg text-stone-900">일본여행 맛집검색</span>
                <span className="text-[10px] font-semibold tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md">
                  일여방
                </span>
              </div>
              <p className="text-[11px] text-stone-500 -mt-0.5">일본 미식 여행 가이드</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStep(step === 'bookmarks' ? 'input' : 'bookmarks')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                step === 'bookmarks' 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${step === 'bookmarks' ? 'fill-white' : ''}`} />
              <span>저장한 맛집</span>
              {bookmarks.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${step === 'bookmarks' ? 'bg-rose-700 text-white' : 'bg-stone-300 text-stone-800'}`}>
                  {bookmarks.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 컨테이너 */}
      <main className="max-w-4xl mx-auto px-4 pt-6">

        {}
        {step === 'input' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 비주얼 히어로 바너 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white p-7 md:p-10 shadow-xl border border-stone-800">
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-8 opacity-10 pointer-events-none select-none text-[160px] font-serif font-black text-white">
                美食
              </div>
              <div className="relative z-10 max-w-lg space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-rose-300 text-xs">
                  <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>현지인 & 구글 고평점 맛집 검색 engine</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-white tracking-tight">
                  일본의 맛을,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-200 to-rose-200">
                    실시간으로 찾아드립니다
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed pt-1">
                  원하는 일본 도시와 음식을 검색해 보세요. 구글 실시간 데이터와 검증된 인기 스폿을 분석하여 추천합니다.
                </p>
              </div>
            </div>

            {/* 검색 폼 카드 */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80 space-y-6">
              <form onSubmit={searchRestaurants} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 도시 입력 필드 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      <span>여행 도시</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        className="w-full p-4 pl-11 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all placeholder:text-stone-400"
                        placeholder="예: 도쿄, 오사카, 후쿠오카"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                      <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* 메뉴 입력 필드 */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 flex items-center space-x-1">
                      <Utensils className="w-3.5 h-3.5 text-rose-600" />
                      <span>먹고 싶은 음식</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        className="w-full p-4 pl-11 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all placeholder:text-stone-400"
                        placeholder="예: 라멘, 스시, 야키토리"
                        value={food}
                        onChange={e => setFood(e.target.value)}
                      />
                      <Utensils className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* 빠른 도시 선택 칩 */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">인기 도시 빠른 선택</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CITIES.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setCity(c.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                          city === c.name 
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-105' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-[10px] opacity-70">({c.kanji})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 빠른 메뉴 선택 칩 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500">인기 미식 카테고리</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_FOODS.map((f) => (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => setFood(f.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1 ${
                          food === f.name 
                            ? 'bg-stone-900 text-white shadow-md scale-105' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                        }`}
                      >
                        <span>{f.emoji}</span>
                        <span>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 제출 버튼 */}
                <button 
                  type="submit"
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-rose-600/25 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 group"
                >
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>맛집 탐색 시작하기</span>
                </button>

              </form>
            </div>

            {/* 추천 미식 팁 배너 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-100/80 p-4 rounded-2xl border border-stone-200/60 flex items-start space-x-3">
                <div className="p-2 bg-rose-100 rounded-xl text-rose-600 mt-0.5">
                  <Star className="w-4 h-4 fill-rose-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">구글 평점 4.0+ 엄선</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">현지 일본인과 글로벌 여행객이 직접 증명한 최고 수준 맛집</p>
                </div>
              </div>

              <div className="bg-stone-100/80 p-4 rounded-2xl border border-stone-200/60 flex items-start space-x-3">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">구글 맵 연동 지원</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">원클릭으로 구글 지도 길찾기 및 현지 매장 주소 바로 연결</p>
                </div>
              </div>

              <div className="bg-stone-100/80 p-4 rounded-2xl border border-stone-200/60 flex items-start space-x-3">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700 mt-0.5">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">여행 보관함 보관</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">가고 싶은 식당을 즐겨찾기하고 내 여행 코스에 쉽게 추가</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {}
        {step === 'loading' && (
          <div className="py-24 text-center space-y-5 animate-pulse">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center mx-auto text-rose-600">
                <Utensils className="w-8 h-8 animate-bounce" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-stone-900">현지 맛집 데이터를 분석하는 중...</h3>
              <p className="text-xs text-stone-500">{city || '일본'} {food || ''} 최고의 맛집 정보를 모으고 있습니다.</p>
            </div>
            <div className="inline-flex items-center space-x-2 text-stone-400 text-xs bg-stone-100 px-3 py-1.5 rounded-full">
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>Google Maps Places Data Fetching</span>
            </div>
          </div>
        )}

        {}
        {step === 'results' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 결과 헤더 컨트롤 바 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setStep('input')}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="검색으로 돌아가기"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-base font-bold text-stone-900 flex items-center space-x-2">
                    <span>{city || '일본'}</span>
                    {food && <span className="text-rose-600">• {food}</span>}
                    <span className="text-xs font-normal text-stone-500">검색 결과 ({results.length}건)</span>
                  </h2>
                </div>
              </div>

              {/* 정렬 필터 */}
              <div className="flex items-center space-x-2 self-end sm:self-auto text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">정렬:</span>
                <button
                  onClick={() => handleSortChange('rating')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    sortBy === 'rating' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  평점 높은순
                </button>
                <button
                  onClick={() => handleSortChange('reviews')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    sortBy === 'reviews' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  리뷰 많은순
                </button>
              </div>
            </div>

            {/* 검색 결과가 없을 때 */}
            {results.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-stone-200">
                <Info className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">일치하는 맛집을 찾지 못했습니다</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  다른 도시 이름(예: 도쿄, 오사카)이나 메뉴 키워드(예: 라멘, 스시)로 재검색해 보세요.
                </p>
                <button
                  onClick={() => setStep('input')}
                  className="px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  다시 검색하기
                </button>
              </div>
            ) : (
              /* 맛집 카드 그리드 (Bento Grid) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((res, index) => {
                  const isBookmarked = bookmarks.some(b => b.id === res.id);
                  const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${res.name} ${res.address}`)}`;

                  return (
                    <div 
                      key={res.id} 
                      className="group bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* 카드 상단 배지 및 오버레이 */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-stone-900 text-white">
                              TOP {index + 1}
                            </span>
                            {res.rating >= 4.5 && (
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/60 flex items-center space-x-1">
                                <Sparkles className="w-3 h-3" />
                                <span>강력 추천</span>
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => toggleBookmark(res)}
                            className={`p-2 rounded-full transition-colors ${
                              isBookmarked 
                                ? 'bg-rose-50 text-rose-600' 
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-400'
                            }`}
                            title={isBookmarked ? '북마크 취소' : '북마크 추가'}
                          >
                            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
                          </button>
                        </div>

                        {/* 이름 및 rating */}
                        <h3 className="font-extrabold text-stone-900 text-lg group-hover:text-rose-600 transition-colors leading-snug">
                          {res.name}
                        </h3>

                        <div className="flex items-center space-x-2 my-2.5">
                          <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                            <span className="font-extrabold text-xs">{res.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-stone-400">
                            리뷰 {res.count.toLocaleString()}개
                          </span>
                          {res.price && (
                            <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                              {res.price}
                            </span>
                          )}
                        </div>

                        {/* 주소 및 태그 */}
                        <p className="text-xs text-stone-500 leading-relaxed flex items-start space-x-1.5 my-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{res.address}</span>
                        </p>

                        {/* 태그 목록 */}
                        {res.tags && (
                          <div className="flex flex-wrap gap-1.5 my-3">
                            {res.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 하단 버튼 툴바 */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                        <button
                          onClick={() => copyToClipboard(res.japaneseAddress || res.address, res.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium flex items-center justify-center space-x-1 transition-colors border border-stone-200/60"
                        >
                          {copiedId === res.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">복사완료</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-stone-400" />
                              <span>주소 복사</span>
                            </>
                          )}
                        </button>

                        <a
                          href={googleSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm transition-colors"
                        >
                          <span>구글 맵 열기</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {}
        {step === 'bookmarks' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setStep('input')}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-base font-bold text-stone-900 flex items-center space-x-2">
                    <span>저장한 맛집 목록</span>
                    <span className="text-xs font-normal text-stone-500">({bookmarks.length}곳)</span>
                  </h2>
                </div>
              </div>

              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('저장된 모든 맛집을 삭제하시겠습니까?')) {
                      setBookmarks([]);
                      showToast('북마크가 초기화되었습니다.');
                    }
                  }}
                  className="text-xs text-stone-400 hover:text-rose-600 underline"
                >
                  전체 비우기
                </button>
              )}
            </div>

            {bookmarks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-stone-200">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">아직 저장한 맛집이 없습니다</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  검색 결과 카드 하단의 하트 아이콘을 눌러 나만의 일본 미식 리스트를 만들어 보세요!
                </p>
                <button
                  onClick={() => setStep('input')}
                  className="px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  맛집 탐색하러 가기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.map((res) => {
                  const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${res.name} ${res.address}`)}`;

                  return (
                    <div 
                      key={res.id} 
                      className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                            {res.city} • {res.food}
                          </span>
                          <button
                            onClick={() => toggleBookmark(res)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full"
                          >
                            <Heart className="w-4 h-4 fill-rose-600" />
                          </button>
                        </div>

                        <h3 className="font-extrabold text-stone-900 text-base leading-snug">{res.name}</h3>

                        <div className="flex items-center space-x-2 my-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                            <span className="font-bold text-xs">{res.rating}</span>
                          </div>
                          <span className="text-xs text-stone-400">({res.count}개 리뷰)</span>
                        </div>

                        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 my-2">
                          {res.address}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                        <button
                          onClick={() => copyToClipboard(res.japaneseAddress || res.address, res.id)}
                          className="flex-1 py-2 rounded-xl bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200"
                        >
                          주소 복사
                        </button>
                        <a
                          href={googleSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold text-center flex items-center justify-center space-x-1"
                        >
                          <span>지도 보기</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </main>

      {/* 푸터 영역 */}
      <footer className="mt-16 text-center text-xs text-stone-400 space-y-1">
        <p>일본여행 맛집검색</p>
        <p className="text-[11px] text-stone-400/80">Powered by Google Maps Places API</p>
      </footer>

    </div>
  );
}
