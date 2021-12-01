import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CommentBox = ({ className, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuClass = `${isOpen ? " show" : ""}`;

    return (

        <div className={`p-0 mt-3 position-relative ${className}`}>
            <figure className="avatar position-absolute ms-2 mt-1 top-5">
                <div className='image-container shadow-sm rounded-circle w30'>
                    <Image
                        layout="fill"
                        src="https://picsum.photos/200"
                        alt="icon"
                        className="image rounded-circle w30"
                    />
                </div>
            </figure>
            <textarea name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
            <Link href='/'>
                <a className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                    <i className="font-md text-danger feather-video me-2">
                    </i>
                </a>
            </Link>
        </div>

    );
}

export default CommentBox;