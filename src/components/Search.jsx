import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAction } from '../redux/actions/userActions';
import customFunc from '../customFunction/myCustom';

export class Search extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         value: ""
      }
    }

    inputChangeHandle = e => {
        let {value} = e.target;
        value = value.trim().toLowerCase();
        this.setState({
            value
        });
    }

    submitHandle = e => {
        e.preventDefault();
        const {params, navigate} = this.props;
        if(params.userID) {
            navigate("/");
        }
        const {value} = this.state;
        const action = searchAction(value);
        this.props.dispatch(action);
    }
    render() {
        return (
        <div>
            <h1>
                Tìm kiếm
            </h1>
            <form onSubmit={this.submitHandle}>
                <div className="row">
                    <div className="col-11">
                        <input type="text" className="form-control" placeholder="Nhập họ và tên!" onChange={this.inputChangeHandle} />
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary">
                            Tìm
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(customFunc(Search))