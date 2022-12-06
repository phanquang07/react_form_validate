const initialState = {
  arrStudent: [
    {
      sId: 'SV01',
      sName: 'Quang',
      sPhone: '0987654321',
      sEmail: 'quang@gmail.com'
    },
    {
      sId: 'SV02',
      sName: 'Thinh',
      sPhone: '0123456789',
      sEmail: 'thinh@gmail.com'
    },
  ],
  student: {
    values: {
      sId: '',
      sName: '',
      sPhone: '',
      sEmail: ''
    },
    errors: {
      sId: '',
      sName: '',
      sPhone: '',
      sEmail: ''
    }
  },
  arrSearch: []
}

export const MSReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_CHANGE':
      state.student = action.student
      return { ...state }
    case 'ADD_STUDENT':
      if (action.studentAU.sId == state.arrStudent.sId) {
        alert('Mã sinh viên đã tồn tại')
      }
      state.arrStudent = [...state.arrStudent, action.studentAU]
      return { ...state }
    case 'DETAIL_STUDENT':
      document.getElementById("btn-update-student").style.display = "inline-block" 
      document.getElementById("btn-add-student").style.display = "none"
      document.getElementById('sId').disabled = true
      state.student.values = action.detailStudent
      state.student.errors = ''
      state.student = { ...state.student }
      return { ...state }
    case 'UPDATE_STUDENT':
      let studentIndex = state.arrStudent.findIndex((student) => student.sId === action.studentAU.sId)
      console.log('studentIndex: ', studentIndex);
      if (studentIndex !== -1) {
        state.arrStudent[studentIndex] = action.studentAU
      } else {
        alert('Không tìm thấy sv cần cập nhật')
      }
      state.arrStudent = [...state.arrStudent]
      return { ...state }
    case 'DELETE_STUDENT':
      state.arrStudent = state.arrStudent.filter((student) => student.sId !== action.deleteStudent)
      return { ...state }
    case 'SEARCH_STUDENT':
      if (action.keySearch) {
        let searchName = state.arrStudent.filter((student) => student.sName.toLowerCase().includes((action.keySearch).toLowerCase().trim()))
        state.arrSearch = searchName;
      } else {
        state.arrSearch = []
      }
      return { ...state }
    default:
      return state
  }
}