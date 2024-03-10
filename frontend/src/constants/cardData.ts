import { IMAGE } from './image';

const CARD_DATA = Object.freeze([
  {
    image: IMAGE.AttendanceIcon,
    description: 'AttendanceIcon',
    content: '수강 신청',
    title: '수강 신청 바로 가기',
    hashtag: '#개설강의목록 #수강신청내역',
    link: '/enrollment',
  },
  {
    image: IMAGE.CalendarIcon,
    description: 'CalendarIcon',
    content: '학기 시간표가 궁금하다면?',
    title: '시간표 확인하기',
    hashtag: '#학기시간표 #강의확인',
    link: '/lecture',
  },
  {
    image: IMAGE.CommunityIcon,
    description: 'CommunityIcon',
    content: '수강생 의견',
    title: '자유롭게 소통하기',
    hashtag: '#의견 #소통 #정보공유',
    link: '/',
  },
  {
    image: IMAGE.NoticeIcon,
    description: 'NoticeIcon',
    content: '과제가 궁금하다면?',
    title: '공지 확인하기',
    hashtag: '#일정 #과제 #공지',
    link: '/',
  },
]);

export default CARD_DATA;
