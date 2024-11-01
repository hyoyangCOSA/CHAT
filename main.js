const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const mainServer = http.createServer(app);
const io = new Server(mainServer);

const CHO_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 
    'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];





const port = 3000;

const words = [
    // 과학
    "밀도", "에너지", "가속도", "원자", "분자", "압력", "마찰", "전류", "진동", "광합성",
    "전자", "원소", "중력", "힘", "열", "온도", "질량", "속도", "일", "뉴턴",
    "진자", "전압", "저항", "광속", "파동", "음파", "진공", "중력가속도", "수소", "화합물",
    "용해", "전하", "자기장", "에너지보존", "화학반응", "도체", "절연체", "열역학", "기체", "액체",
    "고체", "흡수", "발열", "발광", "산화", "환원", "화학결합", "중화", "용매", "대류",
    "반사", "굴절", "스펙트럼", "자기력", "정전기", "이온", "분해", "소화", "순환", "효소",
    "엽록소", "세포", "DNA", "단백질", "지질", "탄수화물", "유전", "돌연변이", "생식", "복제",
    "대사", "호흡", "신경", "근육", "장기", "조직", "면역", "세포막", "환경", "진화",
    "적응", "서식지", "기후", "생태계", "멸종", "질소순환", "탄소순환", "대기", "온실효과", "오염",
    "광물", "지진", "화산", "암석", "침식", "퇴적", "풍화", "해양", "기압", "강수",
    
    // 공학
    "전도", "대류", "복사", "압력계", "전자기파", "전자", "기계", "설계", "로봇", "기어",
    "전압계", "저항", "모터", "베어링", "압축", "소성", "재료", "합금", "강철", "구조",
    "다리", "건물", "설계도", "코드", "변수", "제어", "알고리즘", "로봇팔", "제어장치", "센서",
    "도체", "회로", "저항기", "전자기기", "로봇", "플랫폼", "발전기", "배터리", "안전장치", "비행기",
    "드론", "제어계", "공간", "트랜지스터", "에너지변환", "열교환기", "전도도", "회전축", "변위", "모터",
    
    // 수학
    "변수", "함수", "방정식", "미분", "적분", "도함수", "그래프", "좌표", "기울기", "제곱근",
    "평균", "중앙값", "최빈값", "분산", "표준편차", "확률", "통계", "표본", "사각형", "삼각형",
    "원", "각도", "대수", "비율", "비례", "수열", "순환", "평면도형", "입체도형", "피타고라스",
    "삼각비", "기하", "공식", "근", "벡터", "행렬", "정수", "유리수", "실수", "복소수",
    "분수", "소수", "로그", "지수", "확률", "합", "곱셈", "계산", "미지수", "방정식",
    "삼각함수", "로그함수", "지수함수", "선형함수", "다항식", "이차함수", "산술", "곱셈법칙", "배수", "약수",
    "유클리드", "소수", "소수점", "진법", "이진법", "연립방정식", "부등식", "등식", "비례식",
    
    // 사회
    "경제", "인플레이션", "시장", "공급", "수요", "통화", "예산", "세금", "소비자", "생산자",
    "무역", "수출", "수입", "국내총생산", "실업", "금리", "환율", "저축", "투자", "주식",
    "채권", "보험", "국채", "투자금", "거래", "경쟁", "독점", "통화정책", "재정정책", "사회",
    "계층", "계급", "빈부격차", "복지", "노동", "노동시간", "연봉", "고용", "노동조합", "실업률",
    "연금", "정치", "헌법", "민주주의", "입법", "행정", "사법", "국회", "의회", "대통령",
    "선거", "투표", "정당", "법원", "검찰", "헌법재판소", "자유권", "평등권", "참정권", "인권",
    "교육", "국민", "복지제도", "정책", "자치", "지방자치", "문화", "사회화", "공동체", "갈등",
    "사회변동", "도시화", "산업화", "세계화", "사회운동", "환경", "환경오염", "지속가능성", "에너지", "재생에너지",
    "탄소배출", "지구온난화", "자연재해", "재해복구", "보건", "전염병", "질병관리", "예방", "위생", "복지",
    "건강보험", "의료", "의료비", "의료보험", "질병", "의료제도", "유전자", "사회문제", "법", "법률",
    "형법", "민법", "노동법", "환경법", "상법", "계약", "위법", "법적책임", "소송", "재판",
    "판결", "형사", "변호사", "검사", "범죄", "형벌", "구금", "인권보호", "통일", "남북관계",
    "외교", "무역협정", "국제관계", "국제법", "외교정책", "경제협력", "동맹", "주권", "평화", "안보",
    "국방", "군대", "병역", "전쟁", "군사", "외교관", "조약", "협정", "이민", "난민",
    "인구", "출생률", "사망률", "평균수명", "고령화", "노동력", "이주", "세계인구", "빈곤", "식량",
    "식량위기", "경제성장", "지방정부", "공공정책", "자본주의", "사회주의", "민족", "다문화", "문화유산", "관광",
    "세계문화유산", "전통문화", "예술", "역사", "유산", "고고학", "역사유적", "유교", "불교", "기독교",
    "이슬람교", "종교", "종교자유", "종교분쟁", "신화", "문학", "철학", "사회학", "정치학", "경제학",
    "심리학", "교육학", "경영학", "법학", "윤리", "도덕", "예술사", "현대사", "과거", "기록",
    "사료", "연구", "지식", "정보", "언론", "방송", "미디어", "인터넷", "소셜미디어", "디지털",
    "디지털화", "정보화사회", "네트워크", "커뮤니케이션", "저널리즘", "언론자유", "언론의역할", "출판", "광고", "마케팅"
];


app.use(express.static(path.join(__dirname, 'public')));

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

let currentWord = "";
let banWord = "";

io.on('connection', (socket) => {
    let count = 0;

    //내부 함수 정의
    function newWord(){
        currentWord = words[getRandomInt(words.length)];
        console.log("새 단어로 변경됨 : " + currentWord);
        io.emit('word', currentWord);
        io.emit('length', currentWord.length);
    }
    function renewCount(){
        console.log("카운트를 갱신합니다 : " + count);
        io.emit('count', count);
    }

    function renewBan(){
        banWord = getCho(currentWord[getRandomInt(currentWord.length)]);
        console.log("금지어를 갱신합니다 : " + banWord);
        io.emit('ban', banWord);
    }

    // 초성 추출 함수
    function getCho(character) {
        const uniCode = character.charCodeAt(0);
        if (uniCode < 0xAC00 || uniCode > 0xD7A3) return null; // 한글 범위 외 문자 예외 처리
        const choIndex = Math.floor((uniCode - 0xAC00) / 588);
        return CHO_LIST[choIndex];
    }

    // 문장에 특정 초성이 있는지 확인하는 함수
    function containsCho(sentence, targetCho) {
        for (const char of sentence) {
            if (getCho(char) === targetCho) return true;
        }
        return false;
    }

    function containsWord(sentence, target){
        for(const targetChar of target){
            for(const char of sentence){
                if(char==targetChar){
                    return true;
                }
            }
        }
        return false;
    }


    //접속 작동 시작
    console.log('사용자 연결됨');
    newWord();
    renewCount();
    renewBan();
    
    socket.on('send', (msg) => {
        //console.log("서버가 일반 메시지를 수신했습니다");
        if(containsWord(msg, currentWord) || containsCho(msg, banWord)){
            io.emit('system', "SYSTEM : 금지된 단어나 초성을 사용하였습니다");
        }
        else{
            io.emit('send', msg); // 모든 클라이언트에게 메시지 전달
        }
        
    });

    socket.on('system', (msg) => {
        io.emit('system', msg); // 모든 클라이언트에게 메시지 전달
    });

    socket.on('word', (msg) => {
        console.log("서버가 변경된 단어를 전달받았습니다");
        io.emit('word', msg); // 모든 클라이언트에게 메시지 전달
    });

    socket.on('count', (msg) => {
        console.log("서버가 카운트 메시지를 수신했습니다");
        io.emit('count', msg); // 모든 클라이언트에게 메시지 전달
    });

    socket.on('answer', (answer) => {
        console.log("서버가 정답제출을 수신했습니다");
        if(answer == currentWord){
            console.log("클라이언트가 정답을 맞혔습니다");
            count += currentWord.length*2;
            renewCount();
            io.emit('system', `SYSTEM : "${answer}"를 정답으로 제출, 정답입니다. 새로운 제시어로 변경됩니다`);
            newWord();
            renewBan();

        }
        else{
            io.emit('system', `SYSTEM : "${answer}"를 정답으로 제출, 틀렸습니다`)
        }

    });

    socket.on('disconnect', () => {
        console.log('사용자 연결 끊김');
    });

});

app.get('/', (req, res) => {
    let $query = req.query; 

    let pathname = req.path;
    const filePath = {
        home : path.join(__dirname, 'public', 'home.html'),
        send : path.join(__dirname, 'public', 'send.html'),
        answer : path.join(__dirname, 'public', 'answer.html')
    }
    function sendError(){
        res.status(404).send("ERROR WAS FOUND");
    }
    if(pathname === '/'){
        if($query.role == "HOME"){
            res.sendFile(filePath.home);
        }
        else if($query.role == "send"){
            res.sendFile(filePath.send);
        }
        else if($query.role == "answer"){
            res.sendFile(filePath.answer);    
        }
        else if($query.role == undefined){
            res.writeHead(302, {location : '/?role=HOME'});
            res.end();
        }
        else{
            sendError();
        }
    }
    else{
        sendError();
    }
});

mainServer.listen(port, () => {
   console.log(`Main Server is running at : ${port}`);
});



