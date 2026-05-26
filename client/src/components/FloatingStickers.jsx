import star from "../assets/stickers/star.png";

export default function FloatingStickers() {
  return (
    <img
      src={star}
      alt="sticker"
      style={{
        position: "fixed",
        top: "100px",
        left: "100px",
        width: "160px",
        zIndex: 99999,
        border: "3px solid red",
        background: "white",
      }}
    />
  );
}