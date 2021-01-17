import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'hats',
          imageUrl: 'images/hats.png',
          id: 1,
          link: 'shop/hats'
        },
        {
          title: 'jackets',
          imageUrl: 'images/jackets.png',
          id: 2,
          link: 'shop/jackets'
        },
        {
          title: 'sneakers',
          imageUrl: 'images/sneakers.png',
          id: 3,
          link: 'shop/sneakers'
        },
        {
          title: 'womens',
          imageUrl: 'images/womens.png',
          size: 'large',
          id: 4,
          link: 'shop/womens'
        },
        {
          title: 'mens',
          imageUrl: 'images/men.png',
          size: 'large',
          id: 5,
          link: 'shop/mens'
        }
      ]
    };
  }

  render() {
    return (
      <div className='directory-menu'>
        {this.state.sections.map(({ id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
