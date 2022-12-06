import React, { Component } from "react";
import { connect } from "react-redux";

class StudentList extends Component {
  renderArrStudent = () => {
    let arrNewSV = this.props.arrSearch.length
      ? this.props.arrSearch
      : this.props.arrStudent;

    return arrNewSV.map((student) => {
      return (
        <tr key={student.sId}>
          <td scope="row">{student.sId}</td>
          <td>{student.sName}</td>
          <td>{student.sPhone}</td>
          <td>{student.sEmail}</td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                let action = {
                  type: "DETAIL_STUDENT",
                  detailStudent: student,
                };
                this.props.dispatch(action);
              }}
            >
              Chi tiết
            </button>
            <button
              className="btn btn-danger mx-1"
              onClick={() => {
                let action = {
                  type: "DELETE_STUDENT",
                  deleteStudent: student.sId,
                };
                this.props.dispatch(action);
              }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <form
          className="mt-5 mb-3 d-flex justify-content-end"
          onChange={(e) => {
            e.preventDefault();
            let action = {
              type: "SEARCH_STUDENT",
              keySearch: e.target.value,
            };
            this.props.dispatch(action);
          }}
        >
          <input
            className="form-control me-1 w-25"
            type="search"
            placeholder="Tìm kiếm sv"
            aria-label="Search"
          />
        </form>

        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>{this.renderArrStudent()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    arrStudent: rootReducer.MSReducer.arrStudent,
    arrSearch: rootReducer.MSReducer.arrSearch,
  };
};

export default connect(mapStateToProps)(StudentList);
