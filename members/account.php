<?php

    include $_SERVER['DOCUMENT_ROOT'] . "/aider/assets/php/Aider.php";

    $Aider = new Aider();


?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no">

        <title><?php echo SITE_NAME; ?> | Account</title>

        <?php
            echo $Aider->getUI()->getBootstrapHead();
        ?>

        <style>
            .pac-container {
                overflow-y: scroll;
                z-index: 9999;
            }
        </style>
    </head>

    <body class="bg-white">

        <div class="bg-light">

            <?php
                $Aider->getUI()->getDashboard()->getDashboardHeader();
            ?>

            <!-- Header -->
            <div class="container bg-light">
                <div class="row">
                    <div class="col-12 mt-3 mb-4">
                        <h3 class="font-weight-bold">Account</h3>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal: First Time Login - Change Password -->
        <?php
            $Aider->getUI()->getDashboard()->getFirstTimePasswordChangeModal();
        ?>

        <!-- Change Email Modal -->
        <div class='modal fade' id="change-email-modal" tabindex='-1' role='dialog' aria-labelledby='changeEmailModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-lg'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='changeEmailModalLabel'>Account > Change Email</h5>
                    </div>
                    <div class='modal-body'>
                        <form method='post'>
                            <div class='form-group'>
                                <label for='chg-email' class='col-form-label'>New Email:</label>
                                <input type='email' class='form-control' name='chg-email' id='chg-email'>
                            </div>
                        </form>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-primary' id='chg-email-btn'>Change Email</button>
                    </div>
                </div>

                <!-- START: Toast Messages Area -->
                <div class="toast-container-modal" style="z-index: 9999;">

                </div>
                <!-- END: Toast Messages Area -->
            </div>
        </div>

        <!-- Change Password Modal -->
        <div class='modal fade' id="change-pass-modal" tabindex='-1' role='dialog' aria-labelledby='changePasswordModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-lg'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='changePasswordModalLabel'>Account > Change Password</h5>
                    </div>
                    <div class='modal-body'>
                        <form method='post'>
                            <div class='form-group'>
                                <label for='chg-pass' class='col-form-label'>New Password:</label>
                                <input type='password' class='form-control' name='chg-pswd' id='chg-pass'>
                            </div>
                            <div class='form-group'>
                                <label for='chg-confirm-pass' class='col-form-label'>Confirm New Password:</label>
                                <input type='password' class='form-control' name='chg-confirm-pswd' id='chg-confirm-pass'>
                            </div>
                        </form>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-primary' id='chg-pass-btn'>Change Password</button>
                    </div>
                </div>

                <!-- START: Toast Messages Area -->
                <div class="toast-container-modal" style="z-index: 9999;">

                </div>
                <!-- END: Toast Messages Area -->
            </div>
        </div>

        <!-- Change Phone Number Modal -->
        <div class='modal fade' id="change-num-modal" tabindex='-1' role='dialog' aria-labelledby='changeNumModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-lg'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='changeNumModalLabel'>Account > Change Phone Number</h5>
                    </div>
                    <div class='modal-body'>
                        <form method='post'>
                            <div class='form-group'>
                                <label for='chg-num' class='col-form-label'>New Phone Number (e.g. 0122233445):</label>
                                <input type='text' class='form-control' name='chg-num' id='chg-num'>
                            </div>
                        </form>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-primary' id='chg-num-btn'>Change Phone Number</button>
                    </div>
                </div>

                <!-- START: Toast Messages Area -->
                <div class="toast-container-modal" style="z-index: 9999;">

                </div>
                <!-- END: Toast Messages Area -->
            </div>
        </div>

        <!-- Set Home Address Modal -->
        <div class='modal fade' id="set-home-address" tabindex='-1' role='dialog' aria-labelledby='setHomeModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-lg'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='setHomeModalLabel'>Account > Set Home Address</h5>
                    </div>
                    <div class='modal-body'>
                        <form method='post'>
                            <div class='form-group'>
                                <label for='current-home' class='col-form-label'>Your Current Address:</label>
                                <input type='text' class='form-control' name='current-home' id='current-home' disabled>
                            </div>
                            <div class='form-group'>
                                <label for='set-home' class='col-form-label'>Enter Your Address:</label>
                                <input type='text' class='form-control' name='set-home' id='set-home'>
                            </div>
                        </form>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-primary' id='set-home-btn'>Set Home Address</button>
                    </div>
                </div>

                <!-- START: Toast Messages Area -->
                <div class="toast-container-modal" style="z-index: 9999;">

                </div>
                <!-- END: Toast Messages Area -->
            </div>
        </div>


        <!-- Main Content -->
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h4 class="font-weight-bold mt-4 text-dark" id="user-name"></h4>
                </div>
                <div class="col-6">
                    <h6 class="mt-4 float-right text-black-50" id="user-balance">RM <span class="h4 font-weight-bold text-dark" id="wallet-balance">0.00</span></h6>
                </div>
            </div>
        </div>

        <hr/>

        <div class="container mt-5">
            <a class="text-decoration-none" data-toggle="modal" data-target="#change-email-modal">
                <div class="row">
                    <div class="col-12">
                        <span class="h6 text-black-50">Change Email</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <a class="text-decoration-none" data-toggle="modal" data-target="#change-pass-modal">
                <div class="row">
                    <div class="col-12">
                        <span class="h6 text-black-50">Change Password</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <a class="text-decoration-none" data-toggle="modal" data-target="#change-num-modal">
                <div class="row">
                    <div class="col-12">
                        <span class="h6 text-black-50">Change Phone Number</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <div class="mt-5"></div>

            <a class="text-decoration-none" data-toggle="modal" data-target="#set-home-address">
                <div class="row">
                    <div class="col-12">
                        <span class="h6 text-primary">Set Home Address</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <a class="text-decoration-none" href="mailto:info@aider.my">
                <div class="row">
                    <div class="col-12">
                        <span class="h6" style="color: #000 !important;">Contact Support</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <a class="text-decoration-none" id="logout">
                <div class="row">
                    <div class="col-12">
                        <span class="h6 text-danger">Logout</span>
                        <i class="fas fa-chevron-right text-black-50 float-right"></i>
                    </div>
                </div>
            </a>

            <hr/>

            <br/>
            <br/>
            <br/>

            <!-- START: Toast Messages Area -->
            <div class="toast-container" style="z-index: 9999;">

            </div>
            <!-- END: Toast Messages Area -->
        </div>

        <?php
            $Aider->getUI()->getDashboard()->getBottomNavigation(3);
        ?>




        <?php
            echo $Aider->getUI()->getBootstrapScripts();
        ?>
        <script src="../assets/js/Dashboard.js"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo MAP_API_KEY; ?>&libraries=places&callback=initMap"></script>
        <script>
            function initMap() {
                let home, autocompleteHome;

                home = document.getElementById('set-home');
                autocompleteHome = new google.maps.places.Autocomplete(home);
                autocompleteHome.setComponentRestrictions({'country': ['my']});
            }

            $(document).ready(function() {
                getDashboardJS();
                getAccountDashboardJS();
            });

        </script>
    </body>

</html>