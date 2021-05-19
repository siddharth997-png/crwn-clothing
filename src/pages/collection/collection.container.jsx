import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import Collection from './collection.component';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
  isLoading : state => !selectIsCollectionLoaded(state)
})

const CollectionContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Collection);

export default CollectionContainer;