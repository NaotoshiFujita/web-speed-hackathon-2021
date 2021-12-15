import React from 'react';

import { TermPage } from '../../components/term/TermPage';
import { Title } from '../../components/head/Title';

/** @type {React.VFC} */
const TermContainer = () => {
  return (
    <>
      <Title title={ `利用規約 - CAwitter` }/>
      <TermPage />
    </>
  );
};

export { TermContainer };
