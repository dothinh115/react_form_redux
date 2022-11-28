import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         value: {
            masv: "",
            hoten: "",
            sdt: "",
            email: ""
         },
         errors: {
            masv: "",
            hoten: "",
            sdt: "",
            email: ""
         },
         valid: false
      }
    }

    reg = [
        /^[0-9]+$/, 
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
        /^[0-9]+$/,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ];

    keychangeHandle = e => {
        let {formConfig} = this.props;
        let id = e.target.getAttribute("data-id");
        let value = e.target.value;

        let newValue = this.state.value;
        let newError = this.state.errors;
        
        let messErr = "";
        if(value === "") {
            messErr = "Không được để trống!";
        }
        else {
            for (let key in formConfig.id) {
                switch(id) {
                    case formConfig.id[key]: {
                        if(!value.match(this.reg[key])) {
                            messErr = formConfig.title[key] + formConfig.messageError[key];
                        }
                    }
                }
            }
        }

        newError[id] = messErr;
        newValue[id] = value;

        this.setState({
            value: newValue,
            errors: newError
        }, () => {
            this.setState({
                valid: this.checkValid()
            });
        });
    }

    checkValid = () => {
        let {value, errors} = this.state;
        for (let key in value) {
            if(value[key] === "" || errors[key] !== ""){
                if(value["masv"] === "") {
                    return true;
                }
                return false; 
            }
        }
        return true; //true === pass
    }

    submitHandle = e => {
        e.preventDefault();
        if(this.checkValid()) {
            const action = {
                type: "THEM_SV_MOI",
                payload: this.state.value
            }
            this.props.dispatch(action);
        }
    }

    render() {
        let {formConfig} = this.props;
        return (
        <div>
            <h1>
                Thêm sinh viên mới
            </h1>
            <form onSubmit={this.submitHandle}>
                <div className="row">
                    {formConfig.id.map((item, index) => {
                        return <div className="form-group col-md-6" key={index}>
                                <label htmlFor="form-id">{formConfig.title[index]}:</label>
                                <input
                                disabled={index === 0 ? true : false} 
                                placeholder={index === 0 ? "Được lấy tự động" : undefined}
                                data-id={item} 
                                className={`form-control ${this.state.errors[item] ? "is-invalid" : undefined}`}
                                onChange={this.keychangeHandle}/>
                                {this.state.errors[item] ? <div className="invalid-feedback">{this.state.errors[item]}</div> : undefined}
                            </div>
                    })}
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    Thêm
                </button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    formConfig: state.formConfig
});


export default connect(mapStateToProps)(Form)