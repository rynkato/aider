<?php

date_default_timezone_set("Asia/Kuala_Lumpur");

DEFINE("ROOT_DIR", "/aider");

// Defines
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/settings/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/settings/General.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/settings/Messages.php';

// Modals
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/AdminModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/CustomerModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/RiderModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/ParcelModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/OrderModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/UserModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/AiderDriver.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/BillModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/PromoModal.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/modals/FoodModal.php';

// UI
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/ui/Alerts.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/ui/Dashboard.php';
include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/ui/UI.php';

include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/DatabaseHandler.php';

include_once $_SERVER['DOCUMENT_ROOT'] . ROOT_DIR . '/assets/php/credentials/Credentials.php';

class Aider {

    function __construct() {

    }

    function getAlerts() {
        return new Alerts();
    }

    function getUI() {
        return new UI();
    }

    function getDatabaseHandler() {
        return new DatabaseHandler();
    }

    function getCredentials() {
        return new Credentials();
    }

    function getUserModal() {
        return new UserModal();
    }



}