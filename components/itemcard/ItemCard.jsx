const ItemCard = () => {
  return (
    <div className="card w-100 border-0 mt-4">
      <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
        <a href="#">
          <img src="" alt="product" className="w-100 mt-0 mb-0 p-5" />
        </a>
      </div>
      <div className="card-body w-100 p-0 text-center">
        <h2 className="mt-2 mb-1">
          <a href="#" className="text-black fw-700 font-xsss lh-26">
            Hello
          </a>
        </h2>
        <h6 className="font-xsss fw-600 text-grey-500 ls-2">$299</h6>
      </div>
    </div>
  );
};

export default ItemCard;
