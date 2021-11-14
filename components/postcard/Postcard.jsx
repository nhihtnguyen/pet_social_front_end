import Image from 'next/image';

const Postcard = ({ value, index }) => {
    return (
        <div
            className="card d-block border-0 shadow-xss rounded-3 bg-gradient-bottom mb-3 "
            style={{
                width: '236px',
            }}
        >
            <div className={`image-container`} style={{ width: 236 }}>
                <Image src={value.bgImage} layout='fill' alt={value.bgImage} className='image' />
            </div>

            <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                <div className="clearfix"></div>
                <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">{value.name}</h4>
            </div>
        </div >
    )
}

export default Postcard;