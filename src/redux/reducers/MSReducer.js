const initialState = {
  arrStudent: [
    {
      studentId: 'SV01',
      fName: 'Quang',
      phone: '0987654321',
      email: 'quang@gmail.com'
    },
  ],
  student: {
    values: {
      studentId: '',
      fName: '',
      phone: '',
      email: ''
    },
    errors: {
      studentId: '',
      fName: '',
      phone: '',
      email: ''
    }
  }
}

export const MSReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLECHANGE':
      state.student = action.student
      return { ...state }
    case 'ADD_STUDENT':
      state.arrStudent = [...state.arrStudent, action.student]
      return { ...state }
    case 'DELETE_STUDENT':
      state.arrStudent = state.arrStudent.filter((student) => student.studentId !== action.deleteStudent)
      return { ...state }
    default:
      return { ...state }
  }
}