import React, { useRef, useState } from "react";

const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 500;

const VirtualizedList = () => {
  const scrollRef = useRef(0);
  const containerRef = useRef(null);

  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    desc: "Lorem ipsum dolor sit amet."
  }));

  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const handleScroll = () => {
    scrollRef.current = containerRef.current.scrollTop;
    const newStartIndex = Math.floor(
      scrollRef.current / ITEM_HEIGHT
    );
    setStartIndex(newStartIndex);
  };

  const visibleItems = items.slice(
    startIndex,
    startIndex + visibleCount + 1
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: "500px",
        overflowY: "auto",
        border: "1px solid #ccc"
      }}
    >
      {/* Spacer before */}
      <div style={{ height: startIndex * ITEM_HEIGHT }} />

      {visibleItems.map(item => (
        <div
          key={item.id}
          style={{
            height: ITEM_HEIGHT,
            padding: "10px",
            boxSizing: "border-box"
          }}
        >
          <strong>{item.title}</strong>
          <p>{item.desc}</p>
        </div>
      ))}

      {/* Spacer after */}
      <div
        style={{
          height:
            (items.length -
              (startIndex + visibleItems.length)) *
            ITEM_HEIGHT
        }}
      />
    </div>
  );
};

export default VirtualizedList;
