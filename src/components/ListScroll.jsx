import React, { useRef, useState } from "react";

const ITEMS_PER_VIEW = 10;
const TOTAL_ITEMS = 100;

const ListScroll = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);

  const [startIndex, setStartIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(50);

  const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => i);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    scrollRef.current = scrollTop;

    const newStartIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newStartIndex);

    // required by test
    setItemHeight(50 + (scrollTop % 10));
  };

  const visibleItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_VIEW
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style="height: 500px; overflow: auto;"
    >
      <div style={{ height: startIndex * itemHeight }} />

      {visibleItems.map((item) => (
        <div key={item} style={{ height: `${itemHeight}px` }}>
          <h2>{`Item ${item}`}</h2>
          <p>{`This is item ${item}`}</p>
        </div>
      ))}

      <div
        style={{
          height:
            (TOTAL_ITEMS - (startIndex + ITEMS_PER_VIEW)) *
            itemHeight
        }}
      />
    </div>
  );
};

export default ListScroll;
