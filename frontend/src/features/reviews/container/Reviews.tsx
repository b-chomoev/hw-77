import React, { useState } from 'react';
import { IReviewMutation } from '../../../types';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useAppDispatch } from '../../../app/hooks.ts';
import { createReview } from '../reviewsThunks.ts';
import { toast } from 'react-toastify';

const initialState = {
  author: '',
  message: '',
  image: null,
};

const Reviews = () => {
  const [form, setForm] = useState<IReviewMutation>(initialState);
  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <>
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
      <hr/>
      <h1>Reviews</h1>
    </>
  );
};

export default Reviews;