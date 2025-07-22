import { useState } from "react";

const MOCK_QUOTES = [
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
];

export function useQuotes() {
  const [currentQuote, setCurrentQuote] = useState(
    MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)]
  );

  const getNewQuote = () => {
    const randomQuote =
      MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)];
    setCurrentQuote(randomQuote);
  };

  return { currentQuote, getNewQuote };
}
