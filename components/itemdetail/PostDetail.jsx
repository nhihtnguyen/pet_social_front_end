import { Card, Col, Row, Button, Placeholder, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import {
  FiMessageCircle,
  FiShare2,
  FiMoreHorizontal,
  FiEdit3,
  FiAlertCircle,
  FiMoreVertical,
  FiEye,
} from 'react-icons/fi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { IoPawOutline } from 'react-icons/io5';
import Image from 'next/image';
import CommentBox from '../CommentBox';
import { useEffect, forwardRef } from 'react';
import useInfinitePagination from 'hooks/useInfinitePagination';
import { useAuth } from 'app/authContext';
import { calVote } from 'helpers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import VoteButton from 'components/votebutton/VoteButton';
import axiosClient from 'axiosSetup';
import ReportButton from 'components/ReportButton';

const NestedComment = ({ comment, onShowReplies }) => {
  return <CommentBox />;
};

const MoreButton = ({ item, className, isOwner, ...props }) => {
  const [toggleMore, setToggleMore] = useState(false);
  const router = useRouter();
  const linkToEdit = () => {
    router.push(`/post/${item?.id}/edit`);
  };
  const linkToUser = () => {};
  const handleReport = () => {};
  const handleSavePost = () => {};
  return (
    <div
      className={`more-button${
        toggleMore ? ' active' : ''
      } ms-auto d-inline-flex`}
    >
      <div className='item'>
        {isOwner && (
          <a
            className='ms-auto cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
            onClick={isOwner ? linkToEdit : handleSavePost}
          >
            <span className='text-dark text-grey-900 btn-round-sm font-lg'>
              {isOwner ? <FiEdit3 /> : <BsBookmarkHeart />}
            </span>
          </a>
        )}
        <ReportButton item={item} />
      </div>
      <a
        className={`toggle ${
          toggleMore ? 'active' : ''
        } cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss`}
        onClick={() => setToggleMore(!toggleMore)}
      >
        <span className='text-dark text-grey-900 btn-round-sm font-lg'>
          <FiMoreVertical />
        </span>
      </a>
    </div>
  );
};

const CommentSection = ({ pid, setNumberOfComments }) => {
  const {
    paginatedData: comments,
    size,
    setSize,
    mutate,
    isReachedEnd,
  } = useInfinitePagination(`/comments/post/${pid}?`);

  return (
    <>
      <h4 className='font-xss text-grey-900 fw-700 ls-2 mt-4'>Comment</h4>
      <CommentBox pid={pid} mutate={mutate} />

      {!comments ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        comments?.map((comment, index) => (
          <CommentBox
            created
            comment={comment}
            mutate={mutate}
            key={index}
            pid={pid}
          />
        ))
      )}
      {!isReachedEnd && (
        <button
          style={{ background: 'none' }}
          className='text-current font-xsss border-0'
          onClick={() => setSize(size + 1)}
        >
          Show More
        </button>
      )}
    </>
  );
};

const MentionItem = ({ petID }) => {
  const [pet, setPet] = useState({ id: petID });

  useEffect(() => {
    let mounted = true;
    const getMentionExtra = async (petID) => {
      try {
        const result = await axiosClient.get(`/pets/${petID}`);
        if (mounted) {
          setPet(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getMentionExtra(petID);
    return () => (mounted = false);
  }, []);
  return (
    <li className={`d-flex align-items-center cursor-pointer`}>
      <Link href={`/pet/${pet?.id}`}>
        <figure as='a' className='avatar m-auto me-3'>
          <Image
            width={45}
            height={45}
            src={pet?.avatar || 'https://via.placeholder.com/45'}
            alt='avatar'
            className='shadow-sm rounded-circle w45'
          />
        </figure>
      </Link>

      <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
        {pet?.name || 'Name'}
        <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
          {/*5 Posts*/}
          {'Pet'}
        </span>
      </h4>
    </li>
  );
};

const MentionSection = ({ item }) => {
  return (
    <ul className='d-flex'>
      <li
        className={`d-flex m-1 me-3 align-items-center cursor-pointer border-end pe-3`}
      >
        <Link href={`/user/${item?.User?.id}` || '/user'}>
          <figure as='a' className='avatar m-auto me-3'>
            <Image
              width={45}
              height={45}
              src={item?.User?.avatar || 'https://via.placeholder.com/45'}
              alt='avatar'
              className='image  shadow-sm rounded-circle w45 '
            />
          </figure>
        </Link>

        <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
          {item?.User
            ? `${item.User.first_name} ${item.User.last_name}`
            : 'Full Name'}
          <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
            {/*5 Posts*/}
            {'Author'}
          </span>
        </h4>
      </li>
      {item?.mentions?.map((mention, index) => (
        <MentionItem petID={mention.pet_id} key={index} />
      ))}
    </ul>
  );
};

const PostDetail = ({ item, loading, pid }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [showImage, setShowImage] = useState(true);

  const width = Number(item?.size?.split('x')[0]) || 300;
  const height = Number(item?.size?.split('x')[1]) || 500;
  const isOwner = String(user?.id) === String(item?.User.id);

  useEffect(() => {
    const getExtra = async () => {
      try {
        const result = await axiosClient.get(
          `/posts/${item?.id}/count_comments`
        );
        if (result.data) {
          setNumberOfComments(result.data.total_comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (item) {
      setShowImage(item.image_status == 'allowed');
      getExtra();
    }
  }, [item]);

  return (
    <Card className={`p-0 rounded-xxl shadow-xss`}>
      <Card.Body>
        <Row>
          <Col xs={12} md={true} className='align-content-center'>
            {loading ? (
              <Placeholder as='div' className={`w-100 h-100 rounded-xxxxl}`} />
            ) : showImage ? (
              <Image
                src={item?.media_url || 'https://via.placeholder.com/300/500'}
                className={`rounded-xxxxl`}
                width={width}
                height={height}
                alt='image'
                layout='responsive'
              />
            ) : (
              <div
                style={{ width: '100%', height: '100%', filter: 'blur 50%' }}
                className='card justify-content-center align-items-center d-flex shadow-xss'
              >
                <h6 className='font-xss text-align-center fw-500'>
                  <span>
                    <FiEye
                      className='cursor-pointer'
                      onClick={() => setShowImage(true)}
                    />{' '}
                  </span>
                  Content is maybe not related to pet
                </h6>
              </div>
            )}
          </Col>

          <Col xs={12} md={true}>
            <MentionSection item={item} />
            <div className='w-100 border-top mt-2 mb-2'></div>
            {/* <h4 className='font-xss text-grey-900 fw-700 ls-2 '>About</h4> */}
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
            <div className={`d-flex p-0 m-0 mb-3 position-relative`}>
              <VoteButton post={item} className='font-lg' />
              <a className='d-flex cursor-pointer align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
                <span className='text-dark text-grey-900 btn-round-sm font-lg'>
                  <FiMessageCircle />
                </span>
                {numberOfComments}
              </a>
              <MoreButton className='ms-auto' isOwner={isOwner} item={item} />
            </div>

            <CommentSection
              pid={pid}
              setNumberOfComments={setNumberOfComments}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
