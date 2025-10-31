export const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGE: 'SET_PAGE',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST',
};

const PAGE_SIZE = 6;

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      const shows = action.payload.map(item => ({ ...item.show, score: item.score }));
      
      return {
        ...state,
        loading: false,
        data: shows,
        currentPage: 1, 
        totalPages: Math.ceil(shows.length / PAGE_SIZE),
        error: null,
      };

    case ACTIONS.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload };

    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
      
    case ACTIONS.SET_PAGE:
      if (action.payload < 1 || action.payload > state.totalPages) {
        return state;
      }
      return { ...state, currentPage: action.payload };
      
    case ACTIONS.ADD_WATCHLIST:
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case ACTIONS.REMOVE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload.id),
      };

    case ACTIONS.CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };

    default:
      throw new Error(`Bilinmeyen aksiyon tipi: ${action.type}`);
  }
};

export const initialState = {
  data: [],            
  watchlist: [],       
  loading: false,      
  error: null,         
  query: 'friends',    
  filters: {           
    genre: '',
    language: '',
    minRating: 0,
  },
  currentPage: 1,      
  pageSize: PAGE_SIZE,
  totalPages: 1,     
};
