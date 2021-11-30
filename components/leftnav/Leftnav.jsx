import Link from 'next/link';
import {
    FiHome,
    FiGift,
    FiShoppingBag,
    FiUmbrella,
    FiShield,
    FiSettings,
    FiMessageSquare,
    FiUser,
} from 'react-icons/fi';

const NavItem = ({
    icon,
    href,
    children,
    className
}) => (
    <li>
        <Link href={href} className='nav-content-bttn open-font'>
            <a>
                <i className={`${className} btn-round-md me-3`}>{icon}</i>
                <span>{children}</span>
            </a>
        </Link>
    </li>
)

const LeftNav = () => {
    return (
        <div className={`navigation`}>
            <div className="container ps-0 pe-0">
                <div className="nav-content">
                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                        <ul className="mb-1 top-content">
                            <li className="logo d-none d-xl-block d-lg-block"></li>
                            <NavItem
                                href='/explore'
                                icon={<FiHome />}
                                className='bg-blue-gradient'>
                                Home
                            </NavItem>
                            <NavItem
                                href='/event'
                                icon={<FiGift />}
                                className='bg-red-gradient'>
                                Event
                            </NavItem>
                            <NavItem
                                href='/market'
                                icon={<FiShoppingBag />}
                                className='bg-gold-gradient'>
                                Market
                            </NavItem>
                            <NavItem
                                href='/pet-adoption'
                                icon={<FiUmbrella />}
                                className='bg-mini-gradient'>
                                Pet Adoption
                            </NavItem>
                            <NavItem
                                href='/petcare'
                                icon={<FiShield />}
                                className='bg-green-gradient'>
                                Pet Care
                            </NavItem>

                        </ul>
                    </div>


                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                        <ul className="mb-1">
                            <li className="logo d-none d-xl-block d-lg-block"></li>
                            <li>
                                <Link href="/settings" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                    <a>
                                        <i className="font-sm me-3 text-grey-500"><FiSettings /></i>
                                        <span>Settings</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                    <a>
                                        <i className="font-sm feather-pie-chart me-3 text-grey-500"><FiUser /></i>
                                        <span>Profile</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default LeftNav;