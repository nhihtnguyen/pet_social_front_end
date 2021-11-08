import ShowMore from "../showmore/ShowMore";
const Event = () => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <ShowMore />
      {/* {eventsList.map((value, index) => ( */}
      <div
        //   key={index}
        className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden"
      >
        <div className={`bg-success me-2 p-3 rounded-xxl `}>
          <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
            <span className="ls-1 d-block font-xsss text-white fw-600">
              {/* {value.month} */}03
            </span>
            {/* {value.date} */}12
          </h4>
        </div>
        <h4 className="fw-700 text-grey-900 font-xssss mt-2">
          {/* {value.name}{" "} */}HAHAHA
          <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
            {/* {value.location} */}TPHCM
          </span>{" "}
        </h4>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Event;
