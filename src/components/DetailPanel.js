import React from 'react';
import '../style/Panel.css';

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
