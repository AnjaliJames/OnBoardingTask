﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import StoreCreate from './StoreCreate.jsx';
import StoreUpdate from './StoreUpdate.jsx';
import StoreDelete from './StoreDelete.jsx';

export default class StoreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            StoreId: '',
            StoreName: '',
            StoreAddress: '',

            showUpdateModel: false,
            updateId: 0,

            Sucess: [],
            errors: {}
        };

        this.loadData = this.loadData.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);

        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    //Get Stores
    loadData() {

        $.ajax({
            url: "/Stores/GetStores",
            type: "GET",
            success: function (data) {
                this.setState({
                    StoreList: data
                })
            }.bind(this)
        });
    }

    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Stores/GetUpdateStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({
                    StoreId: data.Id,
                    StoreName: data.Name,
                    StoreAddress: data.Address
                })
            }.bind(this)
        });

    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'Id': this.state.StoreId, 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };

            $.ajax({
                url: "/Stores/UpdateStore",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });
        }
    }

    //Delete    
    handleDelete(id) {

        this.setState({
            showDeleteModal: true
        });
        this.setState({
            deleteId: id
        });
    }

    closeDeleteModal() {
        this.setState({

            showDeleteModal: false
        });
        window.location.reload()
    }
    

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.StoreName) {
            formIsValid = false;
            errors['StoreName'] = '*Please enter the Store Name.';
        }

        if (typeof this.state.StoreName !== "undefined") {
            if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["StoreName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.StoreAddress) {
            formIsValid = false;
            errors['StoreAddress'] = '*Please enter the Store Address'
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }

    

    render() {
        let list = this.state.StoreList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(stores =>
                <tr key={stores.Id}>
                    <td className="four wide">{stores.Name}</td>
                    <td className="four wide">{stores.Address}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, stores.Id)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, stores.Id)}><i className="trash icon"></i>DELETE</Button>
                    </td>
                </tr>

            )

        }

        return (
            <React.Fragment>
                <div><Button primary onClick={this.showCreateModel}>New Store</Button></div>

                <StoreCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

                <br></br>
                <div>
                    <StoreUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel} Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress} errors={this.state.errors} />

                    <StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

                   
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="four wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="four wide">Actions</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}