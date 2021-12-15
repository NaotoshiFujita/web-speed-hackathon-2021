import React from 'react';
import { Title } from '../../head/Title';


export function Loading( { message = '' } ) {
  return <Title title={ message || '読込中 - CAwitter' } />;
}