import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteAction, updateAction } from '../redux/actions/userActions';
import withRouter from "../router/withRouter"

class Item extends Component {
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
        const {formConfig} = this.props;
        const id = e.target.getAttribute("data-id");
        const value = e.target.value;

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
        const {value, errors} = this.state;
        for (let key in value) {
            if(value[key] === "" || errors[key] !== ""){
                return false; 
            }
        }
        return true; //true === pass
    }

    deleteHandle = () => {
        const {masv} = this.props.item;
        const action = deleteAction(masv);
        this.props.dispatch(action);
    }

    editHandle = () => {
        const editingUser = {...this.props.item};
        this.setState({
            value: editingUser
        });
    }

    cancelHandle = () => {
        const editingUser = {...this.props.item};
        this.setState({
            value: editingUser
        });
        this.props.navigate("/");
    }

    confirmHandle = () => {
        if(this.checkValid() && this.anyChange()) {
            const data = {...this.state.value};
            const action = updateAction(data);
            this.props.dispatch(action);
            this.props.navigate("/");
        }
    }

    showButton = () => {
        const {item, params} = this.props;
        if(item.masv == params.userID) {
            return <><button className="btn btn-light" onClick={e => {
                this.cancelHandle();
            }}>
                Hủy
            </button>
            <button className="btn btn-primary mx-2" onClick={this.confirmHandle} disabled={this.checkValid() && this.anyChange() ? false : true}>
                OK
            </button></>
        }
        return <><button className="btn btn-danger" onClick={e => {
            this.deleteHandle();
        }}>
            Xóa
        </button>
        <Link to={`/edit/${item.masv}`} className="btn btn-success mx-2" onClick={this.editHandle}>Sửa</Link></>
    }

    showInfo = (id, value) => {
        const {item, params} = this.props;
        if(item.masv == params.userID && id !== "masv") {
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
            this.confirmHandle();
        }
        else if(e.key === "Esc") {
            this.cancelHandle();
        }
    }

    anyChange = () => {
        const {item} = this.props;
        const {value} = this.state;
        for (let key in item) {
            if(item[key] !== value[key]) {
                return true; //true === co thay doi === pass
            }
        }
        return false;
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
    formConfig: state.formConfig
});

export default connect(mapStateToProps)(withRouter(Item));
