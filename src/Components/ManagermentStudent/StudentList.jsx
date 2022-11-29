import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentList extends Component {

  renderArrStudent = () => {
    return this.props.arrStudent.map((student) => {
      return <tr key={student.studentId}>
        <td scope="row">{student.studentId}</td>
        <td>{student.fName}</td>
        <td>{student.phone}</td>
        <td>{student.email}</td>
        <td>
          <button className="btn btn-info" onClick={() => {
            let action = {
              type: 'DETAIL_STUDENT',
              detailStudent: student
            }
            this.props.dispatch(action)
          }}>Chi tiết</button>
          <button className="btn btn-danger mx-1" onClick={() => {
            let action = {
              type: 'DELETE_STUDENT',
              deleteStudent: student.studentId
            }
            this.props.dispatch(action)
          }}>Xóa</button>
        </td>
      </tr>
    })
  }


  render() {
    return (
      <div className="table-responsive pt-5">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope='col'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {this.renderArrStudent()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state.MSReducer.arrStudent: ', state.MSReducer.arrStudent);
  return {
    arrStudent: state.MSReducer.arrStudent
  }
}

export default connect(mapStateToProps, null)(StudentList)
