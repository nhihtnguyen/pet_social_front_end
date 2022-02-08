import {
  Masonry,
  usePositioner,
  useContainerPosition,
  useResizeObserver,
} from 'masonic';
import useWindowSize from 'hooks/useWindowSize';
import { useRef } from 'react';

const MyMasonry = ({ ...props }) => {
  const containerRef = useRef(null);
  let { width: windowWidth, height: windowHeight } = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);
  // the width is equal to windowWidth - scroll bar width (17px in chrome)
  console.log(width, windowWidth);
  const positioner = usePositioner({
    width: width || windowWidth,
    columnGutter: 12,
  });
  const resizeObserver = useResizeObserver(positioner);
  return (
    <div className='masonic'>
      <Masonry {...props} />
    </div>
  );
};

export default MyMasonry;
