import React from 'react';

import CollectionsPreview from '../../components/collection-preview/collection-preview.component';
import SHOP_DATA from './shop.data.js';

import './shop.styles.scss';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections : SHOP_DATA
    };
  }

  render() {
    const {collections} = this.state;
    return(<div className='shop-page'>
      {
        collections.map( ({id, ...otherProps}) => (
          <CollectionsPreview key={id} {...otherProps} />
        ))
      }
      </div>
    )
  }
}

export default ShopPage;