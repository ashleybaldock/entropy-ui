import { hasValue } from './value';

export const subscribeMoveEvents = (node, onStart, onMove, onEnd) => {
  let lastClientX = -1;
  let lastClientY = -1;

  const removeDocumentListeners = () => {
    if (onMove) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
    }
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchend', onTouchMoveEnd);
  };

  const addDocumentListeners = () => {
    if (onMove) {
      document.addEventListener('mousemove', onMouseMove, { passive: false });
      document.addEventListener('touchmove', onTouchMove, { passive: false });
    }
    document.addEventListener('mouseup', onMouseUp, { passive: false });
    document.addEventListener('touchend', onTouchMoveEnd, { passive: false });
  };

  const onMouseMove = (mouseMoveEvent) => {
    // console.log('onMouseMove');
    // console.log(mouseMoveEvent);

    const clientX = hasValue(mouseMoveEvent.clientX)
      ? mouseMoveEvent.clientX
      : -1;
    const clientY = hasValue(mouseMoveEvent.clientY)
      ? mouseMoveEvent.clientY
      : -1;

    if (onMove) {
      onMove({
        e: mouseMoveEvent,
        clientX,
        clientY,
      });
    }
  };

  const onTouchMove = (touchMoveEvent) => {
    // console.log('onTouchMove');
    // console.log(touchMoveEvent);

    const clientX =
      touchMoveEvent.touches &&
      touchMoveEvent.touches[0] &&
      hasValue(touchMoveEvent.touches[0].clientX)
        ? touchMoveEvent.touches[0].clientX
        : -1;
    const clientY =
      touchMoveEvent.touches &&
      touchMoveEvent.touches[0] &&
      hasValue(touchMoveEvent.touches[0].clientY)
        ? touchMoveEvent.touches[0].clientY
        : -1;

    lastClientX = clientX;
    lastClientY = clientY;

    if (onMove) {
      onMove({
        e: touchMoveEvent,
        clientX,
        clientY,
      });
    }
  };

  const onMouseUp = (mouseUpEvent) => {
    // console.log('onMouseUp');
    // console.log(mouseUpEvent);
    removeDocumentListeners();

    const clientX = hasValue(mouseUpEvent.clientX) ? mouseUpEvent.clientX : -1;
    const clientY = hasValue(mouseUpEvent.clientY) ? mouseUpEvent.clientY : -1;

    if (onEnd) {
      onEnd({ e: mouseUpEvent, clientX, clientY });
    }
  };

  const onTouchMoveEnd = (endEvent) => {
    // console.log('onTouchMoveEnd');
    // console.log(endEvent);
    removeDocumentListeners();

    if (onEnd) {
      onEnd({
        e: endEvent,
        clientX: lastClientX,
        clientY: lastClientY,
      });
    }
  };

  const onMouseDown = (mouseDownEvent) => {
    // console.log('onMouseDown');
    // console.log(mouseDownEvent);
    addDocumentListeners();

    const clientX = hasValue(mouseDownEvent.clientX)
      ? mouseDownEvent.clientX
      : -1;
    const clientY = hasValue(mouseDownEvent.clientY)
      ? mouseDownEvent.clientY
      : -1;

    if (onStart) {
      onStart({ e: mouseDownEvent, clientX, clientY });
    }
  };

  const onTouchStart = (touchStartEvent) => {
    // console.log('onTouchStart');
    // console.log(touchStartEvent);
    addDocumentListeners();

    const clientX =
      touchStartEvent.touches &&
      touchStartEvent.touches[0] &&
      hasValue(touchStartEvent.touches[0].clientX)
        ? touchStartEvent.touches[0].clientX
        : -1;
    const clientY =
      touchStartEvent.touches &&
      touchStartEvent.touches[0] &&
      hasValue(touchStartEvent.touches[0].clientY)
        ? touchStartEvent.touches[0].clientY
        : -1;

    lastClientX = clientX;
    lastClientY = clientY;

    if (onStart) {
      onStart({ e: touchStartEvent, clientX, clientY });
    }
  };

  node.addEventListener('mousedown', onMouseDown, { passive: false });
  node.addEventListener('touchstart', onTouchStart, { passive: false });

  return () => {
    node.removeEventListener('mousedown', onMouseDown);
    node.removeEventListener('touchstart', onTouchStart);
    removeDocumentListeners();
  };
};

export const getClientMidpointForElement = (containerRef) => {
  const coords = containerRef.current.getBoundingClientRect();
  return {
    x: coords.left + coords.width / 2,
    y: coords.top + coords.height / 2,
  };
};

export const getClientTopLeftForElement = (containerRef) => {
  const coords = containerRef.current.getBoundingClientRect();
  return {
    x: coords.left,
    y: coords.top,
  };
};
