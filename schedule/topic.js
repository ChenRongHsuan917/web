var topic = [
    "清明連假",
    "期中考週",
    "四驗 (影片)",
    "五驗 (100%)",
    "回家",
    "六驗",
    "總驗"
];

var startDate = new Date();

function setMonthAndDay(startMonth, startDay){
    //一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}
setMonthAndDay(4,3);