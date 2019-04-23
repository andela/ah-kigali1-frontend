import { LIKE_ARTICLE, DISLIKE_ARTICLE } from "../actionTypes";

export const handleLike = () => ({ type: LIKE_ARTICLE });

export const handleDislike = () => ({ type: DISLIKE_ARTICLE });
