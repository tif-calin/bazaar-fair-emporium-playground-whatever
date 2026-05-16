import { useMemo } from 'react';
import { drawIcon } from '../draw';

type Props = {
  svgId: string;
  seed: string;
};

const HandDrawnHeart1 = ({ svgId, seed }: Props) => {
  const { path, rotation, fill } = useMemo(() => drawIcon(seed), [seed]);

  return (
    <svg id={svgId} viewBox="0 0 400 400" width="200" height="200">
      <defs>
        <filter id={`chalk-${seed}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence baseFrequency="9.999" numOctaves="1" result="noise" type="fractalNoise" />
          <feComponentTransfer in="noise" result="speckle">
            <feFuncA type="linear" slope="20" intercept="-7" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="speckle" operator="in" />
        </filter>
        <filter id={`crayon-${seed}`}>
          <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" type="fractalNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g
        fill={fill}
        filter={`url(#crayon-${seed})`}
        id={`icon-${seed}`}
        transform-origin="200 200"
        transform={`translate(0, -125) rotate(${-135 + rotation})`}
      >
        <path filter={`url(#chalk-${seed})`} d={path} />
        <path d={path} fill="none" stroke-width="20" stroke="#111d" />
      </g>
    </svg>
  );
};

export default HandDrawnHeart1;
