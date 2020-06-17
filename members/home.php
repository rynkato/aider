<?php

    include $_SERVER['DOCUMENT_ROOT'] . "/aider/assets/php/Aider.php";

    $Aider = new Aider();


?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no">

        <title><?php echo SITE_NAME; ?> | Home</title>

        <?php
            echo $Aider->getUI()->getBootstrapHead();
        ?>
    </head>

    <body class="bg-light">

        <!-- Header -->
        <div class="bg-primary" style="top: 0 !important; height: 40px;">
            <h5 class="pt-2 text-white text-uppercase text-center"><?php echo SITE_NAME; ?></h5>
        </div>

        <!-- Modal: First Time Login - Change Password -->
        <?php
            $Aider->getUI()->getDashboard()->getFirstTimePasswordChangeModal();
        ?>

        <!-- Main Content -->
        <div class="container">
            <div class="row">
                <div class="col-6 mt-5">
                    <span class="h3 text-black-50">Hi, <span class="h3 text-dark font-weight-bold" id="home-hello-name"></span></span>
                </div>
                <div class="col-6">
                    <div class="mt-5 text-right">
                        <span class="h6 text-black-50">RM <span class="h3 text-dark font-weight-bold" id="home-wallet-balance"></span></span>
                    </div>
                </div>
            </div>
        </div>

        <hr/>

        <div class="container">
            <div class="row">
                <div class="col-12 mt-3">
                    <a class="text-decoration-none" href="parcel.php">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-box mr-1"></i> Parcel</h5>
                                <p class="card-text">Need to deliver something to a friend?</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-12 mt-2 mb-3">
                    <a class="text-decoration-none" href="food.php">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-utensils mr-1"></i> Food</h5>
                                <p class="card-text">Feeling hungry? Grab a bite!</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <hr/>

        <div class="container mb-5">
            <div class="row">
                <div class="col-12">
                    <h6 class="text-center mb-3">Promotions</h6>
                </div>

                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center p-0 m-0">Promotion 1</h5>
                        </div>
                    </div>
                </div>

                <div class="col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center p-0 m-0">Promotion 2</h5>
                        </div>
                    </div>
                </div>

                <div class="col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center p-0 m-0">Promotion 3</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br/>

        <?php
            $Aider->getUI()->getDashboard()->getBottomNavigation(1);
        ?>

        <!-- START: Toast Messages Area -->
        <div class="toast-container">

        </div>
        <!-- END: Toast Messages Area -->


        <?php
            echo $Aider->getUI()->getBootstrapScripts();
        ?>
        <script src="../assets/js/Dashboard.js"></script>
        <script>

            $(document).ready(function() {
                getDashboardJS();
                getHomeDashboardJS();
            });

        </script>
    </body>

</html>