import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAction } from '../redux/actions/userActions';

export class Search extends Component {
    inputChangeHandle = e => {
        let {value} = e.target;
        value = value.trim().toLowerCase();
        const action = searchAction(value);
        this.props.dispatch(action);
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