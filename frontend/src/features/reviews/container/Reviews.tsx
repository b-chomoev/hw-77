import React, { useEffect, useState } from 'react';
import { IReviewMutation } from '../../../types';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { createReview, fetchReviews } from '../reviewsThunks.ts';
import { toast } from 'react-toastify';
import { selectCreateLoading, selectFetchLoading, selectReviews } from '../reviewsSlice.ts';
import Spinner from '../../../components/Spinner/Spinner.tsx';
import { apiUrl } from '../../../globalConstants.ts';

const initialState = {
  author: '',
  message: '',
  image: null,
};

const Reviews = () => {
  const [form, setForm] = useState<IReviewMutation>(initialState);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);
  const isFetchReviewsLoading = useAppSelector(selectFetchLoading);
  const isCreateLoading = useAppSelector(selectCreateLoading);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.message) {
      toast.error('Message is required');
      return;
    }

    await dispatch(createReview(form));
    setForm(initialState);
    toast.success('Product was successfully created!');
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <>
      {isCreateLoading ? <Spinner/> :
        <form className='mt-2' onSubmit={onSubmitForm}>
          <div className='d-flex justify-content-evenly align-items-center'>
            <div className='col-3'>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                className="form-control"
                name="author"
                value={form.author}
                onChange={onChangeHandler}
              />
            </div>

            <div className='ms-3 col-4'>
              <label htmlFor="message">Review:</label>
              <textarea
                id="message"
                className="form-control"
                name="message"
                value={form.message}
                onChange={onChangeHandler}
              />
            </div>

            <div className='col-4'>
              <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler}/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add Review</button>
        </form>
      }

      <hr/>

      <h2>Guest's Reviews</h2>
      {isFetchReviewsLoading ? <Spinner/> :
        <>
          {reviews.length === 0  && !isFetchReviewsLoading ? <h4>No reviews yet</h4> :
            <>
              {reviews.map(review => (
                <div key={review.id} className='card mt-2 mb-2 border-opacity-25 border-black shadow'>
                  <div className='card-body'>
                    <h5 className='card-title'>Author: {review.author}</h5>
                    <p className='card-text'>Message: {review.message}</p>
                    {review.image && <img src={apiUrl + '/' + review.image} alt={review.image} className='w-25 '/>}
                  </div>
                </div>
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Reviews;