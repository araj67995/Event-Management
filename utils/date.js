function formatDateToDDMMYYYY(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function capitalizeWords(val) {
  if (typeof val !== 'string') return '';
  return val
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatMonthYear(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

module.exports = { formatDateToDDMMYYYY, capitalizeWords, formatMonthYear };