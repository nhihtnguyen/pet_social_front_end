import Link from 'next/link';
import Image from 'next/image';
import {
  FiThumbsUp,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';

const PostUser = ({ post }) => {
  let [width, height] = post?.size?.split('x') || [500, 500];
  width = (width * 800) / height;
  height = 800;
  console.log(width, height);
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
            {/* {value.time} */}5 hour
          </span>
        </h4>
        <Link href='/defaultvideo'>
          <a className='ms-auto'>
            <i className='ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss'>
              <FiMoreHorizontal />
            </i>
          </a>
        </Link>
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
        <p className='fw-500 text-grey-500 lh-26 font-xssss w-100 mb-0'>
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
        <Link href={`/post/${post?.id}`}>
          <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3'>
            <i className='text-white bg-green-gradient me-1 btn-round-xs font-xss'>
              <IoPawOutline />
            </i>{' '}
            <i className='text-white bg-mini-gradient me-2 btn-round-xs font-xss'>
              <FiHeart />
            </i>
            2.8K Like
          </a>
        </Link>
        <Link href={`/post/${post?.id}`}>
          <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
            <i className='text-dark text-grey-900 btn-round-sm font-lg'>
              <FiMessageCircle />
            </i>
            22 Comment
          </a>
        </Link>
        <Link href={`/post/${post?.id}`}>
          <a className='ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
            <i className='text-grey-900 text-dark btn-round-sm font-lg'>
              <FiShare2 />
            </i>
            <span className='d-none-xs'>Share</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostUser;
