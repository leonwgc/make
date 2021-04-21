import React, { useEffect, useState, useRef } from 'react';
import asyncLoad from '~/utils/asyncLoad';

export default function useQRCode(domRef, text, options = { width: 150, height: 150 }) {
  const libRef = useRef();
  useEffect(() => {
    const init = () => {
      if (window.QRCode && domRef.current) {
        libRef.current = new window.QRCode(domRef.current, {
          text,
          colorDark: '#000000',
          colorLight: '#ffffff',
          ...options,
        });
      }
    };
    if (!window.QRCode) {
      asyncLoad('//static.zuifuli.com/libs/qrcode.min.js').then(() => {
        if (!libRef.current) {
          init();
        }
      });
    } else {
      if (!libRef.current) {
        init();
        return;
      }
      if (text) {
        libRef.current.makeCode(text);
      } else {
        libRef.current.clear();
      }
    }

    return () => {
      if (libRef.current) {
        libRef.current.clear();
      }
    };
  }, [text, options]);
}
