import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SwipeCards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      color: "white",
      title: "Card 1",
      description: "This is the first card. Data will be filled from API."
    },
    {
      id: 2,
      color: "red",
      title: "Card 2",
      description: "This is the second card. Data will be filled from API."
    },
  ]);

  const handleClick = () => {
    setCards((prevCards) => [prevCards[1], prevCards[0]]);
  };

  return (
    <div
      className="relative h-screen w-full bg-neutral-100 flex items-center justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="relative w-72 h-96">
        <AnimatePresence>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              index={index}
              onClick={handleClick}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Card = ({ id, color, title, description, index, onClick }) => {
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
      className="absolute top-0 left-0 w-full h-full rounded-lg cursor-pointer overflow-hidden flex flex-col justify-between p-6"
      style={{ 
        backgroundColor: color,
        transformOrigin: index === 0 ? "center" : "bottom left",
        color: color === "white" ? "black" : "white"
      }}
      variants={variants}
      initial="back"
      animate={index === 0 ? "front" : "back"}
      exit="back"
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <div className="text-right">
        <span className="text-xs">ID: {id}</span>
      </div>
    </motion.div>
  );
};

export default SwipeCards;