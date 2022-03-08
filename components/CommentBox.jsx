import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiMessageCircle,
  FiSend,
  FiEdit2,
  FiXCircle,
  FiMoreVertical,
  FiX,
} from 'react-icons/fi';
import { AiOutlineSend, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCommentSlash } from 'react-icons/fa';
import axiosClient from 'axiosSetup';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { getFormatDate } from 'helpers';
import Input from 'components/controls/Input';
import VoteButton from 'components/votebutton/VoteButton';
import { useAuth } from 'app/authContext';
import { beautifyTime } from 'helpers';

const MoreButton = ({
  item,
  className,
  isOwner,
  setIsEdit,
  mutate,
  ...props
}) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //const router = useRouter();
  const linkToEdit = () => {
    //router.push(`/post/${item?.id}/edit`);
  };
  const linkToUser = () => {};
  const handleReport = () => {};
  const handleSavePost = () => {};
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/comments/${item.id}`);
      console.log('success');
      setShowConfirm(false);
      mutate();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };
  return (
    <div
      className={`more-button${
        toggleMore ? ' active' : ''
      } top-0 right-0 position-absolute d-inline-flex`}
    >
      <div className='item'>
        <a className='me-1' onClick={() => setIsEdit(true)}>
          <span className='cursor-pointer text-grey-900 text-dark font-xs'>
            <FiEdit2 />
          </span>
        </a>
        <a className='me-1' onClick={() => setShowConfirm(true)}>
          <span className='cursor-pointer font-xs text-danger'>
            <FaCommentSlash />
          </span>
        </a>
      </div>

      <span
        className={`toggle ${
          toggleMore ? 'active' : ''
        } cursor-pointer text-grey-900 text-dark font-xs me-3`}
        onClick={() => setToggleMore(!toggleMore)}
      >
        <FiMoreVertical />
      </span>
      <Modal
        contentClassName='card rounded-xxl'
        show={showConfirm}
        onHide={handleCloseConfirm}
      >
        <Modal.Header className='text-dark'>
          <Modal.Title>Delete comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-dark'>Confirm delete.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseConfirm}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const CommentBox = ({ className, comment, created, pid, replyFor, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuClass = `${isOpen ? ' show' : ''}`;

  const handleReply = async (e) => {
    const initData = {
      User: { first_name: 'F', last_name: 'F' },
      content: 'temp',
      created_at: '2022-01-23T11:59:47.988Z',
      downvote: null,
      id: 0,
      post_id: 0,
      reply_for: null,
      updated_at: '2022-01-23T11:59:47.988Z',
      upvote: null,
      user_id: 0,
    };
    mutate((posts) => [initData, ...posts]);

    try {
      const newComment = {
        post_id: pid,
        content,
        reply_for: replyFor || null,
      };

      const result = await axiosClient.post(`/comments`, newComment);

      if (result.data) {
        mutate();
      }
    } catch (err) {
      // logging
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    try {
      const newComment = {
        post_id: pid,
        content,
        reply_for: comment.reply_for,
      };
      mutate((posts) => [newComment, ...posts]);

      const result = await axiosClient.put(
        `/comments/${comment.id}`,
        newComment
      );
      if (result) {
        setIsEdit(false);
        mutate();
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
  const isOwner = user?.id == comment?.user_id;
  return (
    <div className={`p-0 mt-3 position-relative d-flex ${className || ''}`}>
      <figure
        className={`avatar ${
          created ? 'w45' : 'w30 position-absolute'
        } me-2 ms-2 mt-1 top-5 z-index-1`}
      >
        <Image
          width={`${created ? 45 : 30}`}
          height={`${created ? 45 : 30}`}
          src='https://via.placeholder.com/45'
          alt='avatar'
          className={`rounded-circle shadow-sm`}
        />
      </figure>

      {created && !isEdit ? (
        <div
          className={`bor-0 w-100 rounded-xxl p-2 ps-3 
                     border-light-md theme-dark-bg position-relative`}
        >
          {isOwner && (
            <MoreButton setIsEdit={setIsEdit} item={comment} mutate={mutate} />
          )}
          <h6 className={`font-xsss fw-600 mb-0 d-flex`}>
            {comment
              ? comment.User?.first_name + ' ' + comment.User?.last_name
              : 'UserName'}
            &nbsp;
            <span className={`text-grey-500 font-xssss fw-500`}>
              {comment ? beautifyTime(comment?.updated_at) : ''}
            </span>
          </h6>
          <p className={`font-xssss text-grey-900 fw-500`}>
            {comment?.content}
          </p>
          <div className={`d-flex p-0 mt-3 position-relative`}>
            <VoteButton
              post={{ id: pid }}
              comment={comment}
              className='btn-round-sm font-xs'
            />
            <Link href='/'>
              <a className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'>
                <i className='text-dark text-grey-900 btn-round-sm font-xs'>
                  <FiMessageCircle />
                </i>
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name='message'
            as='textarea'
            className='w-100'
            inputClassName={`h100 rounded-xxl font-xssss fw-500 border-light-md theme-dark-bg`}
            inputStyle={{
              resize: 'none',
              overflow: 'hidden',
              paddingLeft: isEdit ? '' : '',
              padding: '0.5rem 0.5rem 0.5rem 70px',
            }}
            cols='30'
            rows='10'
            placeholder="What's on your mind?"
            draggable={false}
          />
          <div className='position-absolute bottom-0 mb-1' style={{ right: 0 }}>
            {isEdit && (
              <a
                as={'button'}
                onClick={handleCancelEdit}
                className='cursor-pointer font-sm fw-600 ls-1 text-danger pe-4'
              >
                <FiXCircle />
              </a>
            )}

            <a
              onClick={isEdit ? handleEdit : handleReply}
              className='cursor-pointer m-1 border-0 font-sm fw-600 ls-1 text-current pe-4'
            >
              <FiSend />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentBox;
