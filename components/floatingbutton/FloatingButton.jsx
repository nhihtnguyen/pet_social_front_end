import styles from './FloatingButton.module.scss';
import Link from 'next/link';

const FloatingButton = ({ label, icon, onClick, href }) => {

    return (
        <div
            onClick={onClick}
            className={`shadow-xss ${styles.floatingButton}`}>
            {label && <label>{label}</label>}
            <Link href={href ? href : '#'}>
                <a
                    className={`shadow-xss ${styles.icon}`}
                    style={{ fontSize: 30 }}
                >
                    {icon}
                </a>
            </Link>
        </div >
    )
};

export default FloatingButton;