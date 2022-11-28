import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Search extends Component {
    inputChangeHandle = e => {
        let {value} = e.target;
        value = value.trim().toLowerCase();
        const action = {
            type: "TIM_KIEM_USER",
            payload: value
        }
        this.props.dispatch(action);
        const action_2 = {
            type: "SV_DANG_SUA",
            payload: {}
        }
        this.props.dispatch(action_2);
    }
    render() {
        return (
        <div>
            <h1>
                Tìm kiếm
            </h1>
            <input type="text" className="form-control" placeholder="Nhập họ và tên!" onChange={this.inputChangeHandle} />
        </div>
        )
    }
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(Search)