export interface IReview {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export type ReviewMutation = Omit<IReview, 'id'>;