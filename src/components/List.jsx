import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import customFunc from '../customFunction/myCustom'

class List extends Component {
    componentDidMount() {
        const {userID} = this.props.params;
        const {data, navigate} = this.props;
        let newArr = [];
        for (let item of data) {
            newArr = [...newArr, item.masv];
        }
        if(!newArr.includes(Number(userID))){
            navigate("/");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.params.userID !== this.props.params.userID) {
            const {userID} = this.props.params;
            const {data, navigate} = this.props;
            let newArr = [];
            for (let item of data) {
                newArr = [...newArr, item.masv];
            }
            if(!newArr.includes(Number(userID))){
                navigate("/");
            }
        }
    }

    searchResult = () => {
        const {data, search} = this.props;
        let searchRes = [];
        if(search !== "") {
            searchRes = data.filter(item => item.hoten.toLowerCase().indexOf(search) !== -1);
        }
        return searchRes;
    }

    width = index => {
        if(index === 0 || index === 2) {
            return "10%";
        }
        return "23%";
    }

    showItems = () => {
        const {data, search, params} = this.props;
        let searchRes = [];
        let mainData = [];
        if(search !== "") {
            searchRes = data.filter(item => item.hoten.toLowerCase().indexOf(search) !== -1);
            if(searchRes.length === 0) {
                return <tr><td colSpan={5}>Không tìm thấy kết quả nào.</td></tr>;
            }
            else {
                mainData = searchRes;
            }
        }
        else {
            mainData = data;
            if(mainData.length === 0) {
                return <tr><td colSpan={5}>Chưa có ai ở đây.</td></tr>;
            }
        }
        return (mainData.map((item, index) => {
            return <Item key={index} item={item} edittingUser={Number(params.userID)} />
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

export default connect(mapStateToProps)(customFunc(List))

