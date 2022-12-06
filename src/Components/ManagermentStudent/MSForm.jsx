import React, { Component } from "react";
import { connect } from "react-redux";

class MSForm extends Component {
  handleInputChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...this.props.student.values, [name]: value };

    let newErrors = { ...this.props.student.errors };
    let errorsMsg = "";

    // Validate
    let typeVal = e.target.getAttribute("typeinput");
    if (typeVal === "sId") {
      let isExist = false;
      // isExist = this.props.arrStudent.some((student) => student.sId === value.replaceAll(' ', ''))
      console.log("isExist: ", isExist);
      if (value.trim() == "") {
        errorsMsg = `Mã sinh viên không được để trống !`;
      } else if (isExist) {
        errorsMsg = "Mã sinh viên đã tồn tại";
        return false;
      }
    } else if (typeVal === "sName") {
      let nameRegex =
        "^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
      if (value.trim() == "") {
        errorsMsg = `Tên sinh viên không được để trống !`;
      } else if (!value.match(nameRegex)) {
        errorsMsg = "Tên sinh viên phải bằng chữ";
      }
    } else if (typeVal === "sPhone") {
      let phoneRegex = /^[0-9]+$/;

      if (value.trim() == "") {
        errorsMsg = `Só điênh thoại không được để trống !`;
      } else if (!phoneRegex.test(value)) {
        errorsMsg = "Số điện thoại không hợp lệ !";
      }
    } else if (typeVal === "sEmail") {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value.trim() == "") {
        errorsMsg = `Email không được để trống !`;
      } else if (!emailRegex.test(value)) {
        errorsMsg = "Email không đúng định dạng !";
      }
    }

    newErrors[name] = errorsMsg;

    // Đẩy value và errors từ form lên redux
    let action = {
      type: "HANDLE_CHANGE",
      student: {
        values: newValues,
        errors: newErrors,
      },
    };
    this.props.dispatch(action);
  };

  handleSubmit = (e, type = "ADD_STUDENT") => {
    e.preventDefault();

    // Kiểm tra lỗi k?
    // + Nếu có => hiển thị lỗi
    // + Nếu không => đẩy lên redux
    let isValid = true;

    //B1: Check lỗi
    let newValues = this.props.student.values;
    let newErrors = this.props.student.errors;
    for (const key in newValues) {
      if (newValues[key] === "") {
        isValid = false;
        break;
      }
    }
    for (const key in newErrors) {
      if (newErrors[key] !== "") {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("Dữ liệu không hợp lệ, mời bạn nhập lại");
      return;
    }

    let action = {
      type,
      studentAU: this.props.student.values,
    };
    this.props.dispatch(action);

    let resetForm = document.querySelectorAll(".input-student");
    console.log("resetForm: ", resetForm);
    for (let i = 0; i < resetForm.length; i++) {
      resetForm[i].value = "";
    }
  };

  render() {
    return (
      <form
        action=""
        id="student-form"
        className="mt-4 row row-cols-2"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="sId" className="form-label">
            Mã SV
          </label>
          <input
            type="text"
            typeinput="sId"
            className="form-control input-student"
            id="sId"
            name="sId"
            aria-describedby="helpId"
            placeholder="Nhập mã SV"
            value={this.props.student.values.sId}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
            onBlur={(e) => {
              this.handleInputChange(e);
            }}
          />
          <p className="text-danger">{this.props.student.errors.sId}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="sName" className="form-label">
            Họ tên
          </label>
          <input
            type="text"
            typeinput="sName"
            className="form-control input-student"
            id="sName"
            name="sName"
            aria-describedby="helpId"
            placeholder="Nhập họ tên"
            value={this.props.student.values.sName}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
            onBlur={(e) => {
              this.handleInputChange(e);
            }}
          />
          <p className="text-danger">{this.props.student.errors.sName}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="sPhone" className="form-label">
            SĐT
          </label>
          <input
            type="text"
            typeinput="sPhone"
            className="form-control input-student"
            id="sPhone"
            name="sPhone"
            aria-describedby="helpId"
            placeholder="Nhập sđt"
            value={this.props.student.values.sPhone}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
            onBlur={(e) => {
              this.handleInputChange(e);
            }}
          />
          <p className="text-danger">{this.props.student.errors.sPhone}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="sEmail" className="form-label">
            Email
          </label>
          <input
            type="text"
            typeinput="sEmail"
            className="form-control input-student"
            id="sEmail"
            name="sEmail"
            aria-describedby="helpId"
            placeholder="Nhập Email"
            value={this.props.student.values.sEmail}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
            onBlur={(e) => {
              this.handleInputChange(e);
            }}
          />
          <p className="text-danger">{this.props.student.errors.sEmail}</p>
        </div>
        <div className="mb-3">
          <button className="btn btn-success" id="btn-add-student" type="submit">
            Thêm SV
          </button>
          <button
            style={{ display: 'none' }}
            type="button"
            id="btn-update-student"
            className="btn btn-warning mx-1"
            onClick={(e) => this.handleSubmit(e, "UPDATE_STUDENT")}
          >
            Cập nhật
          </button>
        </div>
      </form>
    );
  }
}
// Kết nối redux: đưa state của reducer lưu vào props của component
// state là store tổng truy xuất đến reducer con (MSReducer)
const mapStateToProps = (rootReducer) => {
  return {
    student: rootReducer.MSReducer.student, // tạo ra props cho component
  };
};

export default connect(mapStateToProps)(MSForm);
