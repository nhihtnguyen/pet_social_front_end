import { FiPlus } from 'react-icons/fi';
import styles from './FloatingButton.module.scss';
import Link from 'next/link';

const FloatingButton = ({ label, icon }) => {

    const handleClick = () => {

    }
    let buttonStyle = {
        backgroundImage: `url(${icon})`
    }

    return (
        <div
            onClick={handleClick}
            className={`shadow-xss ${styles.floatingButton}`}>
            {label && <label>{label}</label>}
            <Link href='/create'>
                <a
                    className={`${styles.icon}`}
                >
                    <FiPlus style={{ fontSize: 30 }} />
                </a>
            </Link>
        </div >
    )
};

export default FloatingButton;