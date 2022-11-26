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
      alert('Dữ liệu không hợp lệ !')
      return
    }

    //B2: đẩy data lên redux
    let action = {
      type: 'ADD_STUDENT',
      student: newValues
    }
    this.props.dispatch(action)
  }


  render() {
    console.log('value student: ', this.props.student.values);
    let { svId, fName, phone, email } = this.props.student.values
    return (
      <form action="" id='email' className='mt-4 row row-cols-2' onSubmit={(e) => {
        this.handleSubmit(e)
      }}>
        <div className="mb-3">
          <label htmlFor='svId' className="form-label">Mã SV</label>
          <input type="text" className="form-control" id='svId' name='svId' aria-describedby="helpId" placeholder="Nhập mã SV" value={svId}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.svId}</p>
        </div >
        <div className="mb-3">
          <label htmlFor='fName' className="form-label">Họ tên</label>
          <input type="text" className="form-control" id='fName' name='fName' aria-describedby="helpId" placeholder="Nhập họ tên" value={fName}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.fName}</p>
        </div>
        <div className="mb-3">
          <label htmlFor='phone' className="form-label">SĐT</label>
          <input type="text" className="form-control" id='phone' name='phone' aria-describedby="helpId" placeholder="Nhập sđt" value={phone}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.phone}</p>
        </div>
        <div className="mb-3">
          <label htmlFor='email' className="form-label">Email</label>
          <input type="text" typeinput="svEmail" className="form-control" id='email' name='email' aria-describedby="helpId" placeholder="Nhập email" value={email}
            onChange={(e) => {
              this.handleInputChange(e)
            }}
            onBlur={(e) => { this.handleInputChange(e) }} />
          <p className="text-danger">{this.props.student.errors.email}</p>
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Thêm SV</button>
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
