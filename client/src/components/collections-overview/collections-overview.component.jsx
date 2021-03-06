import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionsPreview from '../collection-preview/collection-preview.component';

const CollectionsOverview = ({collections}) => (
  <div className='collections-overview'>
  {  collections.map( ({id, ...otherProps}) => (
      <CollectionsPreview key={id} {...otherProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})
  
export default connect(mapStateToProps)(CollectionsOverview);