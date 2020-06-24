import React from 'react';
import { useCallbackWithCleanup } from 'utility/hooks';
import {
  hsvToRgb,
  formatRgb,
  angleToXY,
  uniqueId,
  subscribeMoveEvents,
  getClientMidpointForElement,
} from 'utility';
import { getPath } from '../common';
import { Handle } from '../Handle';
import styles from './SaturationControl.module.css';

const tau = 2 * Math.PI;
const satRadiusMultiplier = 2 / 3;
const satStartAngle = (tau / 60) * 2;
const satEndAngle = (tau / 60) * 28;
const atan2Max = tau / 4 - satStartAngle;
const atan2Min = -1 * (satEndAngle - tau / 4);
const atan2Range = atan2Max - atan2Min;

const satToXY = (radius, sat) => {
  // sat [0-1]
  // sat angle
  const satAngle = satStartAngle + (satEndAngle - satStartAngle) * sat;
  return angleToXY(radius * satRadiusMultiplier, satAngle);
};

const SaturationHandle = ({ radius, hsv, ...props }) => {
  const { x, y } = satToXY(radius, hsv.s);

  return (
    <Handle
      radius={radius}
      rgb={hsvToRgb({ ...hsv, v: 1 })}
      x={x}
      y={y}
      {...props}
    />
  );
};

export const SaturationControl = ({
  radius,
  hsv,
  containerRef,
  onChange,
  className = '',
  ...props
}) => {
  const satRadius = radius * satRadiusMultiplier;

  const idBase = React.useRef(uniqueId());

  const hsvRef = React.useRef(null);
  hsvRef.current = hsv;

  const onChangeRef = React.useRef(null);
  onChangeRef.current = onChange;

  const saturationOverlayRefCallback = useCallbackWithCleanup(
    React.useCallback(
      (node) => {
        const onMove = ({ e, clientX, clientY }) => {
          e.stopPropagation();
          e.preventDefault();

          const midpoint = getClientMidpointForElement(containerRef);
          const atan2 = Math.atan2(
            -1 * (clientY - midpoint.y),
            clientX - midpoint.x
          );

          // Clamp atan2 output range into the angular range of the arc used for the control
          const clampedAngle = Math.max(Math.min(atan2, atan2Max), atan2Min);

          // Convert clamped angle to saturation value
          const newSat = 1 - (clampedAngle - atan2Min) / atan2Range;

          // console.log(`${atan2}, ${clampedAngle}, ${newSat}, ${clampedAngle}`);
          if (onChangeRef.current) {
            onChangeRef.current({ ...hsvRef.current, s: newSat });
          }
        };

        return subscribeMoveEvents(node, onMove, onMove, onMove);
      },
      [containerRef]
    )
  );

  return (
    <g>
      <linearGradient
        id={`${idBase.current}_sat1`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 0, v: 1 }))}
        />
        <stop
          offset="100%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 1 / 3, v: 1 }))}
        />
      </linearGradient>
      <linearGradient
        id={`${idBase.current}_sat2`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 1 / 3, v: 1 }))}
        />
        <stop
          offset="100%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 2 / 3, v: 1 }))}
        />
      </linearGradient>
      <linearGradient
        id={`${idBase.current}_sat3`}
        gradientUnits="objectBoundingBox"
        x1="1"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 2 / 3, v: 1 }))}
        />
        <stop
          offset="100%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, s: 1, v: 1 }))}
        />
      </linearGradient>
      <path
        d={getPath(
          satRadius,
          angleToXY(satRadius, satStartAngle),
          angleToXY(
            satRadius,
            satStartAngle + (satEndAngle - satStartAngle) / 3
          )
        )}
        stroke={`url(#${idBase.current}_sat1)`}
        strokeLinecap="round"
      />
      <path
        d={getPath(
          satRadius,
          angleToXY(
            satRadius,
            satStartAngle + ((satEndAngle - satStartAngle) * 2) / 3
          ),
          angleToXY(satRadius, satEndAngle)
        )}
        stroke={`url(#${idBase.current}_sat3)`}
        strokeLinecap="round"
      />
      <path
        d={getPath(
          satRadius,
          angleToXY(
            satRadius,
            satStartAngle + (satEndAngle - satStartAngle) / 3
          ),
          angleToXY(
            satRadius,
            satStartAngle + ((satEndAngle - satStartAngle) * 2) / 3
          )
        )}
        stroke={`url(#${idBase.current}_sat2)`}
      />
      <SaturationHandle radius={radius} hsv={hsv} className={styles.handle} />
      <path
        className={styles.overlay}
        d={getPath(
          satRadius,
          angleToXY(satRadius, satStartAngle),
          angleToXY(satRadius, satEndAngle)
        )}
        stroke="white"
        strokeLinecap="round"
        ref={saturationOverlayRefCallback}
      />
    </g>
  );
};
