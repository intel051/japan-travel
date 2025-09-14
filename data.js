const allShops = {
    tsukemen: [
        // 간토
        { region: 'kanto', name: '츄카소바 토미타', address_jp: '千葉県松戸市松戸1339 高橋ビル', prefecture: '치바현', city: '마츠도시', score: 3.97, description: '부동의 일본 1위 츠케멘. 초농후 돼지뼈 생선 육수와 신의 경지에 이른 자가제면의 조화. 예약 필수.' },
        { region: 'kanto', name: '츄카소바 시바타', address_jp: '東京都調布市仙川町1-2-5', prefecture: '도쿄도', city: '쵸후시', score: 3.96, description: '간장 소바 명가, 한정 츠케멘은 최상의 맛. (츠케멘 제공 여부는 방문 전 확인 필요)' },
        { region: 'kanto', name: '멘야 잇토', address_jp: '東京都葛飾区東新小岩1-4-17', prefecture: '도쿄도', city: '카츠시카구', score: 3.82, description: '닭을 베이스로 한 크리미한 스프가 일품. 섬세하고 세련된 맛으로 여성들에게도 큰 인기를 끌고 있습니다.' },
        { region: 'kanto', name: '츠케멘 미치', address_jp: '東京都葛飾区亀有5-28-17', prefecture: '도쿄도', city: '카츠시카구', score: 3.79, description: '정통파 돼지뼈 생선 츠케멘의 왕도. 길게 늘어선 줄이 맛을 증명하며, 진한 육수와 면의 밸런스가 완벽에 가깝습니다.' },
        { region: 'kanto', name: '멘도코로 혼다', address_jp: '東京都千代田区神田花岡町1-19', prefecture: '도쿄도', city: '치요다구', score: 3.78, description: '간장을 베이스로 한 깔끔하면서도 깊은 맛의 츠케멘. 다양한 메뉴를 선보이지만, 츠케멘의 완성도는 최상급입니다.'},
        { region: 'kanto', name: '멘야 쇼 혼텐', address_jp: '東京都新宿区西新宿7-22-34', prefecture: '도쿄도', city: '신주쿠구', score: 3.78, description: '닭 베이스의 시오라멘으로 유명하지만 츠케멘 또한 높은 완성도를 자랑한다.'},
        { region: 'kanto', name: '로쿠린샤', address_jp: '東京都千代田区丸の内1-9-1 東京駅一番街 B1F', prefecture: '도쿄도', city: '치요다구', score: 3.77, description: '츠케멘 붐을 일으킨 장본인. 걸쭉하고 농후한 스프와 극태면의 조합은 한번 맛보면 잊을 수 없는 강렬함을 선사합니다.' },
        { region: 'kanto', name: '후운지', address_jp: '東京都渋谷区代々木2-14-3 北斗第一ビル B1F', prefecture: '도쿄도', city: '시부야구', score: 3.77, description: '닭과 해산물의 감칠맛이 폭발하는 진한 스프. 신주쿠를 대표하는 츠케멘 맛집으로 항상 많은 사람들로 붐빕니다.' },
        { region: 'kanto', name: '토니카쿠', address_jp: '千葉県松戸市根本462', prefecture: '치바현', city: '마츠도시', score: 3.77, description: '진한 국물과 뛰어난 면발, 그리고 유자를 첨가해 상큼한 맛의 변화를 즐길 수 있는 것으로 유명합니다.' },
        { region: 'kanto', name: '쿠리야마', address_jp: '神奈川県横浜市神奈川区六角橋1-17-29', prefecture: '가나가와현', city: '요코하마시', score: 3.76, description: '타이쇼켄의 맛을 계승하면서도 독자적인 스타일을 구축. 돼지뼈, 닭, 해산물의 균형 잡힌 스프가 일품입니다.' },
        { region: 'kanto', name: '간자 본점', address_jp: '埼玉県川越市新富町1-1-8', prefecture: '사이타마현', city: '카와고에시', score: 3.75, description: '사이타마를 대표하는 농후 츠케멘 명가. 농후한 돼지뼈 해산물 스프와 쫄깃한 자가제면의 조화가 훌륭합니다.' },
        { region: 'kanto', name: 'ramen club 토토노에', address_jp: '東京都葛飾区東新小岩1-1-1', prefecture: '도쿄도', city: '카츠시카구', score: 3.73, description: '세련된 공간에서 즐기는 고품격 츠케멘. 재료 본연의 맛을 살린 섬세한 스프가 인상적입니다.' },
        { region: 'kanto', name: '멘도코로 아리사', address_jp: '埼玉県川口市西川口1-7-7', prefecture: '사이타마현', city: '카와구치시', score: 3.73, description: '자가제면한 면의 퀄리티가 매우 높기로 유명하며, 다시마 물에 담가 나오는 \'콘부스이 츠케멘\'이 대표 메뉴입니다.' },
        { region: 'kanto', name: '지넨죠', address_jp: '埼玉県鴻巣市滝馬室2129-1', prefecture: '사이타마현', city: '코노스시', score: 3.72, description: '\'로쿠린샤\'의 자매점으로, 본점의 맛을 계승하면서도 독자적인 매력을 더했습니다.' },
        { region: 'kanto', name: '와리토', address_jp: '東京都目黒区青葉台3-7-10', prefecture: '도쿄도', city: '메구로구', score: 3.68, description: '최근 폭발적인 인기를 끌고 있는 곳. 오랜 시간 우려낸 진한 돼지뼈 생선 스프의 중독성이 강합니다.' },
    ],
    ramen: [
        // 간토 라멘 맛집 50곳
        { region: 'kanto', name: '라멘 이이다 쇼텐', address_jp: '神奈川県足柄下郡湯河原町土肥2-12-14', prefecture: '가나가와현', city: '유가와라마치', score: 4.08, description: '일본 라멘계의 정점. 완벽하게 계산된 간장(쇼유) 라멘은 하나의 예술 작품이라 불린다.' },
        { region: 'kanto', name: '라멘야 시마', address_jp: '東京都新宿区西新宿3-11-12', prefecture: '도쿄도', city: '신주쿠구', score: 3.99, description: '깨끗하고 깊은 맛의 간장 라멘으로 도쿄에서 폭발적인 인기를 누리고 있는 가게.' },
        { region: 'kanto', name: '츄카소바 시바타', address_jp: '東京都調布市仙川町1-2-5', prefecture: '도쿄도', city: '쵸후시', score: 3.96, description: '오리 육수와 간장의 풍미가 극대화된 중화소바. 한 입에 감탄을 자아내는 맛.' },
        { region: 'kanto', name: '멘도코로 호우센카', address_jp: '東京都新宿区歌舞伎町1-24-6', prefecture: '도쿄도', city: '신주쿠구', score: 3.92, description: '진한 금눈돔 육수를 사용한 라멘이 대표 메뉴. 다른 곳에서는 맛볼 수 없는 고급스러운 감칠맛.' },
        { region: 'kanto', name: '긴자 하고', address_jp: '東京都中央区銀座3-14-2', prefecture: '도쿄도', city: '츄오구', score: 3.91, description: '프렌치 요리 기법을 접목한 독창적인 라멘. 맑고 투명한 스프의 깊이가 상상 이상이다.' },
        { region: 'kanto', name: '츄카소바 이부키', address_jp: '東京都板橋区前野町4-58-10', prefecture: '도쿄도', city: '이타바시구', score: 3.84, description: '극도로 진한 멸치(니보시) 국물 라멘의 성지. 매니아층이 매우 두텁다.' },
        { region: 'kanto', name: '이에케이 소혼잔 요시무라야', address_jp: '神奈川県横浜市西区南幸2-12-6', prefecture: '가나가와현', city: '요코하마시', score: 3.79, description: '이에케이(家系) 라멘의 원조. 돼지뼈 간장 스프와 굵은 면의 강력한 조합은 전설 그 자체.' },
        { region: 'kanto', name: '하카타 나가하마 라멘 타나카 쇼텐', address_jp: '東京都足立区一ツ家2-14-6', prefecture: '도쿄도', city: '아다치구', score: 3.78, description: '도쿄에서 최고의 하카타 돈코츠 라멘을 맛볼 수 있는 곳. 진하지만 잡내가 없는 스프가 일품.' },
        { region: 'kanto', name: '라멘 스기타야 본점', address_jp: '神奈川県横浜市磯子区新杉田町3-5', prefecture: '가나가와현', city: '요코하마시', score: 3.78, description: '요시무라야 직계 1호점. 원조의 맛을 계승하면서도 독자적인 팬덤을 구축한 이에케이 라멘의 성지.' },
        { region: 'kanto', name: '츄카소바 타카노', address_jp: '神奈川県横浜市神奈川区大口通135-11', prefecture: '가나가와현', city: '요코하마시', score: 3.78, description: '깔끔한 니보시(멸치) 국물 라멘으로 유명한 곳. 은은하면서도 깊은 감칠맛이 매력적이다.' },
        { region: 'kanto', name: '마코토야', address_jp: '東京都渋谷区道玄坂2-10-3', prefecture: '도쿄도', city: '시부야구', score: 3.78, description: '진하고 크리미한 닭 백탕(토리파이탄) 스프가 압권. 닭의 모든 것을 응축한 듯한 맛.' },
        { region: 'kanto', name: '모테나시 쿠로키', address_jp: '東京都千代田区神田和泉町2-15', prefecture: '도쿄도', city: '치요다구', score: 3.78, description: '제철 식재료를 활용한 창의적인 한정 라멘과 높은 퀄리티의 기본 시오(소금) 라멘으로 유명하다.' },
        { region: 'kanto', name: '오란다켄', address_jp: '埼玉県さいたま市岩槻区東岩槻6-6-8', prefecture: '사이타마현', city: '사이타마시', score: 3.77, description: '생강향이 가득한 간장 라멘이 특징. 두툼한 차슈와 함께 먹으면 중독성이 엄청나다.' },
        { region: 'kanto', name: '시나소바야 본점', address_jp: '神奈川県横浜市戸塚区戸塚町403-1', prefecture: '가나가와현', city: '요코하마시', score: 3.77, description: '일본 라멘의 신이라 불렸던 故 사노 미노루의 가게. 식재료 본연의 맛을 살린 섬세함의 극치.' },
        { region: 'kanto', name: '멘야 킷포우', address_jp: '茨城県つくば市吾妻3-8-1', prefecture: '이바라키현', city: '츠쿠바시', score: 3.77, description: '닭과 오리를 사용한 진한 국물과 향기로운 자가제면으로 이바라키 최고의 인기를 자랑한다.' },
        { region: 'kanto', name: '시나소바 이토', address_jp: '東京都北区西ヶ原1-54-7', prefecture: '도쿄도', city: '키타구', score: 3.76, description: '단순함의 미학. 극도로 깔끔한 니보시 국물로 많은 팬을 보유하고 있다.' },
        { region: 'kanto', name: '라멘 사이교', address_jp: '千葉県船橋市本町7-29-15', prefecture: '치바현', city: '후나바시시', score: 3.75, description: '닭 베이스의 진한 스프와 부드러운 차슈가 인기인 후나바시의 강자.' },
        { region: 'kanto', name: '멘손레이', address_jp: '東京都新宿区西早稲田2-18-23', prefecture: '도쿄도', city: '신주쿠구', score: 3.74, description: '토리파이탄 라멘의 명가. 크리미하고 진한 국물이 일품이다.' },
        { region: 'kanto', name: '고고이부키', address_jp: '東京都杉並区高円寺南1-6-5', prefecture: '도쿄도', city: '스기나미구', score: 3.73, description: '이부키의 2호점. 본점 못지않은 극농후 니보시 라멘을 맛볼 수 있다.' },
        { region: 'kanto', name: '멘도코로 비기야', address_jp: '東京都目黒区鷹番2-4-9', prefecture: '도쿄도', city: '메구로구', score: 3.72, description: '유자향이 은은하게 퍼지는 시오라멘이 인기. 깔끔하고 세련된 맛.' },
        { region: 'kanto', name: '라멘 다이고', address_jp: '千葉県成田市不動ヶ岡1875-5', prefecture: '치바현', city: '나리타시', score: 3.71, description: '나리타 공항 근처의 실력파 가게. 닭과 해산물 베이스의 균형 잡힌 스프.' },
        { region: 'kanto', name: '시바사키테이', address_jp: '東京都調布市菊野台1-17-5', prefecture: '도쿄도', city: '쵸후시', score: 3.70, description: '저렴한 가격에 최상의 퀄리티를 제공하는 니보시 라멘 맛집.' },
        { region: 'kanto', name: '멘야 사카모토', address_jp: '東京都板橋区常盤台4-32-2', prefecture: '도쿄도', city: '이타바시구', score: 3.69, description: '정통파 간장 라멘의 숨은 강자. 깊고 진한 국물 맛이 인상적이다.' },
        { region: 'kanto', name: '무기토오리부', address_jp: '東京都中央区銀座6-12-12', prefecture: '도쿄도', city: '츄오구', score: 3.68, description: '닭과 조개를 사용한 W스프가 특징. 긴자에서 사랑받는 세련된 맛.' },
        { region: 'kanto', name: '소라노이로', address_jp: '東京都千代田区平河町1-3-10', prefecture: '도쿄도', city: '치요다구', score: 3.67, description: '채소만으로 만든 베지소바가 유명. 건강하면서도 맛있는 라멘을 추구한다.' },
        { region: 'kanto', name: '멘야 무사시', address_jp: '東京都新宿区西新宿7-2-6', prefecture: '도쿄도', city: '신주쿠구', score: 3.66, description: '90년대 라멘 붐을 일으킨 주역. 돼지뼈와 해산물의 W스프 원조격.' },
        { region: 'kanto', name: '이치란 본사총본점', address_jp: '東京都新宿区歌舞伎町1-17-10', prefecture: '도쿄도', city: '신주쿠구', score: 3.65, description: '독서실 같은 칸막이 좌석으로 유명한 돈코츠 라멘 체인의 본점.' },
        { region: 'kanto', name: '라멘 지로 메구로점', address_jp: '東京都目黒区目黒3-12-1', prefecture: '도쿄도', city: '메구로구', score: 3.65, description: '지로계 라멘의 성지 중 하나. 압도적인 양과 진한 맛이 특징.' },
        { region: 'kanto', name: '큐슈장가라', address_jp: '東京都千代田区外神田3-11-6', prefecture: '도쿄도', city: '치요다구', score: 3.64, description: '아키하바라의 유명 돈코츠 라멘. 다양한 토핑과 맛으로 사랑받는다.' },
        { region: 'kanto', name: '멘야고', address_jp: '東京都新宿区高田馬場1-22-7', prefecture: '도쿄도', city: '신주쿠구', score: 3.63, description: '멸치와 소금을 사용한 엔시오 라멘이 독특하고 맛있다.' },
        { region: 'kanto', name: '라멘 히마와리', address_jp: '神奈川県座間市相武台1-3502-1', prefecture: '가나가와현', city: '자마시', score: 3.62, description: '가나가와현의 실력파 가게. 된장 베이스의 미소라멘이 인기 메뉴.' },
        { region: 'kanto', name: '도미타세이멘', address_jp: '千葉県千葉市中央区富士見2-24-1', prefecture: '치바현', city: '치바시', score: 3.61, description: '츄카소바 토미타의 직계점으로, 본점의 맛을 더 쉽게 즐길 수 있다.' },
        { region: 'kanto', name: '호프켄', address_jp: '東京都渋谷区千駄ヶ谷2-33-1', prefecture: '도쿄도', city: '시부야구', score: 3.60, description: '트럭 포장마차로 시작한 도쿄 돈코츠 라멘의 전설. 24시간 영업한다.' },
        { region: 'kanto', name: '멘야잇신', address_jp: '栃木県宇都宮市宿郷5-2-10', prefecture: '토치기현', city: '우츠노미야시', score: 3.59, description: '토치기현의 인기 라멘 가게. 닭을 베이스로 한 국물이 깔끔하다.' },
        { region: 'kanto', name: '타이쇼켄', address_jp: '東京都豊島区南池袋2-42-8', prefecture: '도쿄도', city: '토시마구', score: 3.58, description: '츠케멘의 창시자, 故 야마기시 카즈오의 가게. 모든 츠케멘의 시작점.' },
        { region: 'kanto', name: '아후리', address_jp: '東京都渋谷区恵比寿1-1-7', prefecture: '도쿄도', city: '시부야구', score: 3.58, description: '유자 시오라멘으로 유명한 세련된 라멘 가게. 여성들에게 특히 인기가 많다.' },
        { region: 'kanto', name: '츄카소바 사토우', address_jp: '神奈川県横浜市青葉区藤が丘2-3-1', prefecture: '가나가와현', city: '요코하마시', score: 3.57, description: '요코하마의 숨은 강자. 깔끔하고 정석적인 중화소바를 맛볼 수 있다.' },
        { region: 'kanto', name: '멘야 소우', address_jp: '埼玉県川口市芝5-1-15', prefecture: '사이타마현', city: '카와구치시', score: 3.57, description: '닭과 돼지를 모두 사용한 W스프가 인기. 밸런스가 좋은 맛.' },
        { region: 'kanto', name: '라멘 무츠키야', address_jp: '東京都渋谷区神宮前1-1-8', prefecture: '도쿄도', city: '시부야구', score: 3.56, description: '된장 베이스에 토마토를 더한 독특한 라멘으로 하라주쿠에서 인기가 많다.' },
        { region: 'kanto', name: '모코탄멘 나카모토', address_jp: '東京都板橋区常盤台4-30-1', prefecture: '도쿄도', city: '이타바시구', score: 3.56, description: '매운 라멘의 대명사. 한국의 짬뽕과 비슷한 비주얼과 중독성 강한 맛이 특징.' },
        { region: 'kanto', name: '하츠네', address_jp: '東京都墨田区東向島1-2-7', prefecture: '도쿄도', city: '스미다구', score: 3.55, description: '오래된 노포의 정취를 느낄 수 있는 곳. 탄멘(야채볶음 라멘)이 유명하다.' },
        { region: 'kanto', name: '도쿄역 라멘스트리트', address_jp: '東京都千代田区丸の内1-9-1', prefecture: '도쿄도', city: '치요다구', score: 3.55, description: '로쿠린샤를 비롯한 일본 전국의 유명 라멘 가게들이 모여있는 곳.' },
        { region: 'kanto', name: '라멘 아카토라', address_jp: '群馬県高崎市貝沢町1282-1', prefecture: '군마현', city: '타카사키시', score: 3.54, description: '군마현의 실력파 가게. 진한 돈코츠 라멘과 매운 라멘이 인기 메뉴.' },
        { region: 'kanto', name: '멘야후우미', address_jp: '千葉県市原市国分寺台中央7-18-5', prefecture: '치바현', city: '이치하라시', score: 3.53, description: '된장, 소금, 간장 등 모든 메뉴의 완성도가 높은 치바의 인기점.' },
        { region: 'kanto', name: '다루마', address_jp: '東京都武蔵野市吉祥寺本町1-1-1', prefecture: '도쿄도', city: '무사시노시', score: 3.52, description: '키치죠지의 하모니카 요코초에 위치한 작은 가게. 깔끔한 중화소바가 일품.' },
        { region: 'kanto', name: '츄카소바 아오바', address_jp: '東京都中野区中野5-58-1', prefecture: '도쿄도', city: '나카노구', score: 3.52, description: '돼지뼈와 해산물 W스프를 대중화시킨 가게. 부드럽고 깊은 맛.' },
        { region: 'kanto', name: '라멘 무코우', address_jp: '茨城県ひたちなか市一番町10-15', prefecture: '이바라키현', city: '히타치나카시', score: 3.51, description: '멸치 국물을 베이스로 한 라멘이 인기. 깔끔하면서도 깊은 맛.' },
        { region: 'kanto', name: '시나가와 라멘스트리트', address_jp: '東京都港区高輪3-26-20', prefecture: '도쿄도', city: '미나토구', score: 3.51, description: '시나가와역에 위치한 라멘 전문 구역. 몽고탄멘 나카모토 등이 입점해 있다.' },
        { region: 'kanto', name: '야스베에', address_jp: '東京都渋谷区渋谷3-18-7', prefecture: '도쿄도', city: '시부야구', score: 3.50, description: '츠케멘 전문 체인점의 시부야 본점. 달콤하고 새콤한 간장 베이스 스프가 특징.' },
        { region: 'kanto', name: '라멘 이치후쿠', address_jp: '東京都渋谷区本町4-17-1', prefecture: '도쿄도', city: '시부야구', score: 3.50, description: '된장 라멘 전문점. 진하고 구수한 국물 맛이 일품이다.' },
    ],
    tonkatsu: [
        { region: 'kanto', name: '나리쿠라', address_jp: '東京都杉並区成田東4-33-9', prefecture: '도쿄도', city: '스기나미구', score: 4.04, description: '일본 돈까스계의 정점. 저온에서 천천히 튀겨낸 새하얀 튀김옷과 극강의 부드러움을 자랑한다.' },
        { region: 'kanto', name: '톤카츠 히나타', address_jp: '東京都江戸川区船堀2-10-15', prefecture: '도쿄도', city: '에도가와구', score: 3.95, description: '나리쿠라와 함께 저온 튀김 돈까스의 양대산맥으로 꼽히는 명점.' },
        { region: 'kanto', name: '노모토야', address_jp: '東京都新宿区西新宿1-16-10', prefecture: '도쿄도', city: '신주쿠구', score: 3.94, description: '최고급 돼지고기 품종을 사용한 프리미엄 돈까스. 예약이 필수인 곳이다.' },
        { region: 'kanto', name: '톤타', address_jp: '東京都豊島区高田3-17-8', prefecture: '도쿄도', city: '토시마구', score: 3.93, description: '수십 년간 최상위권을 유지해온 클래식한 돈까스의 강자. 밸런스가 완벽하다.' },
        { region: 'kanto', name: '아게즈키', address_jp: '東京都新宿区神楽坂3-2', prefecture: '도쿄도', city: '신주쿠구', score: 3.91, description: '카구라자카의 고급 돈까스 전문점. 세련된 분위기와 뛰어난 맛으로 유명하다.' },
        { region: 'kanto', name: '부타구미', address_jp: '東京都港区西麻布2-24-9', prefecture: '도쿄도', city: '미나토구', score: 3.86, description: '수십 종류의 브랜드 돼지고기 중 원하는 것을 골라 맛볼 수 있는 돈까스 전문점.' },
        { region: 'kanto', name: '마루고', address_jp: '東京都千代田区外神田1-8-14', prefecture: '도쿄도', city: '치요다구', score: 3.84, description: '아키하바라의 상징적인 돈까스 맛집. 두툼하고 육즙 가득한 로스까스가 인기.' },
        { region: 'kanto', name: '폰치켄', address_jp: '東京都千代田区神田小川町2-8', prefecture: '도쿄도', city: '치요다구', score: 3.82, description: '돈까스와 함께 특제 소스를 올린 카츠레츠가 유명하며, 카츠동 또한 일품이다.' },
        { region: 'kanto', name: '톤카츠 하세가와', address_jp: '東京都墨田区両国3-24-1', prefecture: '도쿄도', city: '스미다구', score: 3.81, description: '료고쿠 스모 경기장 근처의 인기점. 질 좋은 돼지고기와 섬세한 튀김 기술이 돋보인다.' },
        { region: 'kanto', name: '마루이치', address_jp: '東京都大田区蒲田5-28-12', prefecture: '도쿄도', city: '오타구', score: 3.79, description: '카마타 지역의 전설적인 돈까스. 압도적인 두께와 육즙으로 사랑받는다.' },
        { region: 'kanto', name: '카츠레츠안 바샤미치 소혼텐', address_jp: '神奈川県横浜市中区常盤町5-58-2', prefecture: '가나가와현', city: '요코하마시', score: 3.78, description: '요코하마를 대표하는 90년 역사의 노포. 채소와 과일을 끓여 만든 특제 소스가 유명하다.' },
        { region: 'kanto', name: '엔라쿠', address_jp: '東京都大田区池上3-39-12', prefecture: '도쿄도', city: '오타구', score: 3.78, description: '이케가미 혼몬지 근처의 숨은 강자. 클래식하고 완성도 높은 맛.' },
        { region: 'kanto', name: '톤카츠 야마베', address_jp: '東京都千代田区神田佐久間町1-21', prefecture: '도쿄도', city: '치요다구', score: 3.78, description: '우에노, 아키하바라 근처의 가성비 좋은 노포. 저렴하지만 맛은 최상급이다.' },
        { region: 'kanto', name: '우치다', address_jp: '東京都新宿区高田馬場1-2-10', prefecture: '도쿄도', city: '신주쿠구', score: 3.78, description: '고독한 미식가에도 등장한 곳. 두툼하고 거친 스타일의 돈까스가 매력적이다.' },
        { region: 'kanto', name: '톤카츠 케이타', address_jp: '東京都板橋区大山町8-8', prefecture: '도쿄도', city: '이타바시구', score: 3.77, description: '최근 급부상하고 있는 신흥 강자. 다양한 부위와 품종을 맛볼 수 있다.' },
        { region: 'kanto', name: '톤카츠 마사짱', address_jp: '東京都練馬区豊玉北5-18-8', prefecture: '도쿄도', city: '네리마구', score: 3.77, description: '네리마의 터줏대감. 현지인들에게 절대적인 지지를 받는 클래식한 맛집.' },
        { region: 'kanto', name: '이센 본점', address_jp: '東京都文京区湯島3-40-3', prefecture: '도쿄도', city: '분쿄구', score: 3.77, description: '카츠산도(돈까스 샌드위치)의 원조로 알려진 가게. 히레카츠가 특히 유명하다.' },
        { region: 'kanto', name: '스기타', address_jp: '東京都台東区寿3-8-3', prefecture: '도쿄도', city: '타이토구', score: 3.77, description: '아사쿠사 근처의 돈까스 명점. 깔끔한 기름과 부드러운 육질이 특징.' },
        { region: 'kanto', name: '톤카츠 만키', address_jp: '千葉県柏市中央町2-9', prefecture: '치바현', city: '카시와시', score: 3.76, description: '치바현을 대표하는 돈까스 맛집. 두툼하고 육즙이 풍부한 돈까스로 유명하다.' },
        { region: 'kanto', name: '포크 포크 포크', address_jp: '神奈川県厚木市中町2-7-20', prefecture: '가나가와현', city: '아츠기시', score: 3.76, description: '두툼한 돈까스를 빵과 함께 먹는 독특한 스타일로 인기를 끌고 있다.' },
        { region: 'kanto', name: '고치소우톤카츠 미톤', address_jp: '埼玉県さいたま市浦和区高砂2-12-11', prefecture: '사이타마현', city: '사이타마시', score: 3.75, description: '사이타마 최고의 돈까스 가게. 이름처럼 ‘진수성찬’ 같은 푸짐함과 맛을 자랑한다.' },
        { region: 'kanto', name: '카츠센', address_jp: '群馬県前橋市南町3-35-3', prefecture: '군마현', city: '마에바시시', score: 3.74, description: '군마현에서 가장 높은 평점을 받는 돈까스 전문점. 현지인들의 절대적인 지지를 받는다.' },
        { region: 'kanto', name: '톤카츠 덴', address_jp: '茨城県水戸市見和2-243-1', prefecture: '이바라키현', city: '미토시', score: 3.71, description: '이바라키현 최고의 돈까스. 질 좋은 돼지고기를 사용한 정통파 돈까스.' },
        { region: 'kanto', name: '아오키', address_jp: '東京都大田区蒲田5-20-7', prefecture: '도쿄도', city: '오타구', score: 3.70, description: '카마타 돈까스 3대장 중 하나. 린SPF라는 고급 돼지고기를 사용한다.' },
        { region: 'kanto', name: '쿡젠', address_jp: '栃木県宇都宮市東宿郷4-5-1', prefecture: '토치기현', city: '우츠노미야시', score: 3.69, description: '교자로 유명한 우츠노미야의 돈까스 강자. 두툼하고 부드러운 돈까스가 인기.' },
            ]
        };

        const regionKeyMap = {
            hokkaido: '홋카이도', tohoku: '도호쿠', kanto: '간토', chubu: '주부',
            kansai: '간사이', chugoku: '주고쿠', shikoku: '시코쿠', kyushu: '규슈·오키나와'
        };

        const foodTypeSelect = document.getElementById('food-type-select');
        const regionSelection = document.getElementById('region-selection');
        const shopListView = document.getElementById('shop-list-view');
        const shopListContent = document.getElementById('shop-list-content');
        const listTitle = document.getElementById('list-title');
        const backToRegionsBtn = document.getElementById('back-to-regions-btn');
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        
        let currentRegionKey = null;

        function openModal(shop, rank) {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address_jp)}`;
            modalContent.innerHTML = `
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm font-semibold text-red-500 mb-1">#${rank}위</p>
                            <h2 class="text-2xl font-bold text-gray-900">${shop.name}</h2>
                            <p class="text-sm text-gray-500 mt-1">${shop.prefecture} ${shop.city}</p>
                        </div>
                        <button id="close-modal-btn" class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                    </div>
                    <div class="mt-4 border-t pt-4">
                        <div class="flex items-center space-x-2">
                            <span class="text-yellow-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></span>
                            <p class="text-lg font-bold text-gray-800">${shop.score} <span class="text-sm font-normal text-gray-500">/ 타베로그</span></p>
                        </div>
                        <p class="mt-3 text-gray-700 leading-relaxed">${shop.description}</p>
                        <div class="mt-4 border-t pt-4">
                             <h3 class="text-sm font-semibold text-gray-600">주소 (일본어)</h3>
                             <p class="text-gray-800 mt-1">${shop.address_jp}</p>
                             <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="block w-full text-center mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">Google 지도로 보기</a>
                        </div>
                    </div>
                </div>`;
            modal.classList.remove('hidden');
            setTimeout(() => modalContent.classList.remove('scale-95', 'opacity-0'), 10);
            modalContent.querySelector('#close-modal-btn').addEventListener('click', closeModal);
        }
        function closeModal() {
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
        
        function showShopList(regionKey) {
            currentRegionKey = regionKey; // 현재 보고 있는 지역 키 저장
            const foodType = foodTypeSelect.value;
            const regionName = regionKeyMap[regionKey];
            const foodTypeName = {
                'tsukemen': '츠케멘',
                'ramen': '라멘',
                'tonkatsu': '돈까스'
            }[foodType];

            let shops = (allShops[foodType] || []).filter(s => s.region === regionKey);
            shops.sort((a, b) => b.score - a.score);

            listTitle.textContent = `${regionName} ${foodTypeName} 맛집 목록`;
            shopListContent.innerHTML = ''; // Clear previous list

            if (shops.length === 0) {
                shopListContent.innerHTML = `<p class="text-center text-gray-500 p-4">해당 지역의 맛집 정보가 없습니다.</p>`;
            } else {
                shops.forEach((shop, index) => {
                    const rank = index + 1;
                    const shopEl = document.createElement('div');
                    shopEl.className = 'shop-list-item p-4 mb-2 rounded-lg cursor-pointer transition-all border hover:bg-gray-100 hover:shadow-sm';
                    shopEl.innerHTML = `
                        <div class="flex items-center gap-4">
                            <div class="flex-shrink-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">${rank}</div>
                            <div class="flex-grow">
                                <h3 class="font-semibold text-gray-800">${shop.name}</h3>
                                <p class="text-sm text-gray-500">${shop.prefecture} ${shop.city}</p>
                            </div>
                            <div class="flex items-center text-sm font-bold text-yellow-500">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                ${shop.score}
                            </div>
                        </div>`;
                    shopEl.addEventListener('click', () => openModal(shop, rank));
                    shopListContent.appendChild(shopEl);
                });
            }

            regionSelection.classList.add('hidden');
            shopListView.classList.remove('hidden');
        }

        // Initialize region cards
        document.querySelectorAll('.region-card').forEach(card => {
            card.classList.add('p-4', 'sm:p-6', 'rounded-xl', 'shadow-md', 'text-center', 'font-bold', 'text-lg', 'sm:text-xl', 'cursor-pointer', 'transition-all', 'duration-300', 'bg-white', 'hover:shadow-lg', 'hover:scale-105', 'hover:bg-red-500', 'hover:text-white');
            
            card.addEventListener('click', () => showShopList(card.dataset.regionKey));
        });
        
        // Event listener for food type change
        foodTypeSelect.addEventListener('change', () => {
            if (currentRegionKey) { // Only refresh if a region list is being viewed
                showShopList(currentRegionKey);
            }
        });

        // Event listener for back button
        backToRegionsBtn.addEventListener('click', () => {
            shopListView.classList.add('hidden');
            regionSelection.classList.remove('hidden');
            currentRegionKey = null; // Reset current region
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    </script>
</body>
</html>

