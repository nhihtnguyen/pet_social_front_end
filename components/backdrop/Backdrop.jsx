import styles from './Backdrop.module.scss';

const Backdrop = ({ children, ...props }) => (
  <div id={`${styles['backdrop']}`} {...props}>
    {children}
  </div>
);
export default Backdrop;
