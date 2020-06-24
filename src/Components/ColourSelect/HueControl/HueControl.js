import React from 'react';
import {
  hasValue,
  useCallbackWithCleanup,
  subscribeMoveEvents,
  hsvToRgb,
  angleToXY,
  getClientMidpointForElement,
} from 'utility';
import { getPath } from '../common';
import { Handle } from '../Handle';
import styles from './HueControl.module.css';

const tau = 2 * Math.PI;
const numSegments = 6;
const stepAngle = tau / numSegments;

const pathWidthMultiplier = 0.17;

const HueHandle = ({ radius, hsv, ...props }) => {
  const { x, y } = angleToXY(radius, tau * hsv.h);

  return (
    <Handle
      radius={radius}
      rgb={hsvToRgb({ ...hsv, s: 1, v: 1 })}
      x={x}
      y={y}
      stroke={'black'}
      {...props}
    />
  );
};

const HueWheel = ({ radius, ...props }) => {
  return (
    <>
      {
        ['redyel', 'yelgre', 'grecya', 'cyablu', 'blumag', 'magred'].reduce(
          (acc, cur, idx, src) => {
            // First arc starts at 0,-radius (top-center of circle)
            const angle = (idx + 1) * stepAngle;

            acc.gradients.push(
              <path
                key={cur}
                d={
                  getPath(radius, acc.last, angleToXY(radius, angle + 0.005)) // Add a little to angle to overlap chords and avoid SVG artifact
                }
                stroke={`url(#${cur})`}
              />
            );
            acc.last = angleToXY(radius, angle);
            return acc;
          },
          { last: { x: 0, y: -radius }, gradients: [] }
        ).gradients
      }
    </>
  );
};
export const HueControl = ({
  radius,
  hsv,
  containerRef,
  onChange,
  offsetMode = false,
  className = '',
}) => {
  const hsvRef = React.useRef(null);
  hsvRef.current = hsv;

  const onChangeRef = React.useRef(null);
  onChangeRef.current = onChange;

  const [last, setLast] = React.useState(null);

  React.useEffect(() => {
    onChangeRef.current &&
      hasValue(last) &&
      onChangeRef.current({ s: 1, v: 1, ...hsvRef.current, h: last });
  }, [last]);

  const hueOverlayRefCallback = useCallbackWithCleanup(
    React.useCallback(
      (node) => {
        const onMove = ({ e, clientX, clientY }) => {
          e.stopPropagation();
          e.preventDefault();

          const midpoint = getClientMidpointForElement(containerRef);
          const newHue =
            Math.atan2(-(clientX - midpoint.x), clientY - midpoint.y) / tau +
            0.5;
          setLast(newHue);
        };

        return subscribeMoveEvents(node, onMove, onMove, onMove);
      },
      [containerRef]
    )
  );

  return (
    <g>
      <linearGradient
        id="redyel"
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop offset="0%" stopColor="#ff0000" />
        <stop offset="100%" stopColor="#ffff00" />
      </linearGradient>
      <linearGradient
        id="yelgre"
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor="#ffff00" />
        <stop offset="100%" stopColor="#00ff00" />
      </linearGradient>
      <linearGradient
        id="grecya"
        gradientUnits="objectBoundingBox"
        x1="1"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor="#00ff00" />
        <stop offset="100%" stopColor="#00ffff" />
      </linearGradient>
      <linearGradient
        id="cyablu"
        gradientUnits="objectBoundingBox"
        x1="1"
        y1="1"
        x2="0"
        y2="0"
      >
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="100%" stopColor="#0000ff" />
      </linearGradient>
      <linearGradient
        id="blumag"
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="1"
        x2="0"
        y2="0"
      >
        <stop offset="0%" stopColor="#0000ff" />
        <stop offset="100%" stopColor="#ff00ff" />
      </linearGradient>
      <linearGradient
        id="magred"
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="1"
        x2="1"
        y2="0"
      >
        <stop offset="0%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#ff0000" />
      </linearGradient>
      {offsetMode ? (
        <>
          <g transform={` rotate(${hsv.h * 360} 0 0)`}>
            <HueWheel radius={radius - radius * pathWidthMultiplier - 1} />
          </g>
          <HueWheel radius={radius} />
        </>
      ) : (
        <HueWheel radius={radius} />
      )}
      <HueHandle radius={radius} hsv={hsv} className={styles.handle} />
      <circle
        className={styles.overlay}
        r={radius}
        stroke="white"
        ref={hueOverlayRefCallback}
      />
    </g>
  );
};
