import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Item extends Component {
    deleteHandle = masv => {
        const action = {
            type: "XOA_SV",
            payload: masv
        }
        this.props.dispatch(action);
    }

    render() {
        let {item} = this.props;
        return (
        <tr>
            <td>
                {item.masv}
            </td>
            <td>
                {item.hoten}
            </td>
            <td>
                {item.sdt}
            </td>
            <td>
                {item.email}
            </td>
            <td>
                <button className="btn btn-danger" onClick={e => {
                    this.deleteHandle(item.masv);
                }}>
                    Xóa
                </button>
            </td>
        </tr>
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Item)