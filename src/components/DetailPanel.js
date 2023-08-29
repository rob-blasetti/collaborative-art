import React, { useState, useEffect } from 'react';
import { getActiveMembers } from '../helpers';  // import the helper function
import '../style/Panel.css';

const DetailPanel = ({ month, communityName, donations, remainingTiles }) => {
  const [activeMembers, setActiveMembers] = useState(null);

  useEffect(() => {
    // Fetch the active member count when the component mounts
    const fetchActiveMembers = async () => {
      try {
        const count = await getActiveMembers();
        setActiveMembers(count);
      } catch (error) {
        console.error('Error fetching active user count:', error);
      }
    };
  
    fetchActiveMembers();
  }, []);  

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
        <p className="panel-item-content">{activeMembers !== null ? activeMembers : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default DetailPanel;
