export interface IReview {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface IReviewMutation {
  author: string;
  message: string;
  image: File | null;
}