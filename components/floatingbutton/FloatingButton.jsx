import styles from './FloatingButton.module.scss';
import Link from 'next/link';

const FloatingButton = ({ label, icon, onClick, href, index }) => {
  let marginBottom = 0;
  if (index === undefined) {
    marginBottom = 0;
  } else {
    marginBottom = Number(index) * 45 + 8;
  }
  return (
    <div
      onClick={onClick}
      className={`shadow-lg cursor-pointer position-absolute position-fixed rounded-circle ${styles.floatingButton}`}
      style={{
        marginBottom: `${marginBottom}px`,
      }}
    >
      {label && <label>{label}</label>}
      <Link href={href ? href : '#'}>
        <span
          className={`shadow-lg bg-white d-flex rounded-circle justify-content-center align-items-center text-dark theme-dark-bg ${styles.icon}`}
        >
          {icon}
        </span>
      </Link>
    </div>
  );
};

export default FloatingButton;
