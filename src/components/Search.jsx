import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAction } from '../redux/actions/userActions';
import withRouter from '../router/withRouter';

export class Search extends Component {
    inputChangeHandle = e => {
        const {params, navigate} = this.props;
        if(params) {
            navigate("/");
        }
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


export default connect(mapStateToProps)(withRouter(Search))