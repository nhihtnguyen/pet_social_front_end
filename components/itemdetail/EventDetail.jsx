import { Card, Col, Row, Button, Placeholder, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import {
  FiMessageCircle,
  FiShare2,
  FiMoreHorizontal,
  FiEdit3,
  FiAlertCircle,
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
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const PostDetail = ({ item, loading, pid }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [markup, setMarkup] = useState('');

  //const isOwner = String(user?.id) === String(item?.User.id);

  const linkToEdit = () => {
    router.push(`/event/${item?.id}/edit`);
  };

  useEffect(() => {
    // const getExtra = async () => {
    //   try {
    //     const result = await axiosClient.get(
    //       `/posts/${item?.id}/count_comments`
    //     );
    //     if (result.data) {
    //       setNumberOfComments(result.data.total_comments);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // if (item) {
    //   getExtra();
    // }
    try {
      if (item) {
        const rawContentState = JSON.parse(item?.description);
        console.log(rawContentState);

        let markup = draftToHtml(rawContentState);
        console.log(markup);
        setMarkup(markup);
      }
    } catch (error) {
      console.log(error);
    }
  }, [item]);

  return (
    <Card className={`p-0 rounded-xxl shadow-xss`}>
      <Card.Body>
        <Row>
          <Col xs={12} className='align-content-center'>
            {loading ? (
              <Placeholder as='h4' animation='glow'>
                <Placeholder xs={5} />
              </Placeholder>
            ) : (
              <h4 className='text-dark'>{item?.name || 'Name'}</h4>
            )}
            <div className={`d-flex p-0 m-0 mb-3 position-relative ms-auto`}>
              <a
                className='ms-auto cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
                onClick={linkToEdit}
              >
                <span className='text-dark text-grey-900 btn-round-sm font-lg'>
                  <FiEdit3 />
                </span>
              </a>
            </div>
          </Col>
          <Col xs={12}>
            {markup && <div dangerouslySetInnerHTML={{ __html: markup }} />}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
