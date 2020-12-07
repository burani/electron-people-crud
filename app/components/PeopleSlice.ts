import { createSlice } from '@reduxjs/toolkit';
import { peopleAPI } from '../api';

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [],
    isLoaded: false,
    page: 0,
    totalPages: 1,
    pageSize: 25,
    totalPeople: 0,
    selectedPerson: null,
  },
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload.paginatedPeople;
      state.totalPages = Math.floor(
        action.payload.totalPeople / state.pageSize
      );
      state.totalPeople = action.payload.totalPeople;
      state.isLoaded = true;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.totalPages = Math.ceil(state.people.length / state.pageSize);
    },
    setLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setTotalPeople: (state, action) => {
      state.totalPeople = action.payload;
    },
  },
});

export const {
  setPeople,
  setPage,
  setPageSize,
  setLoaded,
  setSelectedPerson,
  setTotalPeople,
} = peopleSlice.actions;

export default peopleSlice.reducer;

// thunks
export const fetchPeople = (page, pageSize) => async (dispatch) => {
  const res = await peopleAPI.getPeople(page, pageSize);
  // debugger;
  console.log(res.data);
  dispatch(
    setPeople({
      paginatedPeople: res.data,
      totalPeople: res.headers['x-total-count'],
    })
  );
};

// export const selectCount = (state: RootState) => state.counter.value;
