import React from 'react';

import { Timeline } from '../../timeline/Timeline';
import { UserProfileHeader } from '../UserProfileHeader';
import { USER_PROFILE_LAZYLOAD_MIN_INDEX } from '../../../../../constants/config';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfilePage = ({ timeline, user }) => {
  return (
    <>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
        <Timeline timeline={timeline} lazyLoadMinIndex={ USER_PROFILE_LAZYLOAD_MIN_INDEX }/>
      </div>
    </>
  );
};

export { UserProfilePage };
