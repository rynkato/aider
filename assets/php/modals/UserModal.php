<?php


class UserModal {

    function getAdminModal() {
        return new AdminModal();
    }

    function getCustomerModal() {
        return new CustomerModal();
    }

    function getRiderModal() {
        return new RiderModal();
    }

    function getParcelModal() {
        return new ParcelModal();
    }

    function getOrderModal() {
        return new OrderModal();
    }

    function getAiderDriverModal() {
        return new AiderDriver();
    }

    function getBillModal() {
        return new BillModal();
    }

    function getPromoModal() {
        return new PromoModal();
    }

    function getFoodModal() {
        return new FoodModal();
    }

}