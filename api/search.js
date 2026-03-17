// api/search.js — Vercel Serverless Function

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // body 파싱 (Vercel은 자동 파싱 안 될 수 있음)
    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    if (!body || typeof body !== 'object') {
        body = await new Promise((resolve) => {
            let data = '';
            req.on('data', chunk => { data += chunk; });
            req.on('end', () => {
                try { resolve(JSON.parse(data)); } catch { resolve({}); }
            });
        });
    }

    const { city, food } = body || {};

    if (!city || !food) {
        return res.status(400).json({ error: '도시와 메뉴를 입력해주세요.' });
    }

    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API 키가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.' });
    }

    const KOREAN_KEYWORDS = ["대한민국", "Korea", "South Korea", "서울"];

    const searchPlaces = async (query) => {
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'ko',
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Google API ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const places = data.places || [];

        return places.filter(p => {
            const addr = p.formattedAddress || '';
            return !KOREAN_KEYWORDS.some(k => addr.includes(k));
        });
    };

    try {
        let validPlaces = [];
        const queries = [
            `일본 ${city} ${food}`,
            `${city} ${food} 맛집`,
            `${city} ${food}`,
        ];

        for (const query of queries) {
            validPlaces = await searchPlaces(query);
            if (validPlaces.length > 0) break;
        }

        if (!validPlaces.length) {
            return res.status(200).json({ results: [], filterStatus: '', status: 'empty' });
        }

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

        finalResults.sort((a, b) =>
            (b.rating - a.rating) || ((b.userRatingCount || 0) - (a.userRatingCount || 0))
        );

        const results = finalResults.map(p => ({
            id: p.id || '',
            name: (typeof p.displayName === 'object' ? p.displayName?.text : p.displayName) || '',
            address: p.formattedAddress || '',
            rating: p.rating || 0,
            reviewCount: p.userRatingCount || 0,
        }));

        return res.status(200).json({ results, filterStatus, status: 'ok' });

    } catch (err) {
        console.error('[search] error:', err.message);
        return res.status(500).json({ error: '검색 중 오류가 발생했습니다.', detail: err.message });
    }
};
