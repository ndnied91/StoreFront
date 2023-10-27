// //cart store
// import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

// const cart = localStorage.getItem('cart');

// const jsoned = JSON.parse(cart);

// const defaultState = {
//   cartItems: [],
//   numItemsInCart: 0,
//   cartTotal: 0,
//   shipping: 500,
//   tax: 0,
//   orderTotal: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: JSON.parse(cart) || defaultState,
//   // initialState: defaultState,
//   reducers: {
//     addItem: (state, action) => {
//       const { product } = action.payload;
//       //if product matches any product in the cart, just update the count
//       const item = state.cartItems.find((i) => i.cartID === product.cartID); //item in cart
//       if (item) {
//         item.amount = item.amount + product.amount;
//       } else {
//         //if not then just add it to the cart
//         // item doesn't exist, just add it to the cart
//         state.cartItems.push(product);
//       }

//       state.numItemsInCart += parseInt(product.amount);
//       state.cartTotal += product.price * product.amount;
//       state.tax = 0.07 * state.cartTotal;
//       state.orderTotal = state.cartTotal + state.shipping + state.tax;
//       localStorage.setItem('cart', JSON.stringify(state)); //adds to local storage
//       toast.success('Item added to cart');

//       //set up totals, set up order total
//     },
//     clearCart: (state) => {
//       state;
//     },
//     removeItem: (state, actino) => {
//       state;
//     },
//     editItem: (state, action) => {
//       state;
//     },
//   },
// });

// export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

// export default cartSlice.reducer;

//cart store
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  // initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      //if product matches any product in the cart, just update the count
      const item = state.cartItems.find((i) => i.cartID === product.cartID); //item in cart
      if (item) {
        item.amount = item.amount + parseInt(product.amount);
      } else {
        //if not then just add it to the cart
        // item doesn't exist, just add it to the cart
        state.cartItems.push(product);
      }

      state.numItemsInCart += parseInt(product.amount);
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state); //calling a reducer within a reducer
      toast.success('Item added to cart');

      //set up totals, set up order total
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState; //resets the value
    },
    removeItem: (state, action) => {
      //pass in cartID , used to remove item
      const { cartID } = action.payload;
      //find item in cart

      const product = state.cartItems.find((i) => i.cartID === cartID);

      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      //subtract from totals
      state.numItemsInCart -= parseInt(product.amount);
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state); //calling a reducer within a reducer
      toast.success('Item successfully removed from cart');
    },
    editItem: (state, action) => {
      //get item , get updated value
      const { cartID, amount } = action.payload;

      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = 0.07 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state)); //adds to local storage
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
