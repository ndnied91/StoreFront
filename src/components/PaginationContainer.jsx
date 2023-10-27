import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    console.log(search);
    console.log(pathname);

    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) {
    // what if we only have one page
    return null;
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          disabled={page === 1 ? true : false}
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        {pages.map((pageNumber) => {
          console.log(page);
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : null
              }`}
            >
              {' '}
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={page === pages.length ? true : false}
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
