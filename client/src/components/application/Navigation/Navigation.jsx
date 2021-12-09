import React from 'react';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { NavigationItem } from '../NavigationItem';
import { Helmet } from 'react-helmet';

/**
 * @typedef {object} Props
 * @property {Models.User | null} activeUser
 * @property {() => void} onRequestOpenAuthModal
 * @property {() => void} onRequestOpenPostModal
 */

/** @type {React.VFC<Props>} */
const Navigation = ({ activeUser, onRequestOpenAuthModal, onRequestOpenPostModal, isLoading }) => {
  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      { isLoading ? (
        <Helmet>
          <title>読込中 - CAwitter</title>
        </Helmet>
      ) : (
        <NavigationItems
          activeUser={ activeUser }
          onRequestOpenAuthModal={ onRequestOpenAuthModal }
          onRequestOpenPostModal={ onRequestOpenPostModal }
        />
      ) }
    </nav>
  );
};

const NavigationItems = ( { activeUser, onRequestOpenAuthModal, onRequestOpenPostModal } ) => {
  return (
    <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
      <NavigationItem href="/" icon={<FontAwesomeIcon iconType="home" styleType="solid" />} text="ホーム" />
      {activeUser !== null ? (
        <NavigationItem
          icon={<FontAwesomeIcon iconType="edit" styleType="solid" />}
          onClick={onRequestOpenPostModal}
          text="投稿する"
        />
      ) : null}
      {activeUser !== null ? (
        <NavigationItem
          href={`/users/${activeUser.username}`}
          icon={<FontAwesomeIcon iconType="user" styleType="solid" />}
          text="マイページ"
        />
      ) : null}
      {activeUser === null ? (
        <NavigationItem
          icon={<FontAwesomeIcon iconType="sign-in-alt" styleType="solid" />}
          onClick={onRequestOpenAuthModal}
          text="サインイン"
        />
      ) : null}
      <NavigationItem
        href="/terms"
        icon={<FontAwesomeIcon iconType="balance-scale" styleType="solid" />}
        text="利用規約"
      />
    </ul>
  );
}

export { Navigation };
