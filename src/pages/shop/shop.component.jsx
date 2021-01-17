import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { shopCollectionsSelector } from '../../redux/shop/shop.selectors';

import CollectionsPreview from '../../components/collection-preview/collection-preview.component';

import './shop.styles.scss';

const ShopPage = ({ collections }) =>(
  <div className='shop-page'>
  {
    collections.map( ({id, ...otherProps}) => (
      <CollectionsPreview key={id} {...otherProps} />
    ))
  }
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: shopCollectionsSelector
})
  
export default connect(mapStateToProps)(ShopPage);