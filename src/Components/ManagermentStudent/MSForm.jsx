import React, { Component } from "react";
import { connect } from "react-redux";

class MSForm extends Component {
  constructor(props) {
    super(props);
    this.sIdRefVal = React.createRef();
    this.sNameRefVal = React.createRef();
    this.sPhoneRefVal = React.createRef();
    this.sEmailRefVal = React.createRef();

    this.sIdRefErr = React.createRef();
    this.sNameRefErr = React.createRef();
    this.sPhoneRefErr = React.createRef();
    this.sEmailRefErr = React.createRef();

    this.errIdRef = React.createRef();
    this.errNameRef = React.createRef();
    this.errPhoneRef = React.createRef();
    this.errEmailRef = React.createRef();
    this.btnAddRef = React.createRef();
    this.btnUpdateRef = React.createRef();
  }

  handleInputChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...this.props.student.values, [name]: value };

    let newErrors = { ...this.props.student.errors };
    let errorsMsg = "";

    // Validate
    let typeVal = e.target.getAttribute("typeinput");
    if (typeVal === "sId") {
      let isDuplicateId = false;
      isDuplicateId = this.props.arrStudent.some(
        (student) => student.sId === value.replaceAll(" ", "")
      );
      if (value.trim() === "") {
        errorsMsg = `Mã sinh viên không được để trống !`;
      } else if (isDuplicateId) {
        errorsMsg = "Mã sinh viên đã tồn tại";
      }
    } else if (typeVal === "sName") {
      let nameRegex =
        "^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
      if (value.trim() === "") {
        errorsMsg = `Tên sinh viên không được để trống !`;
      } else if (!value.match(nameRegex)) {
        errorsMsg = "Tên sinh viên phải bằng chữ";
      }
    } else if (typeVal === "sPhone") {
      let phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

      if (value.trim() == "") {
        errorsMsg = `Số điện thoại không được để trống !`;
      } else if (!phoneRegex.test(value)) {
        errorsMsg = "Số điện thoại không hợp lệ !";
      }
    } else if (typeVal === "sEmail") {
      let isDuplicateEmail = false;
      isDuplicateEmail = this.props.arrStudent.some(
        (student) => student.sEmail === value.replaceAll(" ", "")
      );
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value.trim() == "") {
        errorsMsg = `Email không được để trống !`;
      } else if (!emailRegex.test(value)) {
        errorsMsg = "Email không đúng định dạng !";
      } else if (isDuplicateEmail) {
        errorsMsg = "Email đã được tồn tại";
      }
    }
    newErrors[name] = errorsMsg;

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

    // Kiểm tra lỗi
    // + Nếu có => hiển thị lỗi
    // + Nếu không => đẩy lên redux
    let isValid = true;

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

    this.resetForm();
  };

  resetForm = () => {
    this.props.student.values = "";
    this.props.student.errors = "";

    this.sIdRefVal.current.value = "";
    this.sNameRefVal.current.value = "";
    this.sPhoneRefVal.current.value = "";
    this.sEmailRefVal.current.value = "";

    this.sIdRefErr.current.innerHTML = "";
    this.sNameRefErr.current.innerHTML = "";
    this.sPhoneRefErr.current.innerHTML = "";
    this.sEmailRefErr.current.innerHTML = "";

    this.sIdRefVal.current.disabled = false;
    this.btnAddRef.current.style.display = "inline-block";
    this.btnUpdateRef.current.style.display = "none";
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
            ref={this.sIdRefVal}
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
          <p ref={this.sIdRefErr} id="text-errors" className="text-danger">
            {this.props.student.errors.sId}
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="sName" className="form-label">
            Họ tên
          </label>
          <input
            type="text"
            typeinput="sName"
            ref={this.sNameRefVal}
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
          <p ref={this.sNameRefErr} id="text-errors" className="text-danger">
            {this.props.student.errors.sName}
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="sPhone" className="form-label">
            SĐT
          </label>
          <input
            type="text"
            typeinput="sPhone"
            ref={this.sPhoneRefVal}
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
          <p ref={this.sPhoneRefErr} id="text-errors" className="text-danger">
            {this.props.student.errors.sPhone}
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="sEmail" className="form-label">
            Email
          </label>
          <input
            type="text"
            typeinput="sEmail"
            ref={this.sEmailRefVal}
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
          <p ref={this.sEmailRefErr} id="text-errors" className="text-danger">
            {this.props.student.errors.sEmail}
          </p>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-success"
            id="btn-add-student"
            type="submit"
            ref={this.btnAddRef}
          >
            Thêm SV
          </button>
          <button
            style={{ display: "none" }}
            type="button"
            ref={this.btnUpdateRef}
            id="btn-update-student"
            className="btn btn-warning"
            onClick={(e) => this.handleSubmit(e, "UPDATE_STUDENT")}
          >
            Cập nhật
          </button>
          <div
            className="btn btn-secondary btn-cancel-update mx-1"
            ref={this.cancelRef}
            onClick={() => {
              this.resetForm();
            }}
          >
            Hủy
          </div>
        </div>
      </form>
    );
  }
}
// Kết nối redux: đưa state của reducer lưu vào props của component
// state là store tổng truy xuất đến reducer con (MSReducer)
const mapStateToProps = (rootReducer) => {
  return {
    // tạo ra props cho component
    student: rootReducer.MSReducer.student,
    arrStudent: rootReducer.MSReducer.arrStudent,
  };
};

export default connect(mapStateToProps)(MSForm);
