import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IReview, IReviewMutation } from '../../types';

export const createReview = createAsyncThunk<void, IReviewMutation>(
  'reviews/createReview',
  async (reviewMutation) => {
    const formData = new FormData();

    const keys = Object.keys(reviewMutation) as (keyof IReviewMutation)[];

    keys.forEach((key) => {
      const value = reviewMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    })

    await axiosApi.post('/reviews', formData);
  }
);

export const fetchReviews = createAsyncThunk<IReview[], void>(
  'reviews/fetchReviews',
  async () => {
    const reviewsResponse = await axiosApi<IReview[]>('/reviews');
    return reviewsResponse.data || [];
  }
);