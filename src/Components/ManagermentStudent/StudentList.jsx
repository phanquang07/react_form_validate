import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentList extends Component {

  renderArrStudent = () => {
    return this.props.arrStudent.map((student) => {
      return <tr key={student.svId}>
        <td scope="row">{student.svId}</td>
        <td>{student.fName}</td>
        <td>{student.phone}</td>
        <td>{student.email}</td>
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
