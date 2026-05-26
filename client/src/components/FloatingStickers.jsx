import { useRef, useState } from "react";

import star from "../assets/stickers/star.png";
import heart from "../assets/stickers/heart.png";
import sparkle from "../assets/stickers/sparkle.png";
import cute from "../assets/stickers/cute.png";

export default function FloatingStickers() {
  return (
    <>
      <Sticker
        src={star}
        top="120px"
        left="120px"
        rotate={-10}
      />

      <Sticker
        src={heart}
        top="180px"
        right="120px"
        rotate={8}
      />

      <Sticker
        src={sparkle}
        bottom="120px"
        left="100px"
        rotate={-6}
      />

      <Sticker
        src={cute}
        bottom="100px"
        right="140px"
        rotate={10}
      />
    </>
  );
}

function Sticker({
  src,
  top,
  left,
  right,
  bottom,
  rotate = 0,
}) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    rotate,
  });

  const dragData = useRef(null);

  const handlePointerDown = (e) => {
    e.preventDefault();

    dragData.current = {
      startX: e.clientX,
      startY: e.clientY,
      currentX: position.x,
      currentY: position.y,
    };

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragData.current.startX;
      const dy = moveEvent.clientY - dragData.current.startY;

      setPosition({
        x: dragData.current.currentX + dx,
        y: dragData.current.currentY + dy,
        rotate: rotate + dx * 0.03,
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      style={{
        position: "fixed",
        top,
        left,
        right,
        bottom,
        zIndex: 9999,
        transform: `
          translate(${position.x}px, ${position.y}px)
          rotate(${position.rotate}deg)
        `,
        transition: "transform 0.08s linear",
      }}
    >
      {/* sticker image */}
      <div
        style={{
          position: "relative",
          width: "170px",
          height: "170px",
          background: "white",
          borderRadius: "26px",
          padding: "12px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src={src}
          alt="sticker"
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* draggable corner */}
        <button
          onPointerDown={handlePointerDown}
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "white",
            cursor: "grab",
            fontSize: "18px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
          }}
        >
          ⋮
        </button>
      </div>
    </div>
  );
}