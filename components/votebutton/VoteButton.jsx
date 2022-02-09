import { calVote } from 'helpers';
import axiosClient from 'axiosSetup';
import { IoPawOutline, IoPaw } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import styles from './VoteButton.module.scss';
import { useAuth } from 'app/authContext';

const VoteButton = ({ post, comment = null }) => {
  const { user } = useAuth();
  const [voted, setVoted] = useState(false);
  const [countVote, setCountVote] = useState('...');
  const vote = async () => {
    try {
      setVoted(true);
      setCountVote(countVote + 1);
      const result = await axiosClient.post('/voting/vote', {
        post_id: post?.id,
        comment_id: comment?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const unvote = async () => {
    try {
      setVoted(false);
      setCountVote(countVote - 1);
      await axiosClient.post(`/voting/unvote`, {
        post_id: post?.id,
        comment_id: comment?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUserVote = async () => {
      try {
        const result = await axiosClient.get(
          `/voting/single?post_id=${post?.id}${
            comment?.id ? '&&comment_id=' + comment?.id : ''
          }`
        );
        console.log(
          'result',
          `/voting/single?post_id=${post?.id}${
            comment?.id ? '&&comment_id=' + comment?.id : ''
          }`,
          result
        );
        if (result.status === 200) {
          setVoted(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (post) {
      setCountVote(comment?.id ? comment?.upvote : post?.upvote);
      console.log(comment?.id ? comment?.upvote : post?.upvote, post, comment);
      getUserVote();
    }
  }, [post, comment]);
  return (
    <a
      className='d-flex cursor-pointer align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3'
      onClick={voted ? unvote : vote}
    >
      <span
        className={`text-dark text-grey-900 btn-round-sm font-lg ${styles['vote-button']}`}
      >
        {voted ? <IoPaw className='text-current' /> : <IoPawOutline />}
      </span>
      {calVote(countVote || 0)}
    </a>
  );
};
export default VoteButton;
