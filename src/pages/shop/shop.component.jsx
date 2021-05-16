import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import collection from '../collection/collection.component';

import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';

import { updateCollection } from '../../redux/shop/shop.actions';

import './shop.styles.scss';

class ShopPage extends React.Component{
  
  unSubscribeFromSnapShot = null;

  componentDidMount() {
    const collectionsRef = firestore.collection('collections');
    const { updateCollection } = this.props
    collectionsRef.onSnapshot(async snapShot => {
      const collectionsArray = convertCollectionsSnapShotToMap(snapShot);
      updateCollection(collectionsArray)
    })
  }

  render() {
    const { match } = this.props;
    return ( 
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview}/>
      <Route path={`${match.path}/:collectionId`} component={collection} />
    </div>
    )
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollection : collection => dispatch(updateCollection(collection))
})

export default connect(null, mapDispatchToProps)(ShopPage);