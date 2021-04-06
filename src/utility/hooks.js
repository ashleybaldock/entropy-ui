import { useRef, useCallback } from 'react';
// import isEqual from 'react-fast-compare';

export const useCallbackWithCleanup = (rawCallback) => {
  const cleanupRef = useRef(null);
  const callback = useCallback(
    (node) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback]
  );

  return callback;
};

/*
 * Memoized ref which only changes if value has really changed
 */
// const useDeepMemo = (value) => {
//   const ref = useRef(null);

//   if (!isEqual(value, ref.current)) {
//     // console.log('updating value');
//     ref.current = value;
//   }

//   return ref.current;
// };

// export const useDeepEffect = (callback, dependencies) =>
//   useEffect(callback, useDeepMemo(dependencies));
