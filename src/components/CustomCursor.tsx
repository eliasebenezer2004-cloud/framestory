'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => {
      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(0.8)`;
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(1)`;
      }
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animateRing);
    };

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.getAttribute('data-cursor-text');
      if (text) setCursorText(text);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorText('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(animateRing);

    const bindInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    bindInteractiveListeners();

    const observer = new MutationObserver((mutations) => {
      let hasNewNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }
      if (hasNewNodes) bindInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring hidden md:block ${
          isHovering ? 'cursor-hover' : ''
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        className={`custom-cursor cursor-dot hidden md:block ${
          isHovering ? 'cursor-hover-dot' : ''
        }`}
        style={{ left: 0, top: 0 }}
      />
      {cursorText && (
        <div
          className="custom-cursor hidden md:flex items-center justify-center cursor-text-label"
          style={{
            position: 'fixed',
            left: mousePos.current.x - 20,
            top: mousePos.current.y + 28,
            zIndex: 9999,
            pointerEvents: 'none',
            width: 40,
            justifyContent: 'center',
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
}
