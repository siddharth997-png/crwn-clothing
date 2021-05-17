import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';

import { updateCollection } from '../../redux/shop/shop.actions';

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class ShopPage extends React.Component{
  state = {
    loading: true
  };
  unSubscribeFromSnapShot = null;

  componentDidMount() {
    const collectionsRef = firestore.collection('collections');
    const { updateCollection } = this.props
    collectionsRef.onSnapshot(async snapShot => {
      const collectionsArray = convertCollectionsSnapShotToMap(snapShot);
      updateCollection(collectionsArray)
       this.setState({loading: false});
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return ( 
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} render={
          props => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
      }/>
      <Route 
        path={`${match.path}/:collectionId`} 
        render={
          (props) => (<CollectionWithSpinner isLoading={loading} {...props} />)
        } />
    </div>
    )
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollection : collection => dispatch(updateCollection(collection))
})

export default connect(null, mapDispatchToProps)(ShopPage);