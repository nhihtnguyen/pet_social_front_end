import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Slide from '../../components/carousel/Carousel';
import ItemCard from '../../components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { marketActions, marketSelector } from '../../features/market/marketSlice';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from '../../components/itemdetail/PostDetail';
import { useRouter } from 'next/router';
import axios from 'axios';

const postInfo = {
    imageUrl: 'user.png',
    name: 'Aliqa Macale',
    email: 'support@gmail.com',
    image: 'https://picsum.photos/400/500',
}

const PostDetail = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const arrayItems = useAppSelector(marketSelector);
    const { pid } = router.query

    const [post, setPost] = useState({});
    useEffect(() => {
        if (pid) {
            axios.get('http://localhost:3001/posts/' + pid).then(req => {
                console.log(req.data);
                setPost(req.data)
            }).catch(err => {
                // loggg
                console.log(err);
            })
        }
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row w-100">

                            <div className="col-xl-12">
                                <div className="justify-content-center">
                                    <ItemDetail item={post} pid={pid} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
};

export default PostDetail;