export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
// 日期转换为序数
export function convertToOrdinal(number: number) {
  if (number % 100 === 11 || number % 100 === 12 || number % 100 === 13) {
    return number + 'th';
  } else {
    let lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
      default:
        return number + 'th';
    }
  }
}
// 日期转换为2024-07-10格式
export function toDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
// 日期从2024-07-10格式转换为Date
export function fromDate(date: string) {
  const dateParts = date.split('-');
  return new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2]),
  );
}
// 日期转换为23:59:00格式
export function toTime(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
}
// 时间从23:59:00格式转换为Date
export function fromTime(time: string) {
  const timeParts = time.split(':');
  console.log(timeParts);
  return new Date(2000, 0, 1, parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]));
}

// 把标准日期格式转换为好看的格式
export function formatDate(inputDate: string): string {
  const dateParts = inputDate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  // Create a Date object (months are zero-based in JavaScript)
  const date = new Date(year, month - 1, day);

  // Define month names and suffixes for days
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daySuffixes = ['st', 'nd', 'rd', 'th'];

  // Get month name and day with suffix
  const monthName = monthNames[date.getMonth()];
  const dayNumber = date.getDate();
  let daySuffix = 'th';
  if (dayNumber <= 3) {
      daySuffix = daySuffixes[dayNumber - 1];
  }

  // Construct formatted date string
  const formattedDate = `${monthName} ${dayNumber}${daySuffix}, ${year}`;

  return formattedDate;
}
