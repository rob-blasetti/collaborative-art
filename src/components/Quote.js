import React from 'react';
import quotes from '../hiddenWords';  // Assuming the file exports an array of quotes

const RandomQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].text;

  return (
    <div className="quote-container">
      <p className="quote-text">"{randomQuote}"</p>
    </div>
  );
};

export default RandomQuote;
