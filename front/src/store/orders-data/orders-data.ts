import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OrderData} from '../../types/state';
import {fetchCoachOrders, fetchCountOrders, fetchUserOrder, fetchUserOrders, postOrder, reduceOrder} from '../api-actions';

const initialState: OrderData = {
  orders: [],
  isOrdersDataLoading: false,
  order: null,
  isOrdersUserDataLoading: false,
  isOrderDataLoading: false,
  hasError: false,
  hasErrorPost: false,
  isPostLoading: false,
  hasErrorReduce: false,
  countOrders: 0
};


export const ordersData = createSlice({
  name: NameSpace.DataOrders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoachOrders.pending, (state) => {
        state.isOrdersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCoachOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersDataLoading = false;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.isOrdersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCountOrders.fulfilled, (state, action) => {
        state.countOrders = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isOrdersUserDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersUserDataLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isOrdersUserDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchUserOrder.pending, (state) => {
        state.isOrderDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isOrderDataLoading = false;
      })
      .addCase(fetchUserOrder.rejected, (state) => {
        state.isOrderDataLoading = false;
        state.hasError = true;
      })
      .addCase(postOrder.pending, (state, action) => {
        state.hasErrorPost = false;
        state.isPostLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.hasErrorPost = false;
        state.isPostLoading = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.hasErrorPost = true;
        state.isPostLoading = false;
      })
      .addCase(reduceOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) => order.id === updatedOrder.id ? updatedOrder : order);
        state.hasErrorReduce = false;
      })
      .addCase(reduceOrder.rejected, (state) => {
        state.hasErrorReduce = true;
      });
  }
});
