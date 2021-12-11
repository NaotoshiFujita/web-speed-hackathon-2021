import React, { useCallback, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Font } from '../../components/foundation/Font';
import { Helmet } from 'react-helmet';
import TimelineContainer from '../TimelineContainer';
import PostContainer from '../PostContainer';
import TermContainer from '../TermContainer';
import UserProfileContainer from '../UserProfileContainer';
import AuthModalContainer from '../AuthModalContainer';
import NewPostModalContainer from '../NewPostModalContainer';
import NotFoundContainer from '../NotFoundContainer';


const AppContainer = ( props ) => {
  const { pathname } = useLocation();
  useEffect( () => {
    window.scrollTo( 0, 0 );
  }, [ pathname ] );

  const [ activeUser, setActiveUser ] = useState( props.activeUser || null );
  const { data = null, isLoading } = useFetch( '/api/v1/me', fetchJSON );

  useEffect( () => {
    setActiveUser( data );
  }, [ data ] );

  const [ modalType, setModalType ] = useState( 'none' );
  const handleRequestOpenAuthModal = useCallback( () => setModalType( 'auth' ), [] );
  const handleRequestOpenPostModal = useCallback( () => setModalType( 'post' ), [] );
  const handleRequestCloseModal    = useCallback( () => setModalType( 'none' ), [] );

  if ( isLoading && ! props.isSSR ) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    )
  }

  // todo isLoading
  return (
    <>
      <AppPage
        activeUser={ activeUser }
        onRequestOpenAuthModal={ handleRequestOpenAuthModal }
        onRequestOpenPostModal={ handleRequestOpenPostModal }
      >
        <Routes>
          <Route element={ <TimelineContainer posts={ props.posts } />} path="/" />
          <Route element={ <UserProfileContainer /> } path="/users/:username"  />
          <Route element={ <PostContainer /> } path="/posts/:postId" />
          <Route element={ <TermContainer /> } path="/terms" />
          <Route element={ <NotFoundContainer /> } path="*" />
        </Routes>
      </AppPage>

      { modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={ handleRequestCloseModal } onUpdateActiveUser={ setActiveUser }/>
      ) : null }

      { modalType === 'post' ? (
        <NewPostModalContainer onRequestCloseModal={ handleRequestCloseModal }/>
      ) : null }

      <Font />
    </>
  );
};

export { AppContainer };
