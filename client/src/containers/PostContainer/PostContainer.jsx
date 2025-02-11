import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import NotFoundContainer from '../NotFoundContainer';
import { Loading } from '../../components/foundation/Loading';
import { Title } from '../../components/head/Title';
import { COMMENTS_LIMIT } from '../../../../constants/config';

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();
  const { data: post, isValidating } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);
  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON, COMMENTS_LIMIT);

  if ( isValidating || post === undefined ) {
    return <Loading/>;
  }

  if ( ! post ) {
    return <NotFoundContainer/>;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <Title title={ `${ post.user.name } さんのつぶやき - CAwitter` } />
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
