//离线状态下需要用到的常量：
export const categoryOptions = [
  {label: 'Work & study', value: 1},
  {
    label: 'Leisure & Recreation',
    value: 2,
  },
  {label: 'Sports', value: 3},
  {
    label: 'Family & Socializing',
    value: 4,
  },
  {
    label: 'Personal Development',
    value: 5,
  },
  {label: 'Daily Living', value: 6},
];

export const priorityOptions = [
  {label: 'High', value: 1},
  {label: 'Medium', value: 2},
  {label: 'Low', value: 3},
];
//每种日程类别对应什么颜色
export const categoryColors = [
  '#FFD700',
  '#FFA500',
  '#FF6347',
  '#FF4500',
  '#FF0000',
  '#DC143C',
];

export const identityOptions = [
  {
    label: 'Student',
    value: 1,
    src: require('../assets/images/portrait_student.png'),
  },
  {
    label: 'Office Worker',
    value: 2,
    src: require('../assets/images/portrait_officeworker.png'),
  },
  {
    label: 'Freelancer',
    value: 3,
    src: require('../assets/images/portrait_freelancer.png'),
  },
  {
    label: 'Homemaker',
    value: 4,
    src: require('../assets/images/portrait_homemaker.png'),
  },
  {
    label: 'Entrepreneur',
    value: 5,
    src: require('../assets/images/portrait_entrepreneur.png'),
  },
  {
    label: 'Others',
    value: 6,
    src: require('../assets/images/portrait_others.png'),
  },
];
//每种身份对应的头像 索引和上面的身份选项对应
export const identityAvatars = [
  require('../assets/images/student.png'),
  require('../assets/images/office_worker.png'),
  require('../assets/images/freelancer.png'),
  require('../assets/images/homemaker.png'),
  require('../assets/images/entrepreneur.png'),
  require('../assets/images/others.png'),
];

export const studentOptions = [
  {label: 'Junior High Student', value: 1},
  {label: 'Senior High School Student', value: 2},
  {label: 'Undergraduate Student', value: 3},
  {label: 'Postgraduates', value: 4},
];

export const sleepOptions = [
  {label: 'Less than 6 hours', value: 1},
  {label: '6-7 hours', value: 2},
  {label: '7-8 hours', value: 3},
  {label: 'More than 8 hours', value: 4},
];

export const exerciseOptions = [
  {label: 'Everyday', value: 1},
  {label: 'A few times a week', value: 2},
  {label: 'A few times a month', value: 3},
  {label: 'Rarely', value: 4},
];

export const challengeOptions = [
  {label: 'Inability to concentrate', value: 1},
  {label: 'Too many tasks', value: 2},
  {label: 'Lack of prioritisation', value: 3},
  {label: 'Confusing schedule', value: 4},
  {label: 'Others', value: 5},
];


