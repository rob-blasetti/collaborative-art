import React from 'react';
import '../style/Panel.css';
import { monthsData } from '../monthsData.js';

const currentDate = new Date();
console.log(currentDate);

const year = 2023;

const daysInMonth = [
  19, 19, 19, 18, 18, 19, 18, 19, 19, 18, 18, 19, // Bahá'í months have 19 days
  30 // Ayyám-i-Há has 4 days (year-dependent)
];

const formattedDaysData = [];

let dayCounter = 1;

for (let monthIndex = 0; monthIndex < monthsData.length; monthIndex++) {
  const month = monthsData[monthIndex];
  const daysInCurrentMonth = daysInMonth[monthIndex];

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const formattedDate = new Date(year, monthIndex + 2, day).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    formattedDaysData.push({ day: formattedDate, month: month.eventName });
  }
}

console.log(formattedDaysData);



const DetailPanel = ({ month, communityName, donations, remainingTiles, activeMembers }) => {
  return (
    <div className="panel">
      <div className="panel-item">
        <h3 className="panel-item-title">Month</h3>
        <p className="panel-item-content">{month}</p>
      </div>
      <div className="panel-item">
        <h3 className="panel-item-title">Community Name</h3>
        <p className="panel-item-content">{communityName}</p>
      </div>
      <div className="panel-item">
        <h3 className="panel-item-title">Donations</h3>
        <p className="panel-item-content">{donations}</p>
      </div>
      <div className="panel-item">
        <h3 className="panel-item-title">Remaining Tiles</h3>
        <p className="panel-item-content">{remainingTiles}</p>
      </div>
      <div className="panel-item">
        <h3 className="panel-item-title">Active Members</h3>
        <p className="panel-item-content">{activeMembers}</p>
      </div>
    </div>
  );
};

export default DetailPanel;
