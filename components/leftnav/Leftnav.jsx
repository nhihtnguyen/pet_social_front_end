import Link from 'next/link';

const LeftNav = () => {
    return (
        <div className={`navigation scroll-bar`}>
            <div className="container ps-0 pe-0">
                <div className="nav-content">
                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                        <ul className="mb-1 top-content">
                            <li className="logo d-none d-xl-block d-lg-block"></li>
                            <li>
                                <Link href="/home" className="nav-content-bttn open-font">
                                    <a>
                                        <i className="feather-tv btn-round-md bg-blue-gradiant me-3">
                                        </i>
                                        <span>Newsfeed</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/defaultbadge" className="nav-content-bttn open-font">
                                    <a>
                                        <i className="feather-award btn-round-md bg-red-gradiant me-3"></i>
                                        <span>Badges</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/defaultstorie" className="nav-content-bttn open-font">
                                    <a>
                                        <i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i>
                                        <span>Explore Stories</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/defaultgroup" className="nav-content-bttn open-font">
                                    <a>
                                        <i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i>
                                        <span>Popular Groups</span>
                                    </a>
                                </Link></li>
                            <li>
                                <Link href="/userpage" className="nav-content-bttn open-font">
                                    <a>
                                        <i className="feather-user btn-round-md bg-primary-gradiant me-3"></i>
                                        <span>Author Profile </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                        <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                        <ul className="mb-1">
                            <li className="logo d-none d-xl-block d-lg-block"></li>
                            <li>
                                <Link href="/defaultsettings" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                    <a>
                                        <i className="font-sm feather-settings me-3 text-grey-500"></i>
                                        <span>Settings</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/defaultanalytics" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                    <a>
                                        <i className="font-sm feather-pie-chart me-3 text-grey-500"></i>
                                        <span>Analytics</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/defaultmessage" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                    <a>
                                        <i className="font-sm feather-message-square me-3 text-grey-500"></i>
                                        <span>Chat</span><span className="circle-count bg-warning mt-0">23</span>
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