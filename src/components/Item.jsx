import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Item extends Component {
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
                return false; 
            }
        }
        return true; //true === pass
    }

    deleteHandle = () => {
        const {masv} = this.props.item;
        const action = {
            type: "XOA_SV",
            payload: masv
        }
        this.props.dispatch(action);
    }

    editHandle = () => {
        const editingUser = {...this.props.item};
        const action = {
            type: "SV_DANG_SUA",
            payload: editingUser
        };
        this.props.dispatch(action);
        this.setState({
            value: editingUser
        });
    }

    cancelHandle = () => {
        const editingUser = {...this.props.item};
        this.setState({
            value: editingUser
        });
        const action = {
            type: "SV_DANG_SUA",
            payload: {}
        };
        this.props.dispatch(action);
        
    }

    okHandle = () => {
        if(this.checkValid()) {
            const data = {...this.state.value};
            const action_2 = {
                type: "SV_DANG_SUA",
                payload: {}
            }
            this.props.dispatch(action_2);
            const action = {
                type: "SUA_SV",
                payload: data
            };
            this.props.dispatch(action);
        }
    }

    showButton = () => {
        let {item, updateUser} = this.props;
        if(updateUser.masv === item.masv) {
            return <><button className="btn btn-light" onClick={e => {
                this.cancelHandle();
            }}>
                Hủy
            </button>
            <button className="btn btn-primary mx-2" onClick={this.okHandle} disabled={!this.checkValid()}>
                OK
            </button></>
        }
        else {
            return <><button className="btn btn-danger" onClick={e => {
                this.deleteHandle();
            }}>
                Xóa
            </button>
            <button className="btn btn-success mx-2" onClick={this.editHandle}>
                Sửa
            </button></>
        }
    }

    showInfo = (id, value) => {
        let {item, updateUser} = this.props;
        if(item.masv === updateUser.masv && id !== "masv") {
            return <input 
            type="text" 
            className={`form-control ${this.state.errors[id] ? "is-invalid" : undefined}`} 
            defaultValue={value} 
            data-id={id}
            onChange={this.keychangeHandle}
            onKeyUp={this.enterHandle} />
        }
        return value;
    }

    enterHandle = e => {
        if(e.key === "Enter") {
            this.okHandle();
        }
    }

    render() {
        const {formConfig, item} = this.props;
        return (
            <tr>
                {formConfig.id.map((i, index) => {
                    return <td key={index}>
                        {this.showInfo(i, item[i])}
                        {this.state.errors[i] ? <div className="invalid-feedback">{this.state.errors[i]}</div> : undefined}
                    </td>
                    
                })}
                <td>
                    {this.showButton()}
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => ({
    updateUser: state.updateUser,
    formConfig: state.formConfig
});

export default connect(mapStateToProps)(Item)