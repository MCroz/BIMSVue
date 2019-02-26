import Api from '@/Services/Api'
import axios from 'axios'

export default {
    login (data) {
        return Api().post('Login/InitialLogin',data);
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
}