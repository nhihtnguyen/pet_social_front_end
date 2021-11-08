import ShowMore from "../showmore/ShowMore";

const Follow = () => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <ShowMore />
      {/* {friendList.map((value, index) => ( */}
      <div className="wrap">
        <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
          <figure className="avatar me-3">
            <img
              src=""
              //   src={`assets/images/${value.imageUrl}`}
              alt="avater"
              className="shadow-sm rounded-xxxl w45"
            />
          </figure>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            Your Name
            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
              Lorem ipsum dolor sit amet.
            </span>
          </h4>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Follow;
