
import React, { useEffect, useState, useMemo } from 'react';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim"; 
import "../Styles/Skill.css";
import particleconfig from './ParticleJSConfig/imagemask.json'

function Skill() {
    const [init, setInit] = useState(false);
  useEffect(()=>{
    initParticlesEngine(async (engine) => {
        await loadSlim(engine);
    }).then(()=>{
        setInit(true);
    })
  });

  const options = useMemo(
    () => (particleconfig),
    [],
  );

  if (init) {
    return (
      <Particles
        options={options}
      />
    );
  }

  return <></>;
  }

export default Skill
