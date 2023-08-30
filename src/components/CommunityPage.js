import React, { useState, useEffect } from 'react';
import { getCommunityDetails } from '../helpers'; // Import your helper function to fetch community details

const CommunityPage = ({ communityId }) => {
  const [communityDetails, setCommunityDetails] = useState(null);

  useEffect(() => {
    // Fetch community details based on the provided communityId
    const fetchDetails = async () => {
      try {
        const details = await getCommunityDetails(communityId); // Use your helper function here
        setCommunityDetails(details);
      } catch (error) {
        console.error('Error fetching community details:', error);
      }
    };

    fetchDetails();
  }, [communityId]);

  if (!communityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="community-page">
      <h1>Community Details</h1>
      <p>Community ID: {communityDetails.communityId}</p>
      <p>Active Members: {communityDetails.activeMembers}</p>
      <p>Total Members: {communityDetails.totalMembers}</p>
      <p>Treasury Address: {communityDetails.treasuryAddress}</p>
      <p>Donated Funds: {communityDetails.donatedFunds} ETH</p>
      <p>Revoked Funds: {communityDetails.revokedFunds} ETH</p>
    </div>
  );
};

export default CommunityPage;
