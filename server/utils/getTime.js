const moment = require("moment");

// 작성 시간과 현재 시간 차이 반환
const getTime = (createdTime) => {
  const now = moment(new Date()); //todays date
  const calcTime = moment.duration(now.diff(createdTime)).asMilliseconds();

  if (calcTime < 1000) {
    return { time: 1, unit: "초" };
  }
  if (calcTime >= 1000 && calcTime < 60000) {
    const second = moment.duration(now.diff(createdTime)).asSeconds();
    return { time: Math.floor(second), unit: "초" };
  }
  if (calcTime >= 60000 && calcTime < 3600000) {
    const minute = moment.duration(now.diff(createdTime)).asMinutes();
    return { time: Math.floor(minute), unit: "분" };
  }
  if (calcTime >= 3600000 && calcTime < 86400000) {
    const hours = moment.duration(now.diff(createdTime)).asHours();
    return { time: Math.floor(hours), unit: "시간" };
  }
  // 86400000ms => 24시간
  if (calcTime >= 86400000 && calcTime < 604800000) {
    const days = moment.duration(now.diff(createdTime)).asDays();
    return { time: Math.floor(days), unit: "일" };
  }
  if (calcTime >= 604800000) {
    const weeks = moment.duration(now.diff(createdTime)).asWeeks();
    return { time: Math.floor(weeks), unit: "주" };
  }
};

module.exports = { getTime };
