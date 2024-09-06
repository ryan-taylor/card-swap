import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SwipeCards = () => {
  const [apiResult, setApiResult] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      color: "white",
      title: "Card 1",
      description: "This is the first card. Data will be filled from API."
    },
    {
      id: 2,
      color: "white",
      title: "Card 2",
      description: "This is the second card. Border color depends on API result."
    },
  ]);
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);
  const cardRefs = useRef(cards.map(() => React.createRef()));

  // Simulated API call
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual API call
      const result = await new Promise(resolve => setTimeout(() => resolve(Math.random() < 0.5), 1000));
      setApiResult(result);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setCards((prevCards) => [prevCards[1], prevCards[0]]);
    setFocusedCardIndex(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      handleClick();
    }
  };

  useEffect(() => {
    cardRefs.current[focusedCardIndex].current.focus();
  }, [focusedCardIndex]);

  return (
    <div
      className="relative h-screen w-full bg-neutral-100 flex items-center justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <div 
        id="main-content"
        className="relative w-72 h-96"
        role="region"
        aria-label="Card Stack"
        aria-live="polite"
      >
        <div className="sr-only">
          Use left and right arrow keys to navigate between cards.
        </div>
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              index={index}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              borderColor={card.id === 2 ? (apiResult ? 'red' : 'green') : undefined}
              ref={cardRefs.current[index]}
              tabIndex={index === 0 ? 0 : -1}
              aria-hidden={index !== 0}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Card = React.forwardRef(({ id, color, borderColor, title, description, index, onClick, onKeyDown }, ref) => {
  const variants = {
    front: { 
      rotateY: 0,
      rotate: 0,
      scale: 1, 
      x: 0,
      y: 0,
      zIndex: 2,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
    },
    back: { 
      rotateY: 0,
      rotate: 15,
      scale: 0.95, 
      x: "-10%",
      y: "-5%",
      zIndex: 1,
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
    },
  };

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full rounded-lg cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{ 
        transformOrigin: index === 0 ? "center" : "bottom left",
      }}
      variants={variants}
      initial="back"
      animate={index === 0 ? "front" : "back"}
      exit="back"
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      aria-label={`Card ${id}: ${title}`}
      aria-describedby={`card-${id}-description`}
      aria-hidden={index !== 0}
      tabIndex={index === 0 ? 0 : -1}
      aria-roledescription="swipeable card"
      aria-live={index === 0 ? "polite" : "off"}
    >
      <div 
        className={`w-full h-full rounded-lg ${borderColor ? 'p-2' : ''}`} 
        style={{ backgroundColor: borderColor || color }}
      >
        <div className="w-full h-full rounded-lg bg-white overflow-hidden">
          <div className="w-full h-full flex flex-col justify-between p-4">
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <p id={`card-${id}-description`} className="text-sm text-black">{description}</p>
            <div className="text-right">
              <span className="text-xs text-black">ID: {id}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SwipeCards;