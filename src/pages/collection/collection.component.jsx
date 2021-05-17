import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { selectCollection } from '../../redux/shop/shop.selectors';

import ColletionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const Collection = ({history, collection}) => {
  if(!collection) {
    history.push('/');
    return null;
  }
  
  const {title, items} = collection
  
  return (
  <div className='collection-page'>   
     <h2 className='title'>{title}</h2>
    <div className='items'>
    {
      items.map(item => <ColletionItem key={item.id} item={item}/>)
    }
    </div>
  </div>
)}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default withRouter(connect(mapStateToProps)(Collection));
