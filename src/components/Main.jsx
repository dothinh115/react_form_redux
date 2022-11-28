import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import List from './List'
import Search from './Search'

class Main extends Component {
    componentDidMount() {
        this.getLocalStorage();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.setLocalStorage();
        }
    }

    setLocalStorage = () => {
        let data = JSON.stringify(this.props.data);
        localStorage.setItem("dataSV", data);
    }

    getLocalStorage = () => {
        let data = localStorage.getItem("dataSV");
        if(data) {
            const action = {
                type: "LOAD_DATA",
                payload: JSON.parse(data)
            }
            this.props.dispatch(action);
        }
    }

    render() {
        return (
            <div className='container mt-5'>
                <Form />
                <Search />
                <List />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    formConfig: state.formConfig,
    data: state.data
});


export default connect(mapStateToProps)(Main)