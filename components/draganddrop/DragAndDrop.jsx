import { useState, useEffect, createRef } from 'react';

const DragAndDrop = (props) => {
  const [drag, setDrag] = useState(false);

  const dropRef = createRef();
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //this.dragCounter--
    /*if (this.dragCounter === 0) {
      setDrag(false)
    }*/
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      //this.dragCounter = 0
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);
    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      ref={dropRef}
    >
      {props.children}
    </div>
  );
};
export default DragAndDrop;
