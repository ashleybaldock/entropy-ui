const { hasValue, identity, valueOrDefault } = require('./value');

export const rgbToHsl = (rgb) => {};

export const hslToRgb = (hsl) => {};

// r [0-255], g [0-255], g [0-255] -> h [0-1], s [0-1], v [0-1]
export const rgbToHsv = (rgb) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  let rdif, gdif, bdif, h, s;

  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);
  const diffc = (c) => (v - c) / 6 / diff + 1 / 2;

  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return { h, s, v };
};

// h [0-1], s [0-1], v [0-1] -> r [0-255], g [0-255], g [0-255]
export const hsvToRgb = (hsv) => {
  const h = hsv.h * 6;
  const s = hsv.s;
  let v = hsv.v;
  const hi = Math.floor(h) % 6;

  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  switch (hi) {
    case 0:
      return { r: v, g: t, b: p };
    case 1:
      return { r: q, g: v, b: p };
    case 2:
      return { r: p, g: v, b: t };
    case 3:
      return { r: p, g: q, b: v };
    case 4:
      return { r: t, g: p, b: v };
    case 5:
      return { r: v, g: p, b: q };
    default:
      return null;
  }
};

export const hueToRgb = (hue) => hsvToRgb({ h: hue, s: 1, v: 1 });

export const satToRgb = (sat) => hsvToRgb({ h: 1, s: sat, v: 1 });

export const valToRgb = (val) => hsvToRgb({ h: 1, s: 1, v: val });

export const formatRgb = (rgb) => `rgb(${rgb.r},${rgb.g},${rgb.b})`;

export const angleToXY = (radius, angle) => ({
  x: radius * Math.sin(angle),
  y: -radius * Math.cos(angle),
});

/*
 * Adjust a pixel using an object describing transforms:
 * t: {
 *   [r,g,b]: {
 *     mul: 0->255, // Multiply by
 *     add: -255->255, // Add
 *     min: 0->255, // clamp value
 *     max: 0->255  // min >= max -> 'set'
 *   },
 *   model: [HSL,HSV],
 *   h: {
 *     set: 0->1, // Set to
 *     add: 0->1, // Add
 *   },
 *   [s,lv], {
 *     mul: -1->1, // Multiply by
 *     add: -1->1, // Add
 *     min: 0->1,  // clamp value
 *     max: 0->1,  // min >= max -> 'set'
 *   }
 * }
 */
export const adjust = (t) => {
  if (!t) {
    return ([r, g, b]) => [r, g, b];
  }

  const getClamp = (min, max) => (v) => Math.min(Math.max(min, v), max);

  const getTransform = (defaultMin, defaultMax, { min, max, add, mul }) => {
    if (hasValue(min) && hasValue(max) && min >= max) {
      // Set to fixed value
      // r = t.r.min;
      return (v) => min;
    } else {
      if (hasValue(mul)) {
        // r = ri * t.r.mul;
        return ((clamp, f) => (v) => clamp(f(v)))(
          getClamp(
            valueOrDefault(min, defaultMin),
            valueOrDefault(max, defaultMax)
          ),
          (v) => v * mul
        );
      } else if (hasValue(add)) {
        // r = ri + t.r.add;
        return ((clamp, f) => (v) => clamp(f(v)))(
          getClamp(
            valueOrDefault(min, defaultMin),
            valueOrDefault(max, defaultMax)
          ),
          (v) => v + add
        );
      } else if (hasValue(min) || hasValue(max)) {
        // Just clamp
        return getClamp(
          valueOrDefault(min, defaultMin),
          valueOrDefault(max, defaultMax)
        );
      }
    }
    return identity;
  };

  const getHueTransform = ({ set, add }) => {
    if (hasValue(set)) {
      return (v) => set % 1;
    }
    if (hasValue(add)) {
      return (v) => (v + add) % 1;
    }
    return identity;
  };

  const tr = t.r ? getTransform(0, 255, t.r) : identity;
  const tg = t.g ? getTransform(0, 255, t.g) : identity;
  const tb = t.b ? getTransform(0, 255, t.b) : identity;

  // console.log(tr);
  // console.log(tg);
  // console.log(tb);
  const trgb = ([r, g, b]) => [tr(r), tg(g), tb(b)];

  let thslv = identity;

  if (
    (t.h && (hasValue(t.h.set) || hasValue(t.h.add))) ||
    (t.s &&
      (hasValue(t.s.mul) ||
        hasValue(t.s.add) ||
        hasValue(t.s.min) ||
        hasValue(t.s.max))) ||
    (t.lv &&
      (hasValue(t.lv.mul) ||
        hasValue(t.lv.add) ||
        hasValue(t.lv.min) ||
        hasValue(t.lv.max)))
  ) {
    if (!hasValue(t.model) || t.model === 'HSV') {
      const th = t.h ? getHueTransform(t.h) : identity;
      const ts = t.s ? getTransform(0, 1, t.s) : identity;
      const tv = t.lv ? getTransform(0, 1, t.lv) : identity;
      // console.log(th, ts, tv);
      // console.log(th(0.2));

      thslv = ([ri, gi, bi]) => {
        const { h, s, v } = rgbToHsv({ r: ri, g: gi, b: bi });
        const { r, g, b } = hsvToRgb({ h: th(h), s: ts(s), v: tv(v) });
        return [r, g, b];
      };
    } else if (t.model === 'HSL') {
    }
  }

  // Return function which takes rgb array and transforms as configured
  return (rgb) => {
    if (!rgb) {
      return [0, 0, 0];
    }
    return thslv(trgb(rgb));
  };
};
