import Link from 'next/Link';

const NotificationBanner = () => {
    return (
        <Link href="/defaultnotification">
            <a
                className={`d-flex align-items-center p-3 rounded-3 ${value.read}`}>
                <img src={`assets/images/${value.imageUrl}`} alt="user" className="w45 me-3" />
                <i className={`text-white me-2 font-xssss notification-react ${value.status}`}></i>
                <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20"><strong>{value.name}</strong> posted in : {value.des}<span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto"> {value.time}</span> </h6>
                <i className="ti-more-alt text-grey-500 font-xs ms-auto">

                </i>
            </a>
        </Link>
    )
}