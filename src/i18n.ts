import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      brand: 'LinguaVerse',
      nav: {
        home: 'Home',
        courses: 'Courses',
        dashboard: 'Dashboard',
        community: 'Community',
        profile: 'Profile',
        admin: 'Admin',
      },
      hero: {
        title: 'A cinematic language studio built for serious daily practice.',
        subtitle: 'Level-based courses, adaptive recommendations, and social motivation for English, Japanese, Korean, and more.',
        primary: 'Start Learning',
        secondary: 'See Learning Studio',
      },
      common: {
        loading: 'Loading your learning world...',
        save: 'Save changes',
        continue: 'Continue',
        practice: 'Practice now',
        points: 'points',
      },
    },
  },
  ja: {
    translation: {
      brand: 'LinguaVerse',
      nav: { home: 'ホーム', courses: 'コース', dashboard: '進捗', community: 'コミュニティ', profile: 'プロフィール', admin: '管理' },
      hero: {
        title: '毎日の本気の学習に向けた、没入型ランゲージスタジオ。',
        subtitle: '英語、日本語、韓国語などに対応したレベル別コース、最適化された推薦、コミュニティの後押し。',
        primary: '学習を始める',
        secondary: '学習スタジオを見る',
      },
      common: { loading: '学習空間を読み込み中...', save: '保存', continue: '続ける', practice: '練習する', points: 'ポイント' },
    },
  },
  ko: {
    translation: {
      brand: 'LinguaVerse',
      nav: { home: '홈', courses: '코스', dashboard: '진도', community: '커뮤니티', profile: '프로필', admin: '관리' },
      hero: {
        title: '몰입감 있는 언어 학습 스튜디오로 매일의 훈련을 이어가세요.',
        subtitle: '영어, 일본어, 한국어 등 다양한 언어를 위한 레벨 기반 코스와 추천, 커뮤니티 동기부여를 제공합니다.',
        primary: '학습 시작',
        secondary: '학습 스튜디오 보기',
      },
      common: { loading: '학습 화면을 불러오는 중...', save: '저장', continue: '계속', practice: '연습하기', points: '포인트' },
    },
  },
  zh: {
    translation: {
      brand: 'LinguaVerse',
      nav: { home: '首页', courses: '课程', dashboard: '进度', community: '社区', profile: '个人', admin: '管理台' },
      hero: {
        title: '为高频日常训练打造的沉浸式语言学习平台。',
        subtitle: '支持英语、日语、韩语等主流语言，提供分级课程、自适应推荐与社区激励。',
        primary: '开始学习',
        secondary: '查看学习工作台',
      },
      common: { loading: '正在加载学习空间...', save: '保存', continue: '继续', practice: '开始练习', points: '积分' },
    },
  },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
