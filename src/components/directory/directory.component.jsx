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
          imageUrl: 'hats.png',
          id: 1,
          link: 'hats'
        },
        {
          title: 'jackets',
          imageUrl: 'jackets.png',
          id: 2
        },
        {
          title: 'sneakers',
          imageUrl: 'sneakers.png',
          id: 3
        },
        {
          title: 'womens',
          imageUrl: 'womens.png',
          size: 'large',
          id: 4
        },
        {
          title: 'mens',
          imageUrl: 'men.png',
          size: 'large',
          id: 5
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
