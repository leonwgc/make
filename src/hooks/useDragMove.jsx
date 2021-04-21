import { useEffect } from 'react';

const _isTouch = window.ontouchstart !== undefined;

export default function useDragMove(elRef, boundRef) {
  useEffect(() => {
    if (elRef.current) {
      let ox, oy;
      let ol, ot;
      let isMoving = false;
      const elBcr = elRef.current.getBoundingClientRect();

      let boundBcr = null;
      if (boundRef) {
        boundBcr = boundRef.current.getBoundingClientRect();
      }

      const setPosition = (left, top, bottom, right) => {
        if (left != undefined) {
          elRef.current.style.left = left + 'px';
        }
        if (top != undefined) {
          elRef.current.style.top = top + 'px';
        }
        if (bottom != undefined) {
          elRef.current.style.top = 'unset';
          elRef.current.style.bottom = bottom + 'px';
        }
        if (right != undefined) {
          elRef.current.style.left = 'unset';
          elRef.current.style.right = right + 'px';
        }
      };

      const moveHanlder = (e) => {
        if (!isMoving) return;
        if (e.touches) {
          e = e.touches[0];
        }

        let left = ol + e.clientX - ox;
        let top = ot + e.clientY - oy;

        let bottom, right;

        if (boundRef) {
          if (left <= 0) {
            left = 0;
          }
          if (left + elBcr.width > boundBcr.width) {
            // left = boundBcr.width - elBcr.width;
            right = 0;
          }

          if (top <= 0) {
            top = 0;
          }

          if (top + elBcr.height > boundBcr.height) {
            // top = boundBcr.height - elBcr.height;
            bottom = 0;
          }
        }

        setPosition(left, top, bottom, right);
      };

      elRef.current.addEventListener(_isTouch ? 'touchstart' : 'mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isMoving) {
          isMoving = true;
        }
        if (e.touches) {
          e = e.touches[0];
        }
        ox = e.clientX;
        oy = e.clientY;
        ol = elRef.current.offsetLeft;
        ot = elRef.current.offsetTop;

        document.addEventListener(_isTouch ? 'touchmove' : 'mousemove', moveHanlder);
      });

      document.addEventListener(_isTouch ? 'touchend' : 'mouseup', (e) => {
        if (isMoving) {
          isMoving = false;
        }
        document.removeEventListener(_isTouch ? 'touchmove' : 'mousemove', moveHanlder);
      });
    }
  }, []);
}
