import { useEffect, useMemo, useState } from "react";
import { useServerRequest } from "../../hooks";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../bff/constants";
import { getLastPageFromLinks, debounce } from "./utils";
import styled from "styled-components";

const MainContainer = ({ className }) => {
  const requestServer = useServerRequest();

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1)
  const [posts, setPosts] = useState([]);
  const [shouldSearch, setShouldSearch] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(({ res: { posts, links } }) => {
      setPosts(posts)
      setLastPage(getLastPageFromLinks(links))
    })
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value)
    startDelayedSearch(!shouldSearch)
  }

  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search
          onChange={onSearch}
          searchPhrase={searchPhrase}
        />
        {posts.length ?
          <div className="post-list">
            {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => {
              return (
                <PostCard
                  key={id}
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  publishedAt={publishedAt}
                  commentsCount={commentsCount}
                />
              )
            })}
          </div>
          :
          <div className="no-posts-found">Статьи не найдены</div>
        }
      </div>

      {lastPage > 1 && posts.length > 0 && <Pagination
        page={page}
        lastPage={lastPage}
        setPage={setPage}
      />}

    </div>
  )
}

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .post-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 20px 100px;
  }

  & .no-posts-found {
    font-size: 18px;
    mask-type: 40px;
    text-align: center;
  }
`;