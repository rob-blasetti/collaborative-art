import { monthsData } from './monthsData.js';

const getBahaiMonth = () => {
  const todaysDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });

  const matchedMonth = monthsData.find(data => data.day === todaysDate);

  return matchedMonth ? matchedMonth.month : 'No matching month found';
};

const getBahaiCommunity = () => {
  // Implement the logic to get the Bahai community data
  // Example:
  return 'Banyule';
};

const getDonationsAmount = () => {
  // Implement the logic to get the donations amount
  // Example:
  return '$1000';
};

const getRemainingTiles = () => {
  // Implement the logic to get the remaining tiles
  // Example:
  return 50;
};

const getActiveMembers = () => {
  // Implement the logic to get the active members count
  // Example:
  return 200;
};

export {
  getBahaiMonth,
  getBahaiCommunity,
  getDonationsAmount,
  getRemainingTiles,
  getActiveMembers
};