import {
  Card,
  Col,
  Row,
  Placeholder,
  Tabs,
  Tab,
  Spinner,
} from 'react-bootstrap';
import { FiEdit3, FiCopy } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useAuth } from 'app/authContext';
import { calVote } from 'helpers';
import { useRouter } from 'next/router';
import draftToHtml from 'draftjs-to-html';
import ParticipantCard from 'components/ParticipantCard';
import RegisterEventForm from 'components/forms/RegisterEventForm';
import useInfinitePagination from 'hooks/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosClient from 'axiosSetup';
import { getFormatDate } from 'helpers';

const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

const ParticipantsTab = ({ eventId }) => {
  const {
    paginatedData: paginatedParticipants,
    size,
    setSize,
    mutate,
    error,
    isReachedEnd,
    loadingMore,
  } = useInfinitePagination(
    eventId ? `/events/${eventId}/participants?` : null,
    eventId ? 10 : 0
  );
  console.log(paginatedParticipants);

  return (
    <InfiniteScroll
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      loader={<Spinner animation='border' />}
      dataLength={paginatedParticipants?.length ?? 0}
      className='w-100 p-0'
      pullToRefresh
    >
      <div className='row w-100 m-0 p-0'>
        {paginatedParticipants?.map((value, index) => {
          return (
            <div key={index} className='col-sm-4 col-xs-12 p-0 pe-3 m-0 mb-3 '>
              <ParticipantCard item={value} mutate={mutate} />
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

const RegisterTab = ({ eventId }) => {
  const [loaded, setLoaded] = useState(-1);

  const handleRegister = async (data, setErrors, errors) => {
    try {
      setLoaded(0);
      // Create form data
      let bodyFormData = new FormData();

      bodyFormData.append('image', data.image.file);
      bodyFormData.append('caption', data.caption);
      if (Boolean(data?.pet)) {
        bodyFormData.append('pet_id', data.pet.value);
      }
      const result = await axiosClient.post(
        `/events/${eventId}/join`,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setLoaded(percentCompleted);
          },
        }
      );
      if (result.status == 200) {
        // Notify here and redirect
        console.log(result.data);
      }

      if (result.status == 400) {
        setLoaded(-1);
        let caption =
          result.data?.type === 'caption'
            ? result.data?.status === STATUS['denied']
              ? 'Your caption content some words that are not allowed'
              : result.data?.status === STATUS['warning']
              ? 'Your content should be related pet or animals'
              : ''
            : '';
        let image =
          result.data?.type === 'image'
            ? result.data?.status === STATUS['allowed']
              ? { type: 'valid', text: 'Allowed' }
              : result.data?.status === STATUS['warning']
              ? {
                  type: 'warning',
                  text: 'Your image should be related pet or animals',
                }
              : { type: 'invalid', text: 'Your image is not allowed.' }
            : '';

        setErrors({
          ...errors,
          image,
          caption,
        });
      }
      setLoaded(-1);
    } catch (error) {
      setLoaded(-1);
      console.log(error);
    }
  };
  return (
    <>
      <RegisterEventForm loaded={loaded} onSubmit={handleRegister} />
    </>
  );
};

const EventDetail = ({ item, loading, pid }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [markup, setMarkup] = useState('');
  const [internalType, setInternalType] = useState('');

  //const isOwner = String(user?.id) === String(item?.User.id);

  const linkToEdit = (isClone) => () => {
    router.push(`/event/${item?.id}/edit${isClone ? '?is_clone=true' : ''}`);
  };
  const owner = user?.id == item?.creator;
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

      if (new Date(item?.start) - Date.now() > 0) {
        setInternalType('incoming');
      } else if (new Date(item?.end) - Date.now() > 0) {
        setInternalType('ongoing');
      } else {
        setInternalType('closed');
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
            <h4 className='text-dark'>
              {item?.name || 'Name'}{' '}
              <span
                className={`${
                  internalType == 'incoming'
                    ? 'text-info'
                    : internalType == 'ongoing'
                    ? 'text-success'
                    : internalType == 'closed'
                    ? 'text-danger'
                    : ''
                } font-xss`}
              >
                • {internalType || 'unset'}
              </span>
              <br />
              <span className='font-xsss'>
                {getFormatDate(new Date(item?.start)) +
                  '-' +
                  getFormatDate(new Date(item?.end))}
              </span>
            </h4>
          )}
          <a
            className='ms-auto cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
            onClick={linkToEdit(!owner)}
          >
            <span className='text-dark text-grey-900 btn-round-sm font-lg'>
              {owner ? <FiEdit3 /> : <FiCopy />}
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
            <ParticipantsTab eventId={item?.id} />
          </Tab>
          {internalType != 'closed' && (
            <Tab
              tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
              eventKey='register'
              title='REGISTER NOW'
              className='pe-2'
            >
              <RegisterTab eventId={item?.id} />
            </Tab>
          )}
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
