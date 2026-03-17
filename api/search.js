// api/search.js — Vercel Serverless Function
// Google Places API 키를 서버에서만 사용 (클라이언트에 노출되지 않음)

export default async function handler(req, res) {
    // CORS 허용
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { city, food } = req.body;

    if (!city || !food) {
        return res.status(400).json({ error: '도시와 메뉴를 입력해주세요.' });
    }

    const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Vercel 환경변수에서만 읽음

    if (!API_KEY) {
        return res.status(500).json({ error: '서버 설정 오류입니다.' });
    }

    // 검색 쿼리 우선순위
    const queries = [
        `일본 ${city} ${food}`,
        `${city} ${food} 맛집`,
        `${city} ${food}`,
    ];

    const KOREAN_KEYWORDS = ["대한민국", "Korea", "South Korea", "서울"];

    // Google Places API (New) - Text Search
    const searchPlaces = async (query) => {
        const url = 'https://places.googleapis.com/v1/places:searchText';
        const body = {
            textQuery: query,
            languageCode: 'ko',
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Google API error: ${response.status} — ${errText}`);
        }

        const data = await response.json();
        const places = data.places || [];

        // 한국 주소 필터링
        return places.filter(p => {
            const addr = p.formattedAddress || '';
            return !KOREAN_KEYWORDS.some(k => addr.includes(k));
        });
    };

    try {
        let validPlaces = [];

        for (const query of queries) {
            validPlaces = await searchPlaces(query);
            if (validPlaces.length > 0) break;
        }

        if (!validPlaces.length) {
            return res.status(200).json({ results: [], status: 'empty' });
        }

        // 필터 전략
        let finalResults = validPlaces.filter(p => p.rating >= 4.1 && p.userRatingCount >= 300);
        let filterStatus = '검증된 맛집';

        if (!finalResults.length) {
            finalResults = validPlaces.filter(p => p.userRatingCount >= 20);
            filterStatus = '추천 맛집';
        }
        if (!finalResults.length) {
            finalResults = validPlaces;
            filterStatus = '검색 결과';
        }

        // 별점순 → 리뷰순 정렬
        finalResults.sort((a, b) =>
            (b.rating - a.rating) || ((b.userRatingCount || 0) - (a.userRatingCount || 0))
        );

        const mapped = finalResults.map(p => ({
            id: p.id,
            name: p.displayName?.text || p.displayName || '',
            address: p.formattedAddress || '',
            rating: p.rating || 0,
            reviewCount: p.userRatingCount || 0,
        }));

        return res.status(200).json({ results: mapped, filterStatus, status: 'ok' });

    } catch (err) {
        console.error('Places API error:', err);
        return res.status(500).json({ error: '검색 중 오류가 발생했습니다.', detail: err.message });
    }
}
