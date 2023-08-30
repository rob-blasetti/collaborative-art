import { monthsData } from './monthsData.js';
import Web3 from 'web3';

const contractAddress = '0x0152dA677fa5621bed69626A45C1560f67233c37';

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

const getDonationsAmount = async () => {
  try {
    const balance = await web3.eth.getBalance(contractAddress);
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('Error fetching contract balance:', error);
    return 'N/A';
  }
};

const getRemainingTiles = async () => {
  try {
    const response = await fetch('http://localhost:5000/getRemainingTiles');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Failed to fetch remaining tiles:', error);
    return 0;  // Or some default value
  }
};

const getActiveMembers = async () => {
  try {
    const response = await fetch('http://localhost:5000/activeUsersCount');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Failed to fetch active users count:', error);
    return 0;  // Or some default value
  }
};


let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('MetaMask not detected');
}

export {
  getBahaiMonth,
  getBahaiCommunity,
  getDonationsAmount,
  getRemainingTiles,
  getActiveMembers,
  web3
};