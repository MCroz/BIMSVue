import Api from '@/Services/Api'
import axios from 'axios'
import store from '../store'
import Backbone from 'backbone'

export default {
    login (params) {
        return Api().post('Login/InitialLogin',params.data)
        .then(params.success)
        .catch(params.error);
    },
    login1 (data) {
        return axios({
            method: 'post',
            url: 'http://localhost:6513/api/Login/InitialLogin',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json'
            }
          });
    },
    addResident (params) {
        return Api().post('Residents/AddResident',params.data)
        .then(params.success)
        .catch(params.error);
    },
    updateResident (params) {
        return Api().post('Residents/UpdateResident',params.data)
        .then(params.success)
        .catch(params.error);
    },
    getStockList (params) {
        return Api().get('Stocks/GetStocksList')
        .then(params.success)
        .catch(params.error);
    },
    getMedicineStockList (params) {
        return Api().get('Stocks/GetMedicineStocks/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    addMedicine (params) {
        return Api().post('Medicines/AddMedicine', params.data)
        .then(params.success)
        .catch(params.error);
    },
    addStock (params) {
        return Api().post('Stocks/AddStock', params.data)
        .then(params.success)
        .catch(params.error);
    },
    getMedicinesListDropdown (params) {
        return Api().get('Medicines/GetMedicinesListDropdown' )
        .then(params.success)
        .catch(params.error);
    },
    getResidents (params) {
        return Api().get('Residents/GetResidentList' )
        .then(params.success)
        .catch(params.error);
    },
    getIndigencyTransactions (params) {
        return Api().get('Print/GetUserIndigencyTransactions/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    getBarangayClearanceTransactions (params) {
        return Api().get('Print/GetUserBarangayClearanceTransactions/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    getBusinessOwners (params) {
        return Api().get('Owner/GetOwnerList')
        .then(params.success)
        .catch(params.error);
    },
    deleteOwner (params) {
        return Api().get('Owner/DeleteOwner/' + params.data)
        .then(params.success)
        .catch(params.error);
    },
    addOwner (params) {
        return Api().post('Owner/AddOwner', params.data)
        .then(params.success)
        .catch(params.error);
    }, //updateOwner
    getOwnerInfo (params) {
        return Api().get('Owner/GetOwnerInfo/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    updateOwner (params) {
        return Api().post('Owner/UpdateOwner', params.data)
        .then(params.success)
        .catch(params.error);
    },
    getBusinessList (params) {
        return Api().get('Business/GetBusinessList')
        .then(params.success)
        .catch(params.error);
    },
    getBusinessClearanceListById (params) {
        return Api().get('Print/GetBusinessPrintHistory/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    getBusinessInfo (params) {
        return Api().get('Business/GetBusinessInfo/' + params.data )
        .then(params.success)
        .catch(params.error);
    },
    // addBusinessClearance (params) {
    //     return Api().post('Print/GenerateBusinessClearanceTransaction', params.data)
    //     .then(params.success)
    //     .catch(params.error);
    // },
    addBusinessClearance (params) {
        let userList = Backbone.Model.extend({
            url: store.state.endpointUrl + "Print/GenerateBusinessClearanceTransaction"
        });

        let UserList = new userList();
        return UserList.save(params.data,{
            success: params.success,
            error: params.error
        });
        // return Api().post('Print/GenerateBusinessClearanceTransaction', params.data)
        // .then(params.success)
        // .catch(params.error);
    },
    residentPrintTransaction (params) {
        return Api().post('Print/InitialPrint', params.data)
        .then(params.success)
        .catch(params.error);
    },
    getDispenseMedicineStockList (params) {
        return Api().get('Dispense/GetMedicineStocksList')
        .then(params.success)
        .catch(params.error);
    },
    getBlotterList (params) {
        return Api().get('Blotter/GetBlotterList')
        .then(params.success)
        .catch(params.error);
    },
    addBlotter (params) {
        return Api().post('Blotter/AddBlotter', params.data)
        .then(params.success)
        .catch(params.error);
    },
    updateBlotter (params) {
        return Api().post('Blotter/UpdateBlotter', params.data)
        .then(params.success)
        .catch(params.error);
    },
    getBlotterInfo (params) {
        return Api().get('Blotter/GetBlotterInfo/' + params.data)
        .then(params.success)
        .catch(params.error);
    },
}