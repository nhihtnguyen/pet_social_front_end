import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CommentBox.module.scss';
import { FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineSend, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoPawOutline } from 'react-icons/io5';
import { host as serverHost } from 'config';
import axiosClient from 'axiosSetup';
import { Spinner, Button } from 'react-bootstrap';
import { mutate } from 'swr';

const getFormatDate = (date) => {
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear()
  );
};

const CommentBox = ({ className, comment, created, pid, replyFor, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuClass = `${isOpen ? ' show' : ''}`;

  const handleReply = async (e) => {
    try {
      const newComment = {
        post_id: pid,
        content,
        reply_for: replyFor || null,
      };
      result = await axiosClient.post(`${serverHost}/comments`, newComment);
      if (result.data) {
        mutate({ ...result.data });
      }
    } catch (err) {
      // logging
    }
  };

  const handleEdit = async (e) => {
    try {
      const newComment = {
        post_id: pid,
        content,
        reply_for: comment.reply_for,
      };
      const result = await axiosClient.put(
        `${serverHost}/comments/${comment.id}`,
        newComment
      );
      console.log(result);
      if (result) {
        setIsEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    if (isEdit) {
      setContent(comment.content || '');
    }
  }, [isEdit]);
  return (
    <div className={`p-0 mt-3 position-relative d-flex ${className}`}>
      <figure
        className={`avatar ${
          created ? '' : 'position-absolute'
        } me-2 ms-2 mt-1 top-5`}
      >
        <div
          className={`image-container shadow-sm rounded-circle ${
            created ? 'w45' : 'w30'
          }`}
        >
          <Image
            layout='fill'
            src='https://picsum.photos/200'
            alt='icon'
            className='image rounded-circle w30'
          />
        </div>
      </figure>
      {
        //<textarea name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
        created && !isEdit ? (
          <div
            className={`bor-0 w-100 rounded-xxl p-2 ps-3 
                     border-light-md theme-dark-bg position-relative`}
          >
            <Link href='#'>
              <a className='ms-auto' onClick={() => setIsEdit(true)}>
                <i className='text-grey-900 font-xs position-absolute top-0 right-0 me-3'>
                  <FiMoreHorizontal />
                </i>
              </a>
            </Link>
            <h6 className={`font-xsss fw-600 mb-0 d-flex`}>
              {comment
                ? comment.User?.first_name + ' ' + comment.User?.last_name
                : 'UserName'}
              &nbsp;
              <span className={`text-grey-500`}>
                Last edited:&nbsp;
                {comment ? getFormatDate(new Date(comment.updated_at)) : ''}
              </span>
            </h6>
            <p className={`font-xssss text-grey-900 fw-500`}>
              {comment?.content}
            </p>
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
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name='message'
              className={`${styles['textarea-resize-lock']} 
                            h100 bor-0 w-100 rounded-xxl p-2 ps-5 
                            font-xssss text-grey-900 fw-500 border-light-md theme-dark-bg`}
              cols='30'
              rows='10'
              placeholder="What's on your mind?"
              draggable={false}
            />
            <div
              className='position-absolute bottom-0 mb-1'
              style={{ right: 0 }}
            >
              {isEdit && (
                <a
                  as={'button'}
                  onClick={handleCancelEdit}
                  className='font-xss fw-600 ls-1 text-grey-700 text-dark pe-4'
                >
                  <AiOutlineCloseCircle />
                </a>
              )}

              <a
                as={'button'}
                onClick={isEdit ? handleEdit : handleReply}
                className='font-xss fw-600 ls-1 text-grey-700 text-dark pe-4'
              >
                <AiOutlineSend />
              </a>
            </div>
          </>
        )
      }
    </div>
  );
};

export default CommentBox;
