import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import ItemListTop from "./ItemListTop";
import ItemProductList from "../../components/ItemProduct/ItemProductList";
import FilterAndSort from "./FilterAndSort/FilterAndSort";
import { api } from "../../config";
import "./Itemlist.scss";

export interface ShoesData {
  id: number,
  price: string,
  name: string,
  category: number,
  thumbnailUrl: string,
  productId: number,
}

const Itemlist = () => {
  const EIGHT: number = 8;
  const [shoesData, setShoesData] = useState<ShoesData[]>([]);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");

  useEffect(() => {
    fetch(
      `${api.products}/${params.gender}?category=${category}&sort=${sort}&offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => setShoesData(res.data));
  }, [params.gender, category, limit, offset, sort]);

  const handleWindow = (e: React.MouseEvent) => {
    const clicked = (e.target as HTMLElement).closest(".filterAndSort");
    if (clicked === null && isFilter) {
      setIsFilter((prev) => !prev);
    }
  };

  const clickFilter = () => {
    setIsFilter((prev) => !prev);
  };

  const pagination = (pagingNum: number) => {
    searchParams.set("offset", `${(pagingNum - 1) * EIGHT}`);
    searchParams.set("limit", `${EIGHT}`);
    setSearchParams(searchParams);
  };

  const clickSort = (isSelected: string) => {
    searchParams.set('category', '')
    searchParams.set('sort', isSelected)
    searchParams.set('offset', `${0}`)
    searchParams.set('limit', `${EIGHT}`)
    setSearchParams();
  };

  const sortReset = () => {
    searchParams.set('category', '')
    searchParams.set('sort', '')
    searchParams.set('offset', `${0}`)
    searchParams.set('limit', `${EIGHT}`)
    setSearchParams();
  };

  return (
    <div className="itemList" onClick={handleWindow}>
      <ItemListTop
        clickFilter={clickFilter}
        gender={params.gender}
        shoesData={shoesData}
      />

      <div className="itemListProducts">
        {shoesData?.map((item) => (
          <ItemProductList key={item.id} data={item} />
        ))}
      </div>

      {isFilter && (
        <FilterAndSort
          setIsFilter={setIsFilter}
          sortReset={sortReset}
          clickSort={clickSort}
        />
      )}
      <div className="pagination">
        {PAGE_NUMBER.map((num) => {
          return (
            <button
              className="pagingBtn"
              key={num}
              onClick={() => {
                pagination(num);
              }}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Itemlist;

const PAGE_NUMBER = [1, 2, 3];
