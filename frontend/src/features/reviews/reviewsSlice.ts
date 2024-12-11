import { IReview } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createReview } from './reviewsThunks.ts';


interface IReviewState {
  reviews: IReview[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IReviewState = {
  reviews: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectFetchLoading = (state: RootState) => state.reviews.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.reviews.createLoading;

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createReview.rejected, (state) => {
        state.createLoading = false;
      })
  }
});

export const reviewsReducer = reviewsSlice.reducer;