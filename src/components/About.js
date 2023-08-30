import React from 'react';
import '../style/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Sacred Canvas</h1>
      <p>Welcome to Sacred Canvas, a collaborative game for the Baha'i community!</p>

      <h2>How It Works</h2>
      <p>Sacred Canvas is a unique game where members of the Baha'i community come together to unveil a beautiful work of art by clicking tiles. Each tile reveals a small part of the picture, and every member can click one tile per day.</p>

      <h2>Community Treasury</h2>
      <p>As part of the game, members can also make donations to the community treasury. However, there's a twist! Donations will only go through if the entire picture is completed within the current month. If the picture is not completed, the donation money is automatically revoked and returned to the donors.</p>

      <h2>Collective Participation</h2>
      <p>We encourage collective participation and teamwork to complete the picture before the end of the month. By clicking tiles and making donations, every member contributes to the collaborative effort of creating a beautiful masterpiece.</p>

      <h2>Join Us</h2>
      <p>Join the Sacred Canvas community and become a part of this exciting collaborative game. Let's come together, click tiles, and work towards completing the picture while supporting the Baha'i community.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions or suggestions, feel free to contact us at <a href="mailto:info@sacredcanvas.com">info@sacredcanvas.com</a>.</p>
    </div>
  );
};

export default About;
