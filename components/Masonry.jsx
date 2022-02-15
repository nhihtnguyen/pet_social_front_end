import {
  Masonry,
  useMasonry,
  usePositioner,
  useScroller,
  useContainerPosition,
  useResizeObserver,
} from 'masonic';
import useWindowSize from 'hooks/useWindowSize';
import { useRef } from 'react';
/*
const containerRef = React.useRef(null);
  const [windowWidth, height] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    height
  ]);
  const { scrollTop, isScrolling } = useScroller(offset);
  const positioner = usePositioner(
    { width, columnGutter: 8, columnWidth: 172 },
    [cats.length]
  );
  const resizeObserver = useResizeObserver(positioner);
*/
const MyMasonry = ({
  columnGutter,
  columnWidth,
  overscanBy,
  items,
  render,
  columnCount,
  ...props
}) => {
  const containerRef = useRef(null);
  let { width: windowWidth, height: windowHeight } = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
    items.length,
  ]);
  // the width is equal to windowWidth - scroll bar width (17px in chrome)
  const { scrollTop, isScrolling } = useScroller(offset);

  const positioner = usePositioner(
    {
      width: width || windowWidth,
      columnGutter: columnGutter || 8,
      columnWidth: columnWidth || 172,
      columnCount,
    },
    [items.length]
  );
  const resizeObserver = useResizeObserver(positioner);
  console.log('haha', width, windowWidth, isScrolling, offset);
  return (
    <div className='masonic'>
      {useMasonry({
        positioner,
        scrollTop,
        isScrolling,
        height: windowHeight,
        containerRef,
        items: items,
        overscanBy: overscanBy || 5,
        resizeObserver,
        render,
      })}
    </div>
  );
};

export default MyMasonry;
