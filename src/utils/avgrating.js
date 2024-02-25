export default function getAverageRating(ratings){
  if (ratings.length === 0) {
    return 0;
  }
  const totalReviewCount = ratings.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);
  const avgReviewCount=Math.round(totalReviewCount/ratings?.length);
  return avgReviewCount;
};
