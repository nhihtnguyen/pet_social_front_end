import {
  Card,
  Col,
  Row,
  Button,
  Placeholder,
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
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
import ParticipantCard from 'components/ParticipantCard';
import RegisterEventForm from 'components/forms/RegisterEventForm';

const ParticipantsTab = () => {
  return (
    <div className='row w-100 m-0 p-0'>
      {[1, 2, 3, 4, 5, 6, 7].map((value) => {
        return (
          <div key={value} className='col-sm-4 col-xs-12 p-0 pe-3 m-0 mb-3 '>
            <ParticipantCard />
          </div>
        );
      })}
    </div>
  );
};

const RegisterTab = () => {
  return (
    <>
      <RegisterEventForm />
    </>
  );
};

const EventDetail = ({ item, loading, pid }) => {
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
        <div className={`d-flex p-0 m-0 mb-3 position-relative`}>
          {loading ? (
            <Placeholder as='h4' animation='glow'>
              <Placeholder xs={5} />
            </Placeholder>
          ) : (
            <h4 className='text-dark'>{item?.name || 'Name'}</h4>
          )}
          <a
            className='ms-auto cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
            onClick={linkToEdit}
          >
            <span className='text-dark text-grey-900 btn-round-sm font-lg'>
              <FiEdit3 />
            </span>
          </a>
        </div>
        <Tabs defaultActiveKey='about' id='item-detail-tab' className='mb-3'>
          <Tab
            eventKey='about'
            title='About'
            tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
            className='pe-2'
          >
            <Row>
              <Col xs={12}>
                {markup && <div dangerouslySetInnerHTML={{ __html: markup }} />}
              </Col>
            </Row>
          </Tab>
          <Tab
            tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
            eventKey='participants'
            title='Participants'
            className='pe-2'
          >
            <ParticipantsTab />
          </Tab>
          <Tab
            tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
            eventKey='register'
            title='REGISTER NOW'
            className='pe-2'
          >
            <RegisterTab />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
