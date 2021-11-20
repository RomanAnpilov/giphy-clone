import React from "react";
import axios from "axios";
import Item from "./components/Item";
import ReactPaginate from "react-paginate";

const App = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");

  const handleTrand = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=8I1VWTLsJWFMk7Xaf7kUnYe0T1249vYW&limit=20&offset=${
          page * 20
        }`
      )
      .then((response) => {
        setData(response.data.data);
      });
  };

  const handleInput = () => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=8I1VWTLsJWFMk7Xaf7kUnYe0T1249vYW&limit=20&offset=0${
          page * 20
        }&q=${searchValue}`
      )
      .then((response) => {
        setData(response.data.data);
      });
  };

  React.useEffect(() => {
    if (searchValue.length > 0) {
      handleInput();
    } else {
      handleTrand();
    }
  }, [page, searchValue]);

  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  const changeSearchValue = (value) => {
    setSearchValue(value.target.value);
  };

  console.log(page);

  return (
    <>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="GIF"
          name="name"
          id="name"
          onChange={changeSearchValue}
          value={searchValue}
        />
        <label for="name" className="form__label">
          GIF
        </label>
      </div>
      <div className="container">
        {data.map((data) => (
          <Item
            key={data.id}
            title={data.title}
            imgUrl={data.images.downsized_large.url}
          />
        ))}
      </div>
    </>
  );
};

export default App;
