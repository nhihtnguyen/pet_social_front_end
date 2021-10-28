import styles from '../../styles/Explore.module.scss';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import { FiGithub } from 'react-icons/fi';

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
                fontSize: 44,
                color: '#0055FF'
            }}>
                <Link href="/">
                    <a>
                        <FiGithub style={{
                            marginRight: '1rem',

                        }}></FiGithub>
                        <span style={{
                            fontFamily: "'Fredoka One', cursive",
                            textDecoration: 'none !important',
                            fontWeight: '600 !important',
                            display: 'inline-block !important',
                            fontSize: '32px !important',
                            lineHeight: 90,
                            color: '#0055FF'
                        }}>
                            Pet's friend
                        </span>
                    </a>
                </Link>
            </Navbar.Brand>
        </Navbar >
    )
}

const Explore = () => {
    return (
        <div>
            <Header />
        </div >
    )
};

export default Explore;