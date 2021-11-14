import Link from 'next/link';
import Image from 'next/image';
import { FiMoreVertical } from 'react-icons/fi';

const value = {
    imageUrl: 'user.png',
    name: 'Hurin Seary',
    status: 'feather-heart bg-red-gradiant',
    subject: 'Mobile App Design',
    des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
    attach: 'attach',
    time: '12 minute ago',
};

const NotificationBanner = ({ content, read }) => {
    return (
        <Link href="/defaultnotification">
            <a
                className={`d-flex align-items-center p-3 rounded-3 ${read ? 'bg-lightblue theme-light-bg' : ''}`}
            >
                <Image
                    src={`/assets/images/${value.imageUrl}`}
                    alt="user"
                    width="45px"
                    height="45px"
                />
                <i className={`text-white me-2 font-xssss notification-react ${value.status}`}></i>
                <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20"><strong>{value.name}</strong> posted in : {value.des}<span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto"> {value.time}</span> </h6>
                <i className="text-grey-500 font-xs ms-auto">
                    <FiMoreVertical />
                </i>
            </a>
        </Link>
    )
};

export default NotificationBanner;