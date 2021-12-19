import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import NotFoundContainer from '../NotFoundContainer';
import { Loading } from '../../components/foundation/Loading';
import { Title } from '../../components/head/Title';
import { POSTS_LIMIT } from '../../../../constants/config';

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { username } = useParams();
  const { data: user = null, isValidating } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON, POSTS_LIMIT);

  if ( isValidating ) {
    return <Loading />
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Title title={ `${ user.name } さんのタイムライン - CAwitter` } />
      <UserProfilePage timeline={posts} user={user} />
    </InfiniteScroll>
  );
};

export { UserProfileContainer };
