import React, { useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { Search, MapPin, Star, Utensils, ArrowLeft, RotateCw } from 'https://esm.sh/lucide-react@0.292.0';

const App = () => {
    const [city, setCity] = useState('');
    const [food, setFood] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('input');

    // Vercel 환경변수 사용 (VITE_ 접두사 필요 없음)
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const searchRestaurants = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setStep('loading');

        try {
            if (!window.google) {
                await new Promise(r => {
                    const s = document.createElement('script');
                    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
                    s.onload = r;
                    document.head.appendChild(s);
                });
            }

            const { Place } = await google.maps.importLibrary("places");
            const { places } = await Place.searchByText({
                textQuery: `일본 ${city} ${food} 맛집`,
                fields: ['displayName', 'formattedAddress', 'rating', 'userRatingCount', 'id'],
            });

            const filtered = (places || [])
                .filter(p => !p.formattedAddress.includes("대한민국"))
                .map(p => ({
                    id: p.id,
                    name: p.displayName,
                    rating: p.rating || 0,
                    count: p.userRatingCount || 0,
                    address: p.formattedAddress
                }))
                .sort((a, b) => b.rating - a.rating);

            setResults(filtered);
            setStep('results');
        } catch (err) {
            alert("검색에 실패했습니다.");
            setStep('input');
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', { className: 'max-w-md mx-auto pt-20 px-6' },
        step === 'input' && React.createElement('div', null,
            React.createElement('h1', { className: 'text-3xl font-bold mb-8' }, '일본,', React.createElement('br'), '어디서 드시나요?'),
            React.createElement('form', { onSubmit: searchRestaurants, className: 'space-y-4' },
                React.createElement('input', { className: 'w-full p-4 rounded-2xl border bg-white', placeholder: '도시 (예: 도쿄)', onChange: e => setCity(e.target.value) }),
                React.createElement('input', { className: 'w-full p-4 rounded-2xl border bg-white', placeholder: '메뉴 (예: 라멘)', onChange: e => setFood(e.target.value) }),
                React.createElement('button', { className: 'w-full py-4 bg-black text-white rounded-2xl font-bold' }, '맛집 검색하기')
            )
        ),
        step === 'loading' && React.createElement('div', { className: 'text-center py-20' }, '분석 중...'),
        step === 'results' && React.createElement('div', { className: 'space-y-4' },
            React.createElement('button', { onClick: () => setStep('input'), className: 'mb-4' }, '← 뒤로가기'),
            results.map(res => React.createElement('div', { key: res.id, className: 'p-5 bg-white rounded-3xl shadow-sm' },
                React.createElement('h3', { className: 'font-bold' }, res.name),
                React.createElement('p', { className: 'text-sm text-gray-500' }, res.address)
            ))
        )
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
