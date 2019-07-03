import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import ProductCreate from './ProductCreate.jsx';
import ProductDelete from './ProductDelete.jsx';
import ProductUpdate from './ProductUpdate.jsx';

export default class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ProductList: [],
            Success: { Data: '' },

            showDeleteModal: false,
            deleteId: 0,

            showCreateModel: false,

            ProductId: '',
            ProductName: '',
            ProductPrice: '',

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

    //Get Product
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        $.ajax({
            url: "/Products/GetProducts",
            type: "GET",
            success: function (data) {
                this.setState({
                    ProductList: data
                })
            }.bind(this)
        });
    }

    // CREATE
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

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Products/GetUpdateProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ ProductId: data.Id, ProductName: data.Name, ProductPrice: data.Price })
            }.bind(this)
        });

    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    onUpdateSubmit() {
        if (this.validateForm()) {

            let data = { 'Id': this.state.ProductId, 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

            $.ajax({
                url: "/Products/UpdateProduct",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });
        }
    }

    validateForm() {

        let errors = {}

        let formIsValid = true
        if (!this.state.ProductName) {
            formIsValid = false;
            errors['CustomerName'] = '*Please enter the Product Name.';
        }

        if (!this.state.ProductPrice) {
            formIsValid = false;
            errors['ProductPrice'] = '*Please enter the Product Price'
        }

        if (typeof this.state.ProductPrice !== "undefined") {
            if (!this.state.ProductPrice.match(/^\d+(\.\d{1,2})?$/)) {
                formIsValid = false;
                errors["ProductPrice"] = "*Please enter numbers only.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid
    }
    

    render() {

        let list = this.state.ProductList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(products =>
                <tr key={products.Id}>
                    <td className="four wide">{products.Name}</td>
                    <td className="four wide">{products.Price}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, products.Id)}><i className="edit icon"></i>EDIT</Button>
                    </td>

                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, products.Id)}><i className="trash icon"></i>DELETE</Button>
                    </td>
                </tr>

            )
            
        }
        

            return (
                <React.Fragment>
                    <div><Button primary onClick={this.showCreateModel}>New Product</Button></div>

                    <ProductCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

                    <br></br>
                    <div>

                        <ProductUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel} Id={this.state.ProductId} Name={this.state.ProductName} Price={this.state.ProductPrice} errors={this.state.errors} />

                        <ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

                        <table className="ui striped table">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Price</th>
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