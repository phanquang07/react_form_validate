import React, { Component } from 'react'
import MSForm from './MSForm'
import StudentList from './StudentList'

export default class ManagermentStudent extends Component {
  render() {
    return (
      <div className="container pt-3">
        <h2>Quản lý sinh viên</h2>
        <MSForm />
        <StudentList />
      </div>
    )
  }
}
