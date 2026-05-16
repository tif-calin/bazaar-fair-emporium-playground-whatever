import { useMemo } from 'react';
import { drawIcon } from '../draw';

type Props = {
  seed: string;
  svgId: string;
};

const HandDrawnHeart2 = ({ seed, svgId }: Props) => {
  const { path, rotation, fill } = useMemo(() => drawIcon(seed), [seed]);

  return (
    <svg id={svgId} width="775" height="775" viewBox="0 0 400 400">
      <defs>
        <filter
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          id={`roughPaper-${seed}`}
        >
          <feTurbulence type="fractalNoise" baseFrequency="128" numOctaves="1" result="noise" />
          <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="2" result="diffLight">
            <feDistantLight azimuth="45" elevation="55"></feDistantLight>
          </feDiffuseLighting>
          <feGaussianBlur in="diffLight" stdDeviation="0.75" result="dlblur"></feGaussianBlur>
          <feComposite
            operator="arithmetic"
            k1="1.2"
            k2="0"
            k3="0"
            k4="0"
            in="dlblur"
            in2="SourceGraphic"
            result="out"
          />
        </filter>
        <filter
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
          filterUnits="objectBoundingBox"
          id={`pencil-${seed}`}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            result="noise"
          ></feTurbulence>
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="3"
            in="SourceGraphic"
            result="newSource"
          ></feDisplacementMap>
        </filter>
        <filter
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          id={`pencil2-${seed}`}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2"
            numOctaves="5"
            stitchTiles="stitch"
            result="f1"
          ></feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5"
            result="f2"
          ></feColorMatrix>
          <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3"></feComposite>
        </filter>
        <filter
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          id={`pencil3-${seed}`}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="5"
            stitchTiles="stitch"
            result="f1"
          ></feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5"
            result="f2"
          ></feColorMatrix>
          <feComposite operator="in" in2="f2b" in="SourceGraphic" result="f3"></feComposite>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            result="noise"
          ></feTurbulence>
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="12.5"
            in="f3"
            result="f4"
          ></feDisplacementMap>
        </filter>
        <filter
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          id={`pencil4-${seed}`}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            seed="1"
            result="f1"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="7"
            in="SourceGraphic"
            in2="f1"
            result="f4"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            seed="10"
            result="f2"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="9"
            in="SourceGraphic"
            in2="f2"
            result="f5"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="2"
            seed="100"
            result="f3"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="3"
            in="SourceGraphic"
            in2="f3"
            result="f6"
          />
          <feBlend mode="multiply" in2="f4" in="f5" result="out1"></feBlend>
          <feBlend mode="multiply" in="out1" in2="f6" result="out2"></feBlend>
        </filter>
      </defs>
      <g
        id={`icon-${seed}`}
        transform-origin="200 200"
        transform={`translate(0, -125) rotate(${-135 + rotation})`}
      >
        <path d={path} fill={fill} filter={`url(#roughPaper-${seed})`} />
        <path
          d={path}
          fill={`none`}
          filter={`url(#pencil-${seed})`}
          stroke-width="10"
          stroke="#1115"
        />
        <path
          d={path}
          fill={`none`}
          filter={`url(#pencil2-${seed})`}
          stroke-width="10"
          stroke="#1115"
        />
        <path
          d={path}
          fill={`none`}
          filter={`url(#pencil3-${seed})`}
          stroke-width="10"
          stroke="#1115"
        />
        <path
          d={path}
          fill={`none`}
          filter={`url(#pencil4-${seed})`}
          stroke-width="10"
          stroke="#1115"
        />
      </g>
    </svg>
  );
};

export default HandDrawnHeart2;
