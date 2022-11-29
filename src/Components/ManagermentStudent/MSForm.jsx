import React, { Component } from 'react'
import { connect } from 'react-redux'

class MSForm extends Component {

  handleInputChange = (e) => {
    let { name, value } = e.target
    let newValues = { ...this.props.student.values, [name]: value }
    // console.log("newValues: ", newValues);

    let newErrors = { ...this.props.student.errors }
    let errorsMsg = ''

    // Validate
    if (value.trim() == '') {
      errorsMsg = `${name} không được để trống !`
    }

    let typeVal = e.target.getAttribute('typeinput')
    if (typeVal == 'svEmail') {
      const svRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!svRegex.test(value)) {
        errorsMsg = 'Email không hợp lệ !'
      }
    }

    newErrors[name] = errorsMsg

    // Đẩy value và errors từ form lên redux
    let action = {
      type: "HANDLE_CHANGE",
      student: {
        values: newValues,
        errors: newErrors
      }
    }
    this.props.dispatch(action)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra lỗi k?
    // + Nếu có => hiển thị lỗi
    // + Nếu không => đẩy lên redux
    let isValid = true

    //B1: Check lỗi
    let newValues = this.props.student.values
    let newErrors = this.props.student.errors
    for (const key in newValues) {
      if (newValues[key] == '') {
        isValid = false
        break
      }
    }
    for (const key in newErrors) {
      if (newErrors[key] != '') {
        isValid = false
        break
      }
    }
    if (!isValid) {
      alert('Dữ liệu không hợp lệ, mời bạn nhập lại')
      return
    }

    //B2: đẩy data lên redux
    let action = {
      type: 'ADD_STUDENT',
      addStudent: newValues
    }
    this.props.dispatch(action)
  }
  
  render() {
    // console.log('value student: ', this.props.student.values);
    // let { studentId, fName, phone, email } = this.props.student.values
    return (
      <form action="" id='email' className='mt-4 row row-cols-2' onSubmit={(e) => {
        this.handleSubmit(e)
      }}>
        <div className="mb-3">
          <label htmlFor='studentId' className="form-label">Mã SV</label>
          <input type="text" className="form-control" id='studentId' name='studentId' aria-describedby="helpId" placeholder="Nhập mã SV" value={this.props.student.values.studentId}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.studentId}</p>
        </div >
        <div className="mb-3">
          <label htmlFor='fName' className="form-label">Họ tên</label>
          <input type="text" className="form-control" id='fName' name='fName' aria-describedby="helpId" placeholder="Nhập họ tên" value={this.props.student.values.fName}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.fName}</p>
        </div>
        <div className="mb-3">
          <label htmlFor='phone' className="form-label">SĐT</label>
          <input type="text" className="form-control" id='phone' name='phone' aria-describedby="helpId" placeholder="Nhập sđt" value={this.props.student.values.phone}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.phone}</p>
        </div>
        <div className="mb-3">
          <label htmlFor='email' className="form-label">Email</label>
          <input type="text" typeinput="svEmail" className="form-control" id='email' name='email' aria-describedby="helpId" placeholder="Nhập email" value={this.props.student.values.email}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.email}</p>
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Thêm SV</button>
          <button className="btn btn-warning mx-1" onClick={(student) => {
            let action = {
              type: 'UPDATE_STUDENT',
              updateStudent: this.props.student.values
            }
            this.props.dispatch(action)
          }}>Cập nhật</button>
        </div>
      </form >
    )
  }

}
// Kết nối redux: đưa state của reducer lưu vào props của component
// state là store tổng truy xuất đến reducer con (MSReducer)
const mapStateToProps = (state) => {
  return {
    student: state.MSReducer.student // tạo ra props cho component
  }
}

export default connect(mapStateToProps, null)(MSForm)
