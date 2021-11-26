import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Postcard from '../../components/postcard/Postcard';
import PageTitle from '../../components/pagetitle/PageTitle';
import {
    useAppDispatch,
    useAppSelector,
} from '../../app/hooks';
import { postActions, postSelector } from '../../features/post/postSlice';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiUpload } from 'react-icons/fi';


const Explore = () => {
    const dispatch = useAppDispatch();
    const postData = useAppSelector(postSelector);

    useEffect(() => {
        dispatch(postActions.fetch());
    }, []);

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <PageTitle title="For you" />
                                <Link href='/create'>
                                    <a style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,

                                    }}>
                                        dsdshj
                                        <FiUpload />
                                    </a>
                                </Link>

                                <div className="row ps-2 pe-1 justify-content-center">
                                    <section style={{
                                        columnWidth: 236,
                                        columnGap: 5,
                                        padding: 5,
                                    }}>
                                        {postData?.data.map((value, index) =>

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

export default Explore;