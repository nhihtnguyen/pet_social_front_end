import styles from '../../styles/Explore.module.scss';

import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Postcard from '../../components/postcard/Postcard';
import FloatingButton from '../../components/floatingbutton/FloatingButton';
import {
    useAppDispatch,
    useAppSelector,
} from '../../app/hooks';
import { postActions, postSelector } from '../../features/post/postSlice';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';

const Explore = ({ query }) => {
    const dispatch = useAppDispatch();
    const postData = useAppSelector(postSelector);
    useEffect(() => {
        dispatch(postActions.fetch(query));
    }, [query]);

    useEffect(() => {
        if (postData.isFailed) {
            // Log, Alert...
        }
    }, [postData])

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <FloatingButton icon={<FiPlus />} href={`/create`} />

                                <div className="row ps-2 pe-1 justify-content-center">
                                    <section style={{
                                        columnWidth: 236,
                                        columnGap: 5,
                                        padding: 5,
                                    }}>
                                        {postData.isLoading
                                            ? <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            : postData?.data?.map((value, index) =>

                                                <Postcard key={index} index={index} value={value} />

                                            )}
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
};
Explore.getInitialProps = ({ query }) => {
    return { query }
}

export default Explore;