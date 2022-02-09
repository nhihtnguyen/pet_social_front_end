import Link from 'next/link';
import Image from 'next/image';
import {
  FiThumbsUp,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiMoreHorizontal,
  FiEdit3,
} from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import { BsBookmarkHeart } from 'react-icons/bs';
import ReportButton from './itemdetail/ReportButton';
import { useAuth } from 'app/authContext';
import { useRouter } from 'next/router';
import { getFormatDate } from 'helpers';
import VoteButton from './votebutton/VoteButton';

const PostUser = ({ post }) => {
  const { user } = useAuth();
  const router = useRouter();

  let [width, height] = post?.size?.split('x') || [500, 500];
  width = (width * 350) / height;
  height = 350;

  const isOwner = user?.id == post?.user_id;

  const linkToEdit = () => {
    router.push(`/post/${post?.id}/edit`);
  };
  const handleSavePost = () => {};
  return (
    <div className='card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3'>
      <div className='card-body p-0 d-flex'>
        <figure className='avatar me-3'>
          <Image
            width={45}
            height={45}
            src={post?.User?.avatar || 'https://via.placeholder.com/45'}
            alt='avatar'
            className='shadow-sm rounded-circle w45'
          />
        </figure>
        <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
          {' '}
          {post?.User
            ? `${post?.User.first_name} ${post?.User.last_name}`
            : 'Name'}
          <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
            {' '}
            {/* {value.time} */}
            {post?.updated_at
              ? getFormatDate(new Date(post?.updated_at))
              : 'updated'}
          </span>
        </h4>
        <div className={`d-flex p-0 m-0 mb-3 ms-auto position-relative`}>
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
          <ReportButton item={post} />
        </div>
      </div>

      <div className='card-body p-0 mb-3 rounded-3 overflow-hidden'>
        <Image
          alt='content'
          width={width}
          height={height}
          src={post?.media_url || 'https://via.placeholder.com/500/500'}
        />
      </div>
      <div className='card-body p-0 me-lg-5'>
        <p className='fw-700 text-grey-800 lh-26 font-xss w-100 mb-0'>
          {post?.caption ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          delectus facere hic iusto consequuntur est sequi quis laborum impedit
          facilis.`}
          {post?.caption?.length > 1000 && (
            <a href='#' className='fw-600 text-primary ms-2'>
              See more
            </a>
          )}
        </p>
      </div>
      <div className='card-body d-flex p-0 mt-3'>
        <VoteButton post={post} />
        <Link href={`/post/${post?.id}`}>
          <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
            <i className='text-dark text-grey-900 btn-round-sm font-lg'>
              <FiMessageCircle />
            </i>
          </a>
        </Link>
        {false && (
          <Link href={`/post/${post?.id}`}>
            <a className='ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
              <i className='text-grey-900 text-dark btn-round-sm font-lg'>
                <FiShare2 />
              </i>
              <span className='d-none-xs'>Share</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostUser;
