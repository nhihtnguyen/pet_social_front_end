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
            className={`shadow-xss ${styles.floatingButton}`}
            style={{
                marginBottom: `${marginBottom}px`
            }}
        >
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