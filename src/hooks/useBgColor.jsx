import React, { useEffect, useState, useRef } from 'react';

export default function useBgColor(color) {
  useEffect(() => {
    document.body.style.background = color;
  }, [color]);
}
