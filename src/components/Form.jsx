import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addNewUserAction } from '../redux/actions/userActions';


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
            if(key === "masv"){
                continue;
            }
            if(value[key] === "" || errors[key] !== ""){
                return false; 
            }
        }
        return true; //true === pass
    }

    submitHandle = e => {
        e.preventDefault();
        if(this.checkValid()) {
            const action = addNewUserAction(this.state.value);
            this.props.dispatch(action);
        }
    }

     //lấy id tự động
     randomId = maxNumber => {
        let getRandomId = number => {
            let randomId = Math.floor(Math.random() * number);
            return randomId;
        }
        //lấy số random
        let id = getRandomId(maxNumber);
        while (id.length < 11) {
            id = getRandomId(maxNumber);
        }
        return id;
    }

    randomInfo = e => {
        let fetch = axios({
            url: "https://randomuser.me/api/",
            method: "GET",
            dataType: "JSON"
        });
        fetch.then(res => {
            let {results} = res.data;
            results = results[0];
            this.setState({
                value: {
                    hoten: results.name.first + " " + results.name.last,
                    sdt: this.randomId(9999999999),
                    email: results.email
                },
                valid: true
            });
        });
        fetch.catch(error => {
            console.log(error);
        })
    }

    render() {
        let {formConfig} = this.props;
        return (
        <div>
            <h1>
                Thêm sinh viên mới <button className="btn btn-info mx-2" onClick={this.randomInfo}>
                            Random info
                        </button>
            </h1>
            <form onSubmit={this.submitHandle}>
                <div className="row">
                    {formConfig.id.map((item, index) => {
                        return <div className="form-group col-md-6" key={index}>
                                <label htmlFor="form-id">{formConfig.title[index]}:</label>
                                <input
                                disabled={index === 0 ? true : false} 
                                defaultValue={this.state.value[item]}
                                placeholder={index === 0 ? "Được lấy tự động" : undefined}
                                data-id={item} 
                                className={`form-control ${this.state.errors[item] ? "is-invalid" : undefined}`}
                                onChange={this.keychangeHandle}/>
                                {this.state.errors[item] ? <div className="invalid-feedback">{this.state.errors[item]}</div> : undefined}
                            </div>
                    })}
                </div>
                <button type="submit" className="btn btn-primary my-2" disabled={!this.checkValid()}>
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