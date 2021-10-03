const InitializedData = {
     movielist : [],
     error:[]
}

export const movieReducer = (state = InitializedData, {type,payload} ) => {
     switch (type) {
          case 'SET':
               return  {...state,movielist:payload}
          default:
               return state ;
     }
};
export const addReducer = (state = {}, {type,payload} ) => {
     switch (type) {
          case 'ADD':
               return  {...state,error:payload}
          default:
               return state ;
     }
};
