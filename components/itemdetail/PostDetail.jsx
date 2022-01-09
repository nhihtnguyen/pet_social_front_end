import { Card, Col, Row, Button, Placeholder, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { FiMessageCircle, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import Image from 'next/image';
import styles from './PostDetail.module.scss';
import CommentBox from '../commentbox/CommentBox';
import { useState, useEffect } from 'react';
import { host as serverHost } from 'config';
import useSWRInfinite from 'swr/infinite';
import axiosClient from 'axiosSetup';
const fetcher = async (url) => axiosClient.get(url).then((res) => res.data);

const NestedComment = ({ comment, onShowReplies }) => {
  return <CommentBox />;
};

const CommentSection = ({ pid }) => {
  const getKey = (pageIndex, previousPageData) => {
    console.log('page', pageIndex, previousPageData);
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return `/comments/post/${pid}?page=${pageIndex + 1}`;
  };
  const {
    data: comments,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, fetcher);
  useEffect(() => {
    console.log('comment', comments);
  }, [comments]);

  return (
    <>
      <h4 className='font-xss text-grey-900 fw-700 ls-2 mt-4'>Comment</h4>
      <CommentBox pid={pid} mutate={mutate} />

      {!comments ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        comments?.map((values) =>
          values.map((comment, index) => (
            <CommentBox created comment={comment} key={index} pid={pid} />
          ))
        )
      )}
      <button
        style={{ background: 'none' }}
        className='text-current font-xsss border-0'
        onClick={() => setSize(size + 1)}
      >
        Show More
      </button>
    </>
  );
};

const PostDetail = ({ item, loading, pid }) => {
  const calVote = (vote) => {
    if (vote >= 1000000) {
      return `${vote / 1000000}m`;
    } else if (vote >= 1000) {
      return `${vote / 1000}k`;
    } else {
      return `${vote}`;
    }
  };
  const width = Number(item?.size?.split('x')[0]) || 300;
  const height = Number(item?.size?.split('x')[1]) || 500;

  return (
    <Card className={`p-0 rounded-xxl shadow-xss ${styles['post-card']}`}>
      <Card.Body>
        <Row>
          <Col xs={width > height ? '12' : '6'}>
            {loading ? (
              <Placeholder as='div' className={`w-100 h-100 rounded-xxxxl}`} />
            ) : (
              <Image
                src={item?.media_url || 'https://picsum.photos/300/500'}
                className={`image rounded-xxxxl`}
                width={width}
                height={height}
                alt='image'
              />
            )}
          </Col>

          <Col xs={width > height ? '12' : '6'}>
            <h4 className='font-xss text-grey-900 fw-700 ls-2 mt-4'>About</h4>

            <Link href={`/create/edit/${pid}`}>
              <a className='ms-auto'>
                <i className='text-grey-900 font-lg position-absolute top-0 right-0 me-3'>
                  <FiMoreHorizontal />
                </i>
              </a>
            </Link>
            {loading ? (
              <Placeholder as='p' animation='glow'>
                <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                <Placeholder xs={8} />
              </Placeholder>
            ) : (
              <p className='fw-500 text-grey-800 lh-24 font-xsss mb-0'>
                {item?.caption || ''}
              </p>
            )}
            <hr />

            <ul className='d-flex'>
              <li className={`d-flex m-1`}>
                <figure className='avatar me-3 '>
                  <Image
                    width={45}
                    height={45}
                    src={item?.User?.avatar || 'https://picsum.photos/200'}
                    alt='avatar'
                    className='image  shadow-sm rounded-circle w45 '
                  />
                </figure>
                <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                  {item?.User
                    ? `${item.User.first_name} ${item.User.last_name}`
                    : 'Full Name'}
                  <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
                    5 Posts
                  </span>
                </h4>
              </li>
              {item?.mentions?.map(() => {
                return (
                  <li className={`d-flex`}>
                    <figure className='avatar me-3'>
                      <Image
                        width={45}
                        height={45}
                        src={'https://picsum.photos/200'}
                        alt='avatar'
                        className='shadow-sm rounded-circle w45'
                      />
                    </figure>
                    <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
                      Pet Name
                      <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
                        5 Followers
                      </span>
                    </h4>
                  </li>
                );
              })}
            </ul>
            <div className={`d-flex p-0 mt-3 position-relative`}>
              <Link href='/'>
                <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3'>
                  <i className='text-dark text-grey-900 btn-round-sm font-lg'>
                    <IoPawOutline />
                  </i>
                  {calVote(item?.upvote ? item.upvote : 0)} Vote
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
            </div>
            <CommentSection pid={pid} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
