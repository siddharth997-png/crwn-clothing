const INITIAL_STATE = {
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

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    default: return state;
  }
}

export default directoryReducer;