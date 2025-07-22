import React from "react";
import { useQuotes } from "../../hooks/useQuotes";
import "./Widget.css";

export default function Quotes() {
  const { currentQuote, getNewQuote } = useQuotes();

  return (
    <div className="widget quotes-widget">
      <h3>💭 Daily Quote</h3>
      <div className="quote-content">
        <blockquote>"{currentQuote.text}"</blockquote>
        <cite>— {currentQuote.author}</cite>
      </div>
      <button onClick={getNewQuote} className="new-quote-btn">
        New Quote
      </button>
    </div>
  );
}
