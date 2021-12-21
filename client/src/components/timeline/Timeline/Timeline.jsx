import React from 'react';

import { TimelineItem } from '../TimelineItem';
import { TIMELINE_LAZYLOAD_MIN_INDEX } from '../../../../../constants/config';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ( { timeline, lazyLoadMinIndex = TIMELINE_LAZYLOAD_MIN_INDEX } ) => {
  return (
    <section>
      { timeline.map( ( post, index ) => {
        return <TimelineItem key={ post.id } post={ post } lazy={ index >= lazyLoadMinIndex }/>;
      } ) }
    </section>
  );
};

export { Timeline };
