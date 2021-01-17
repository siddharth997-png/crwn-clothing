import React from 'react';

import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { directorySectionsSelector } from '../../redux/directory/directory.selector'; 

import './directory.styles.scss';

const Directory = ({sections}) =>  (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherProps}) => (
      <MenuItem key={id} {...otherProps} />
    ))}
  </div>
);
 
const mapStateToProps = createStructuredSelector({
  sections : directorySectionsSelector
})

export default connect(mapStateToProps)(Directory);
