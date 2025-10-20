import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const VanishText = () => {
  return (
    <div className=" px-4 py-24 text-center md:py-24">
      <h3
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-400 mt-10"
  style={{ fontFamily: "'Anton', sans-serif", fontWeight: 500 }}
>
  We provide services to
  <AnimatedText
    phrases={[
      "Cafe",
      "Hotels",
      "Restaurants",
      "Real Estates",
      "Gym & Fitness",
      "Spa & Saloons",
      "Small Businesses",
    ]}
  />
</h3>
    </div>
  );
};

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const AnimatedText = ({ phrases }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setActive((pv) => (pv + 1) % phrases.length);
    }, WAIT_TIME);

    return () => clearInterval(intervalRef);
  }, [phrases]);

  return (
    <div className="relative mb-14 mt-2 w-full">
      {phrases.map((phrase) => {
        const isActive = phrases[active] === phrase;
        return (
          <motion.div
            key={phrase}
            initial={false}
            animate={isActive ? "active" : "inactive"}
            style={{
              x: "-50%",
            }}
            variants={{
              active: {
                opacity: 1,
                scale: 1,
              },
              inactive: {
                opacity: 0,
                scale: 0,
              },
            }}
            className="absolute left-1/2 top-0 w-full text-violet-50"
          >
            {phrase}
          </motion.div>
        );
      })}
    </div>
  );
};