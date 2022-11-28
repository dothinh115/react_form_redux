import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

export class List extends Component {
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.search) {
    //         this.searchResult();
    //     }
    // }

    searchResult = () => {
        const {data, search} = this.props;
        let searchRes = data.filter(item => item.hoten.toLowerCase().indexOf(search) !== -1);
        return searchRes;
    }

    width = index => {
        if(index === 0 || index === 2) {
            return "10%";
        }
        return "20%";
    }

    showItems = () => {
        const {data} = this.props;
        let mainData = data;
        if(this.searchResult().length === 0) {
            return <tr><td colSpan={4}>Không có kết quả trùng khớp</td></tr>;
        }
        else {
            mainData = this.searchResult();
        }
        return (mainData.map((item, index) => {
            return <Item key={index} item={item} />
        }));
    }

    render() {
        const {formConfig} = this.props;
        return (
        <div className="mt-5">
            <h1>
                DANH SÁCH SINH VIÊN
            </h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        {formConfig.id.map((item, index) => {
                            return (
                                <th 
                                key={index} 
                                colSpan={index === 3 ? "2" : undefined}
                                width={this.width(index)}
                                >
                                    {formConfig.title[index]}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.showItems()}
                </tbody>
            </table>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    formConfig: state.formConfig,
    search: state.search
});


export default connect(mapStateToProps)(List)