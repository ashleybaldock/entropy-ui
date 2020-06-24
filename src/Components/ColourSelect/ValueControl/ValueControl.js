import React from 'react';
import { useCallbackWithCleanup } from 'utility';
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
import styles from './ValueControl.module.css';

const tau = 2 * Math.PI;
const valRadiusMultiplier = 2 / 3;
const valStartAngle = (tau / 60) * 32;
const valEndAngle = (tau / 60) * 58;
const atan2Max = tau / 4 - (valStartAngle - tau / 2);
const atan2Min = -1 * (valEndAngle - (3 * tau) / 4);
const atan2Range = atan2Max - atan2Min;

const valToXY = (radius, val) => {
  // val in [0-1]
  const valAngle = valStartAngle + (valEndAngle - valStartAngle) * (1 - val);
  return angleToXY(radius * valRadiusMultiplier, valAngle);
};

const ValueHandle = ({ radius, hsv, ...props }) => {
  const { x, y } = valToXY(radius, hsv.v);

  return (
    <Handle radius={radius} rgb={hsvToRgb({ ...hsv })} x={x} y={y} {...props} />
  );
};

export const ValueControl = ({
  radius,
  hsv,
  containerRef,
  onChange,
  ...props
}) => {
  const valRadius = radius * valRadiusMultiplier;

  const idBase = React.useRef(uniqueId());

  const hsvRef = React.useRef(null);
  hsvRef.current = hsv;

  const onChangeRef = React.useRef(null);
  onChangeRef.current = onChange;

  const valueOverlayRefCallback = useCallbackWithCleanup(
    React.useCallback(
      (node) => {
        const onMove = ({ e, clientX, clientY }) => {
          e.stopPropagation();
          e.preventDefault();

          const midpoint = getClientMidpointForElement(containerRef);
          const atan2 = Math.atan2(
            clientY - midpoint.y,
            -1 * (clientX - midpoint.x)
          );

          // Clamp atan2 output range into the angular range of the arc used for the control
          const clampedAngle = Math.max(Math.min(atan2, atan2Max), atan2Min);

          // Convert clamped angle to saturation value
          const newVal = (clampedAngle - atan2Min) / atan2Range;

          // console.log(`${atan2}, ${clampedAngle}, ${newVal}, ${clampedAngle}`);
          if (onChangeRef.current) {
            onChangeRef.current({ ...hsvRef.current, v: newVal });
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
        id={`${idBase.current}_val1`}
        gradientUnits="objectBoundingBox"
        x1="1"
        y1="1"
        x2="0"
        y2="0"
      >
        <stop offset="0%" stopColor={formatRgb(hsvToRgb({ ...hsv, v: 1 }))} />
        <stop
          offset="100%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, v: 2 / 3 }))}
        />
      </linearGradient>
      <linearGradient
        id={`${idBase.current}_val2`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="1"
        x2="0"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, v: 2 / 3 }))}
        />
        <stop
          offset="100%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, v: 1 / 3 }))}
        />
      </linearGradient>
      <linearGradient
        id={`${idBase.current}_val3`}
        gradientUnits="objectBoundingBox"
        x1="0"
        y1="1"
        x2="1"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor={formatRgb(hsvToRgb({ ...hsv, v: 1 / 3 }))}
        />
        <stop offset="100%" stopColor={formatRgb(hsvToRgb({ ...hsv, v: 0 }))} />
      </linearGradient>
      <path
        d={getPath(
          valRadius,
          angleToXY(valRadius, (tau / 60) * 32),
          angleToXY(valRadius, (tau / 60) * 41)
        )}
        stroke={`url(#${idBase.current}_val1)`}
        strokeLinecap="round"
      />
      <path
        d={getPath(
          valRadius,
          angleToXY(valRadius, (tau / 60) * 50),
          angleToXY(valRadius, (tau / 60) * 58)
        )}
        stroke={`url(#${idBase.current}_val3)`}
        strokeLinecap="round"
      />
      <path
        d={getPath(
          valRadius,
          angleToXY(valRadius, (tau / 60) * 41),
          angleToXY(valRadius, (tau / 60) * 50)
        )}
        stroke={`url(#${idBase.current}_val2)`}
      />
      <ValueHandle radius={radius} hsv={hsv} className={styles.handle} />
      <path
        className={styles.overlay}
        d={getPath(
          valRadius,
          angleToXY(valRadius, valStartAngle),
          angleToXY(valRadius, valEndAngle)
        )}
        stroke="white"
        strokeLinecap="round"
        ref={valueOverlayRefCallback}
      />
    </g>
  );
};
