import Link from 'next/link';
import {
  FiHome,
  FiGift,
  FiShoppingBag,
  FiUmbrella,
  FiShield,
  FiSettings,
  FiUser,
  FiLogIn,
} from 'react-icons/fi';
import { useAuth } from 'app/authContext';

const NavItem = ({ icon, href, children, className }) => (
  <li>
    <Link href={href} className='nav-content-bttn open-font'>
      <a>
        <i className={`${className} btn-round-md me-3`}>{icon}</i>
        <span>{children}</span>
      </a>
    </Link>
  </li>
);

const LeftNav = ({ className }) => {
  const { user, loading, isAuthenticated } = useAuth();
  console.log('auth', isAuthenticated);
  return (
    <div className={`navigation bg-transparent-card ${className || ''}`}>
      <div className='container ps-0 pe-0'>
        <div className='nav-content'>
          <div className='nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-3 mt-3'>
            <div className='nav-caption fw-600 font-xssss text-grey-500'>
              <span>New </span>Feeds
            </div>
            <ul className='mb-1 top-content'>
              <li className='logo d-none d-xl-block d-lg-block'></li>
              <NavItem
                href='/explore'
                icon={<FiHome />}
                className='bg-blue-gradient'
              >
                Explore
              </NavItem>
              <NavItem
                href='/event'
                icon={<FiGift />}
                className='bg-red-gradient'
              >
                Event
              </NavItem>
              <NavItem
                href='/market'
                icon={<FiShoppingBag />}
                className='bg-gold-gradient'
              >
                Market
              </NavItem>
              <NavItem
                href='/pet-adoption'
                icon={<FiShield />}
                className='bg-green-gradient'
              >
                Pet Adoption
              </NavItem>
            </ul>
          </div>

          <div className='nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1'>
            <div className='nav-caption fw-600 font-xssss text-grey-500'>
              <span></span> Account
            </div>
            <ul className='mb-1'>
              <li className='logo d-none d-xl-block d-lg-block'></li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href='/settings'
                      className='nav-content-bttn open-font h-auto pt-2 pb-2'
                    >
                      <a>
                        <i className='font-sm me-3 text-grey-500'>
                          <FiSettings />
                        </i>
                        <span>Settings</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/user/me'
                      className='nav-content-bttn open-font h-auto pt-2 pb-2'
                    >
                      <a>
                        <i className='font-sm feather-pie-chart me-3 text-grey-500'>
                          <FiUser />
                        </i>
                        <span>Profile</span>
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href='/login'
                    className='nav-content-bttn open-font h-auto pt-2 pb-2'
                  >
                    <a>
                      <i className='font-sm me-3 text-grey-500'>
                        <FiLogIn />
                      </i>
                      <span>Login</span>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftNav;
