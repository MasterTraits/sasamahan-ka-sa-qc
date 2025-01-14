import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const TypingAnimation = ({ text, speed = 0.1, delay = 0.5, cursor = true, loop = false }) => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const timeline = gsap.timeline({ repeat: loop ? -1 : 0, repeatDelay: 1 });

    // Typing animation
    timeline.to(element, {
      text: text, // GSAP TextPlugin handles the typing effect
      duration: text.length * speed, // Calculate duration based on text length and speed
      ease: "none",
      delay: delay,
    });

    // Cursor blinking effect
    if (cursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
    }

    return () => {
      timeline.kill();
    };
  }, [text, speed, delay, cursor, loop]);

  return (
    <div className="flex items-center">
      <span ref={textRef} className="text-primary"></span>
      {cursor && (
        <span
          ref={cursorRef}
          className="ml-1 w-1 h-6 bg-primary"
        ></span>
      )}
    </div>
  );
};

export default TypingAnimation;
