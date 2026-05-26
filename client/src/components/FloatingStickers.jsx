import { useRef, useState } from "react";
import "./floating-stickers.css";

function DraggableSticker({
  src,
  alt,
  initialX,
  initialY,
  initialRotate = 0,
  size = 150,
}) {
  const [position, setPosition] = useState({
    x: initialX,
    y: initialY,
    rotate: initialRotate,
  });

  const [dragging, setDragging] = useState(false);
  const startRef = useRef(null);

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      x: position.x,
      y: position.y,
    };

    setDragging(true);

    const handlePointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - startRef.current.mouseX;
      const dy = moveEvent.clientY - startRef.current.mouseY;

      setPosition((prev) => ({
        ...prev,
        x: startRef.current.x + dx,
        y: startRef.current.y + dy,
        rotate: initialRotate + dx * 0.03,
      }));
    };

    const handlePointerUp = () => {
      setDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div
      className={`floating-sticker ${dragging ? "dragging" : ""}`}
      style={{
        width: size,
        height: size,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${position.rotate}deg)`,
      }}
    >
      <img src={src} alt={alt} className="floating-sticker__img" draggable="false" />

      <button
        type="button"
        className="floating-sticker__handle"
        onPointerDown={handlePointerDown}
        aria-label={`Drag ${alt}`}
      >
        ⋮
      </button>
    </div>
  );
}

export default function FloatingStickers() {
  return (
    <div className="floating-stickers-layer" aria-hidden="true">
      <DraggableSticker
        src="/stickers/star.png"
        alt="Star sticker"
        initialX={60}
        initialY={80}
        initialRotate={-10}
        size={140}
      />

      <DraggableSticker
        src="/stickers/heart.png"
        alt="Heart sticker"
        initialX={1180}
        initialY={120}
        initialRotate={8}
        size={150}
      />

      <DraggableSticker
        src="/stickers/sparkle.png"
        alt="Sparkle sticker"
        initialX={90}
        initialY={560}
        initialRotate={-6}
        size={130}
      />

      <DraggableSticker
        src="/stickers/cute.png"
        alt="Cute sticker"
        initialX={1180}
        initialY={560}
        initialRotate={12}
        size={145}
      />
    </div>
  );
}