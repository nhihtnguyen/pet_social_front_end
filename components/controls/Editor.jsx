import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import styles from './Controls.module.scss';
import { useEffect } from 'react';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value: JSON.stringify(convertToRaw(value.getCurrentContent())),
  },
});

const MyEditor = ({
  name,
  className,
  invalidTooltip,
  label,
  value,
  editorClassName,
  onChange,
  ...props
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (e) => {
    setEditorState(e);
  };
  const [isInit, setIsInit] = useState(true);
  useEffect(() => {
    try {
      if (value && isInit) {
        const newValue = EditorState.createWithContent(
          convertFromRaw(JSON.parse(value))
        );

        if (newValue) {
          setIsInit(false);
          setEditorState(newValue);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [value]);
  return (
    <Form.Group className={`${className} form-group`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Editor
        toolbar={toolbar}
        editorState={editorState}
        editorClassName={`${styles['editor']} ${editorClassName}`}
        onEditorStateChange={onEditorStateChange}
        onChange={() => onChange(convertToDefEventPara(name, editorState))}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        {...props}
      />
    </Form.Group>
  );
};

export default MyEditor;
