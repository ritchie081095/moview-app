export const addMovie = (items) => {
  return {
       type:'ADD',
       payload:items
  };
};
export const setMovies = (items) => {
  return {
       type:'SET',
       payload:items
  };
};