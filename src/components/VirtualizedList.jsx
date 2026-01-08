import React, { useRef, useState } from "react";

const TOTAL_ITEMS = 100;
const ITEMS_PER_VIEW = 10;
const CONTAINER_HEIGHT = 500;

const VirtualizedList = () => {
  const scrollRef = useRef(0);
  const containerRef = useRef(null);

  const [startIndex, setStartIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(50);

  const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => `Item ${i + 1}`);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    scrollRef.current = scrollTop;

    const newIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newIndex);

    // update item height when scrolling (test requirement)
    setItemHeight(50 + (scrollTop % 20));
  };

  const visibleItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_VIEW
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: "500px",
        overflow: "auto",
        border: "1px solid black"
      }}
    >
      {/* Top spacer */}
      <div style={{ height: startIndex * itemHeight }} />

      {visibleItems.map((item, index) => (
        <div
          key={item}
          style={{ height: `${itemHeight}px` }}
        >
          <h2>{item}</h2>
        </div>
      ))}

      {/* Bottom spacer */}
      <div
        style={{
          height:
            (TOTAL_ITEMS - (startIndex + ITEMS_PER_VIEW)) * itemHeight
        }}
      />
    </div>
  );
};

export default VirtualizedList;
