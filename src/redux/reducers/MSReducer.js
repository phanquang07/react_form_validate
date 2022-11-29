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
    case 'HANDLE_CHANGE':
      state.student = action.student
      return { ...state }
    case 'ADD_STUDENT':
      if (state.student.studentId == action.addStudent.studentId) {
        alert('Mã sv k được trùng')
      } else {
        state.arrStudent = [...state.arrStudent, action.addStudent]
      }
      return { ...state }
    case 'DETAIL_STUDENT':
      state.student.values = action.detailStudent
      state.student = { ...state.student }
      return { ...state }
    case 'UPDATE_STUDENT':
      state.arrStudent = state.arrStudent.filter((student) => student.studentId === action.updateStudent.studentId)
      return { ...state }
      case 'DELETE_STUDENT':
      state.arrStudent = state.arrStudent.filter((student) => student.studentId !== action.deleteStudent)
      return { ...state }
    default:
      return { ...state }
  }
}