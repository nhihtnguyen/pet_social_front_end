import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import { FiGithub, FiSearch } from 'react-icons/fi';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <Navbar
            fixed='top'
            style={{
                boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 3%) !important',
                height: 96,
            }}
        >
            <Navbar.Brand style={{
                width: 280,
                lineHeight: 90,
                marginLeft: 10,
                color: '#0055FF',
            }}>
                <Link href="/">
                    <a>
                        <FiGithub style={{
                            marginRight: '1rem',
                            fontSize: 44,
                        }}></FiGithub>
                        <span style={{
                            fontFamily: "'Fredoka One', cursive",
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-block',
                            fontSize: 32,
                            lineHeight: 90,
                            color: '#0055FF',
                        }}>
                            Pet's friend
                        </span>
                    </a>
                </Link>
            </Navbar.Brand>

            <form action="#" className="float-left header-search ms-3">
                <div className={`${styles.search} mb-0 icon-input`}>
                    <FiSearch />
                    <input type="text" placeholder="Start typing to search.." className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg" />
                </div>
            </form>
        </Navbar >
    )
};

export default Header;