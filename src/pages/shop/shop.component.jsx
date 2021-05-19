import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class ShopPage extends React.Component{

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;
    return ( 
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} render={
          props => <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} {...props}/>
      }/>
      <Route 
        path={`${match.path}/:collectionId`} 
        render={
          (props) => (<CollectionWithSpinner isLoading={!isCollectionsLoaded} {...props} />)
        } />
    </div>
    )
  }
} 

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded : selectIsCollectionLoaded 
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(ShopPage);