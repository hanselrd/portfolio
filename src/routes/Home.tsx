import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { animated, useSpring } from 'react-spring';

const Home: React.FC = () => {
  const [active, setActive] = useState(false);

  const spring = useSpring({
    width: active ? '100%' : '0%',
    progress: active ? 100 : 0,
    backgroundColor: active ? 'hotpink' : 'turquoise',
    config: { duration: 1000 }
  });

  return (
    <div>
      <Helmet>
        <title>Home - Hansel De La Cruz</title>
      </Helmet>
      <p>Home</p>
      <div
        onClick={() => {
          setActive(!active);
        }}
        className="w-64 h-8 text-center border-4 border-black cursor-pointer"
      >
        <animated.div className="w-full h-full text-center bg-red-500" style={spring} />
        <animated.div className="-mt-6">
          {spring.progress.interpolate(x => Math.floor(x as number))}
        </animated.div>
      </div>
    </div>
  );
};

export default Home;
