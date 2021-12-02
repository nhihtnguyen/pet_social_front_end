import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CommentBox.module.scss';
import { FiMessageCircle, FiShare2, FiMoreHorizontal, FiSend } from "react-icons/fi";
import { IoPawOutline } from 'react-icons/io5';

const CommentBox = ({ className, content, created }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuClass = `${isOpen ? " show" : ""}`;

    return (

        <div className={`p-0 mt-3 position-relative d-flex ${className}`}>
            <figure className={`avatar ${created ? '' : 'position-absolute'} me-2 ms-2 mt-1 top-5`}>
                <div className={`image-container shadow-sm rounded-circle ${created ? 'w45' : 'w30'}`}>
                    <Image
                        layout="fill"
                        src="https://picsum.photos/200"
                        alt="icon"
                        className="image rounded-circle w30"
                    />
                </div>
            </figure>
            {//<textarea name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
                created ?
                    <div className={`bor-0 w-100 rounded-xxl p-2 ps-3 
                     border-light-md theme-dark-bg position-relative`}>
                        <Link href='#'>
                            <a className='ms-auto'>
                                <i className='text-grey-900 font-xs position-absolute top-0 right-0 me-3'>
                                    <FiMoreHorizontal />
                                </i>
                            </a>
                        </Link>
                        <h6 className={`font-xsss fw-600 mb-0 d-flex`}>
                            UserName&nbsp;
                            <span className={`text-grey-500`}>
                                17/12/2021
                            </span>
                        </h6>
                        <p className={`font-xssss text-grey-900 fw-500`}>{content}</p>
                        <div className={`d-flex p-0 mt-3 position-relative`}>
                            <Link href='/'>
                                <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3'>
                                    <i className='text-dark text-grey-900 btn-round-sm font-xs'>
                                        <IoPawOutline />
                                    </i>
                                    1 Vote
                                </a>
                            </Link>
                            <Link href='/'>
                                <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
                                    <i className='text-dark text-grey-900 btn-round-sm font-xs'>
                                        <FiMessageCircle />
                                    </i>
                                    22 Comment
                                </a>
                            </Link>

                        </div>
                    </div>
                    :
                    <>
                        <textarea
                            name="message"
                            className={`${styles['textarea-resize-lock']} 
                            h100 bor-0 w-100 rounded-xxl p-2 ps-5 
                            font-xssss text-grey-900 fw-500 border-light-md theme-dark-bg`}
                            cols="30"
                            rows="10"
                            placeholder="What's on your mind?"
                            draggable={false}
                        />
                        <Link href='/'>
                            <a
                                style={{ bottom: 5, right: 5 }}
                                className="position-absolute font-xss fw-600 ls-1 text-grey-700 text-dark pe-4">
                                <FiSend />
                            </a>
                        </Link >
                    </>

            }


        </div >

    );
}

export default CommentBox;