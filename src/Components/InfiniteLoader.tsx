import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "api/unsplash";
import { PhotoDataContext } from "context";

import {
  START_LOADING,
  NEXT_PAGE,
  REQUEST_ERROR,
} from "actions/infiniteLoaderActions";

const determineParams = (route: string, state: any, searchType: string) => {
  switch (route) {
    case "/search/:searchType/:searchValue":
      return state.searchPage[searchType];
    case "/":
    case "/explore":
      return state[route];
    default:
      return state.gridPage;
  }
};

interface Props {
  route: string;
  query: string;
  searchType: string;
  searchValue?: string;
  orderedBy?: string;
  loader?: any;
  children: any;
}

export default function InfiniteLoader({
  route,
  query,
  searchType,
  searchValue = "",
  orderedBy = "latest",
  loader = <div key={0}>loading</div>,
  children,
}: Props) {
  const [state, dispatch] = useContext(PhotoDataContext);
  const { allowFetching, isLoading } = state;

  const { page, hasMore } = determineParams(route, state, searchType);

  const params =
    searchType === "listPhotos"
      ? [page, 15, orderedBy]
      : [searchValue, page, 15];

  const loadMore = async () => {
    if (isLoading || !allowFetching || !hasMore) return;
    try {
      dispatch(START_LOADING);
      const response = await unsplash[query][searchType](...params);
      const json = await toJson(response);
      const total = json.total || null;
      let results;
      switch (query) {
        case "search":
          results = json.results;
          break;
        default:
          results = json;
      }
      dispatch(
        NEXT_PAGE({
          route,
          dataList: results,
          total,
          keyword: searchValue,
          searchType,
        })
      );
    } catch {
      dispatch(REQUEST_ERROR);
      console.log("something went wrong");
    }
  };
  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadMore}
      hasMore={hasMore && allowFetching}
      loader={loader}
      useWindow={true}
    >
      {children}
    </InfiniteScroll>
  );
}
