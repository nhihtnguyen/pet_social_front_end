
import { Card, Col, Row, Button, Placeholder } from 'react-bootstrap';
import Link from "next/link";
import { FiThumbsUp, FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal } from "react-icons/fi";
import { IoPawOutline } from 'react-icons/io5';
import Image from 'next/image';
import styles from './PostDetail.module.scss';
import CommentBox from '../CommentBox/CommentBox';

const PostDetail = ({ item, loading }) => {
    const calVote = (vote) => {
        if (vote >= 1000000) {
            return `${vote / 1000000}m`
        }
        else if (vote >= 1000) {
            return `${vote / 1000}k`;
        }
        else {
            return `${vote}`
        }
    }
    return (
        <>
            <Card className={`rounded-xxl shadow-xss`}>
                <Row>
                    <Col xs='6'>
                        {loading
                            ? < Placeholder
                                as='div'
                                className={`w-100 h-100 rounded-xxl ${styles['image-rounded']}`} />
                            : <div className='image-container' >
                                <Image
                                    src={item?.media_URL ? item.media_URL : 'https://picsum.photos/300/500'}
                                    className={`image rounded-xxl ${styles['image-rounded']}`}
                                    layout='fill'
                                    alt='image'
                                />

                            </div>
                        }
                    </Col>

                    <Col xs='6' >
                        <h4 className="font-xss text-grey-900 fw-700 ls-2 mt-4">About</h4>
                        {loading
                            ? <Placeholder as='p' animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            : <p className='fw-500 text-grey-800 lh-24 font-xsss mb-0'>
                                {item?.caption ? item.caption : ''}
                            </p>
                        }
                        <hr />
                        <div className={`d-flex`}>
                            <figure className='avatar me-3'>
                                <div className={`image-container shadow-sm rounded-circle w45`}>
                                    <Image
                                        layout='fill'
                                        src={'https://picsum.photos/200'}
                                        alt='avatar'
                                        className='image  shadow-sm rounded-circle w45'
                                    />
                                </div>
                            </figure>
                            <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                                Boeen
                                <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
                                    5 Followers
                                </span>
                            </h4>
                        </div>
                        <Card.Body className={`d-flex p-0 mt-3 position-relative`}>
                            <Link href='/'>
                                <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3'>
                                    <i className='text-dark text-grey-900 btn-round-sm font-lg'>
                                        <IoPawOutline />
                                    </i>
                                    {
                                        calVote(item?.upvote ? item.upvote : 0)
                                    } Vote
                                </a>
                            </Link>
                            <Link href='/'>
                                <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
                                    <i className='text-dark text-grey-900 btn-round-sm font-lg'>
                                        <FiMessageCircle />
                                    </i>
                                    22 Comment
                                </a>
                            </Link>
                            <Link href='/defaultvideo'>
                                <a className='ms-auto me-3 d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
                                    <i className='text-grey-900 text-dark btn-round-sm font-lg'>
                                        <FiShare2 />
                                    </i>
                                    <span className='d-none-xs'>Share</span>
                                </a>
                            </Link>
                        </Card.Body>
                        <CommentBox className='me-3' />
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default PostDetail;