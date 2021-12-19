import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Title } from '../../components/head/Title';
import { POSTS_LIMIT } from '../../../../constants/config';

/** @type {React.VFC} */
const TimelineContainer = () => {
  const { data: posts, fetchMore } = useInfiniteFetch( '/api/v1/posts', fetchJSON, POSTS_LIMIT );

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Title title={ `タイムライン - CAwitter` } />
      <TimelinePage timeline={posts} />
    </InfiniteScroll>
  );
};

export { TimelineContainer };
