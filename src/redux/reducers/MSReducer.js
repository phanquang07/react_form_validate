const initialState = {
  arrStudent: [],
  student: {
    values: {
      svId: '',
      fName: '',
      phone: '',
      email: ''
    },
    errors: {
      svId: '',
      fName: '',
      phone: '',
      email: ''
    }
  }
}

export const MSReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_CHANGE':
      state.student = action.student
      return { ...state }
    case 'ADD_STUDENT':
      state.arrStudent = [...state.arrStudent, action.student]
      return { ...state }
    default:
      return { ...state }
  }
}