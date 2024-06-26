/* START: Dashboard */
function getAdminHomeDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        $.ajax({
            url: '../assets/php/ajax/admin/getAdminData.php',
            method: 'POST',
            cache: false,
            data: {User_Email: user_email, User_Info: "Name"},
            success: function(data) {
                $('#admin-home-hello-name').html(data.split(" ", 1));
            }
        });

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        $('#Start_Date').prop('max', today);
        $('#End_Date').prop('max', today);

        let startInputDate = null;

        $('#Start_Date').on('change', function() {
            startInputDate = $('#Start_Date').val();
            $('#End_Date').prop('min', startInputDate);
        });

        $('#End_Date').on('change', function() {
            if(startInputDate !== null) {
                console.log(startInputDate);

            }
        });

        $('#push_btn').on('click', function() {
            $.ajax({
                url: '../assets/php/ajax/admin/pushMessage.php',
                method: 'POST',
                cache: false,
                data: {title: $('#push_title').val(), body: $('#push_body').val(), url: $('#push_url').val()},
                success: function(data) {
                    $('#push-modal').modal('toggle');

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Push Message", Message: "Message has been sent to the Push Service."},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });
                }
            });
        });
    }
}

function getCashOutDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Waiting List
        $.ajax({
            url: "../assets/php/ajax/admin/getCashOutRequests.php",
            method: "POST",
            cache: false,
            success: function (data) {
                $('#waiting-list-container').html(data);
            }
        });


    }
}

function getReportDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Get Report
        $.ajax({
            url: "../assets/php/ajax/admin/getReports.php",
            method: "POST",
            cache: false,
            success: function (data) {
                $('#report-container').html(data);
            }
        });
    }
}

function getWaitingListDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Waiting List
        $.ajax({
            url: "../assets/php/ajax/admin/getWaitingList.php",
            method: "POST",
            cache: false,
            success: function(data){
                $('#waiting-list-container').html(data);
            }
        });

        // Approve Rider from Waiting List
        $('#approve-btn').unbind().click(function() {
            let emailApprove = $('#approve_email').html();

            // Approve Rider & Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/admin/approveRider.php",
                method: "POST",
                cache: false,
                data: {User_Email: emailApprove, V_Model: $('#v_model').val(), V_Plate_Num: $('#v_plate_num').val(), Rider_Type: $('#rider_type').val()},
                success: function(dataMsg) {
                    $('#riderApproval').modal('toggle');

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Approval Status for " + emailApprove, Message: dataMsg},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });

                    // Update Waiting List
                    $.ajax({
                        url: "../assets/php/ajax/admin/getWaitingList.php",
                        method: "POST",
                        cache: false,
                        success: function(dataWL){
                            $('#waiting-list-container').html(dataWL);
                        }
                    });
                }
            });
        });
        // Approve Rider from Waiting List
    }
}

let selectedRestaurant = -1, selectedItem = -1;
function getFoodDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Restaurant List
        $.ajax({
            url: "../assets/php/ajax/admin/getRestaurantList.php",
            method: "POST",
            cache: false,
            success: function(data){
                $('#restaurant-container').html(data);
            }
        });

        // Add Restaurant Button
        $('#add-restaurant-btn').unbind().on('click', function() {
            // Add Restaurant & Display Toast Message

            let formData = new FormData($('#add-restaurant-form')[0]);
            formData.append('r_cat_val', $('#r_cat').val());

            $.ajax({
                url: "../assets/php/ajax/admin/addRestaurant.php",
                method: "POST",
                cache: false,
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    $('#addRestaurant').modal('toggle');

                    let dataMsg = "";

                    if(data === "OK") {
                        dataMsg = "The restaurant has been added successfully";
                    } else {
                        dataMsg = "There was an issue while adding the restaurant: " + data;
                    }

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Manage Restaurants", Message: dataMsg},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });

                    // Display Restaurant List
                    $.ajax({
                        url: "../assets/php/ajax/admin/getRestaurantList.php",
                        method: "POST",
                        cache: false,
                        success: function(data){
                            $('#restaurant-container').html(data);
                        }
                    });
                }
            });
        });
        // Add Restaurant Button

        // Add Menu Item
        $('#add-menu-item-btn').unbind().on('click', function() {

            let formData = new FormData($('#add-menu-item-form')[0]);
            formData.append('m_id', selectedRestaurant);
            formData.append('m_cat_edited', $('#m_cat').val());

            // Add Menu Item & Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/admin/addMenuItem.php",
                method: "POST",
                cache: false,
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    $('#addMenuItem').modal('toggle');

                    let dataMsg = "";

                    if(data === "OK") {
                        dataMsg = "The item has been added successfully.";
                    } else {
                        dataMsg = "There was an issue while adding the item: " + data;
                    }

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Manage Menu", Message: dataMsg},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });

                    // Display Menu List
                    $.ajax({
                        url: "../assets/php/ajax/admin/getMenuList.php",
                        method: "POST",
                        cache: false,
                        data: {ID: selectedRestaurant},
                        success: function(data){
                            $('#menu-container').html(data);
                        }
                    });
                }
            });
        });
        // Add Menu Item

        // Update Restaurant
        $('#edit-restaurant-btn').unbind().on('click', function() {

            let formData = new FormData($('#edit-restaurant-form')[0]);
            formData.append('r_id_edit', selectedRestaurant);
            formData.append('r_cat_edited', $('#r_cat_edit').val());

            // Add Restaurant & Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/admin/updateRestaurant.php",
                method: "POST",
                cache: false,
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    $('#editRestaurant').modal('toggle');

                    let dataMsg = "";

                    dataMsg = "The restaurant has been updated successfully.";

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Manage Menu", Message: dataMsg},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });

                    // Display Menu List
                    $.ajax({
                        url: "../assets/php/ajax/admin/getRestaurantList.php",
                        method: "POST",
                        cache: false,
                        success: function(data){
                            $('#restaurant-container').html(data);
                        }
                    });
                }
            });
        });
        // Update Restaurant

        // Update Menu Item
        $('#edit-menu-item-btn').unbind().on('click', function() {

            let formData = new FormData($('#edit-menu-item-form')[0]);
            formData.append('m_id_edit', selectedItem);
            formData.append('m_cat_edited', $('#m_cat_edit').val());

            // Add Restaurant & Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/admin/updateMenuItem.php",
                method: "POST",
                cache: false,
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    console.log(data);
                    $('#editMenuItem').modal('toggle');

                    let dataMsg = "";

                    dataMsg = "The menu has been updated successfully.";

                    // Display Toast Message
                    $.ajax({
                        url: "../assets/php/ajax/ui/sendToastMessage.php",
                        method: "POST",
                        cache: false,
                        data: {Title: "Manage Menu", Message: dataMsg},
                        success: function(dataToast){
                            $('.toast-container').html(dataToast);
                            $('.toast').toast('show');

                            setTimeout(function() {
                                $('.toast-container').html("");
                            }, 5000);
                        }
                    });

                    // Display Menu List
                    $.ajax({
                        url: "../assets/php/ajax/admin/getMenuList.php",
                        method: "POST",
                        cache: false,
                        data: {ID: selectedRestaurant},
                        success: function(data){
                            $('#menu-container').html(data);
                        }
                    });
                }
            });
        });
        // Update Menu Item

        // Search Restaurants
        $('#restaurant-search').on('input', function() {
            if($('#restaurant-search').val().length < 3) {
                $.ajax({
                    url: "../assets/php/ajax/admin/getRestaurantList.php",
                    method: "POST",
                    cache: false,
                    success: function(data){
                        $('#restaurant-container').html(data);
                    }
                });
            } else {
                $('#restaurant-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                    "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                    "                <h6 class=\"font-weight-bold mt-4\">Searching for Restaurants...</h6>\n" +
                    "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                    "            </div>");

                setTimeout(function(){
                    $.ajax({
                        url: "../assets/php/ajax/admin/getRestaurantListSearch.php",
                        method: "POST",
                        cache: false,
                        data: {Search_Args: $('#restaurant-search').val()},
                        success: function(data){
                            $('#restaurant-container').html(data);
                        }
                    });
                }, 1000);
            }
        });
        // Search Restaurants

        // Search Menu Item
        $('#menu-search').on('input', function() {
            console.log(1);
            if($('#menu-search').val().length < 3) {
                $.ajax({
                    url: "../assets/php/ajax/admin/getMenuList.php",
                    method: "POST",
                    cache: false,
                    data: {ID: selectedRestaurant},
                    success: function(data){
                        $('#menu-container').html(data);
                    }
                });
            } else {
                $('#menu-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                    "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                    "                <h6 class=\"font-weight-bold mt-4\">Searching for Menu Items...</h6>\n" +
                    "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                    "            </div>");

                setTimeout(function(){
                    $.ajax({
                        url: "../assets/php/ajax/admin/getMenuListSearch.php",
                        method: "POST",
                        cache: false,
                        data: {ID: selectedRestaurant, Search_Args: $('#menu-search').val()},
                        success: function(data){
                            $('#menu-container').html(data);
                        }
                    });
                }, 1000);
            }
        });
        // Search Menu Item

    }
}

let selectedCategory = -1;
function getCategoryDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Promotions
        $.ajax({
            url: "../assets/php/ajax/admin/getCategoryList.php",
            method: "POST",
            cache: false,
            data: {Type: "R"},
            success: function(data){
                $('#r-category-container').html(data);
            }
        });

        $('#add-cat-btn').on('click', function() {
            $.ajax({
                url: "../assets/php/ajax/admin/addCategory.php",
                method: "POST",
                cache: false,
                data: {Type: "R", Name: $('#cat_name').val()},
                success: function(data){
                    $('#category').modal('toggle');

                    if(data === "OK") {
                        let dataMsg = "";

                        if(data === "OK") {
                            dataMsg = "The category has been added successfully";
                        } else {
                            dataMsg = "There was an issue while adding the category: " + data;
                        }

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Manage Categories", Message: dataMsg},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });

                        // Display Promotions
                        $.ajax({
                            url: "../assets/php/ajax/admin/getCategoryList.php",
                            method: "POST",
                            cache: false,
                            data: {Type: "R"},
                            success: function(data){
                                $('#r-category-container').html(data);
                            }
                        });
                    }
                }
            });
        });

        $('#delete-cat-btn').on('click', function() {
            $.ajax({
                url: "../assets/php/ajax/admin/deleteCategory.php",
                method: "POST",
                cache: false,
                data: {Type: "R", ID: selectedCategory},
                success: function(data){
                    $('#categoryDel').modal('toggle');

                    if(data === "OK") {
                        let dataMsg = "";

                        if(data === "OK") {
                            dataMsg = "The category has been deleted.";
                        } else {
                            dataMsg = "There was an issue while deleting the category: " + data;
                        }

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Manage Categories", Message: dataMsg},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });

                        // Display Promotions
                        $.ajax({
                            url: "../assets/php/ajax/admin/getCategoryList.php",
                            method: "POST",
                            cache: false,
                            data: {Type: "R"},
                            success: function(data){
                                $('#r-category-container').html(data);
                            }
                        });
                    }
                }
            });
        });

    }
}

function getMCategoryDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Promotions
        $.ajax({
            url: "../assets/php/ajax/admin/getCategoryList.php",
            method: "POST",
            cache: false,
            data: {Type: "M"},
            success: function(data){
                $('#r-category-container').html(data);
            }
        });

        $('#add-cat-btn').on('click', function() {
            $.ajax({
                url: "../assets/php/ajax/admin/addCategory.php",
                method: "POST",
                cache: false,
                data: {Type: "M", Name: $('#cat_name').val()},
                success: function(data){
                    $('#category').modal('toggle');

                    if(data === "OK") {
                        let dataMsg = "";

                        if(data === "OK") {
                            dataMsg = "The category has been added successfully";
                        } else {
                            dataMsg = "There was an issue while adding the category: " + data;
                        }

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Manage Categories", Message: dataMsg},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });

                        // Display Promotions
                        $.ajax({
                            url: "../assets/php/ajax/admin/getCategoryList.php",
                            method: "POST",
                            cache: false,
                            data: {Type: "M"},
                            success: function(data){
                                $('#r-category-container').html(data);
                            }
                        });
                    }
                }
            });
        });

        $('#delete-cat-btn').on('click', function() {
            $.ajax({
                url: "../assets/php/ajax/admin/deleteCategory.php",
                method: "POST",
                cache: false,
                data: {Type: "M", ID: selectedCategory},
                success: function(data){
                    $('#categoryDel').modal('toggle');

                    if(data === "OK") {
                        let dataMsg = "";

                        if(data === "OK") {
                            dataMsg = "The category has been deleted.";
                        } else {
                            dataMsg = "There was an issue while deleting the category: " + data;
                        }

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Manage Categories", Message: dataMsg},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });

                        // Display Promotions
                        $.ajax({
                            url: "../assets/php/ajax/admin/getCategoryList.php",
                            method: "POST",
                            cache: false,
                            data: {Type: "M"},
                            success: function(data){
                                $('#r-category-container').html(data);
                            }
                        });
                    }
                }
            });
        });

    }
}

function getTeamsDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        refreshSelectList();

        // Display Teams
        $.ajax({
            url: "../assets/php/ajax/admin/getTeamsList.php",
            method: "POST",
            cache: false,
            success: function(dataWL){
                $('#teams-container').html(dataWL);
            }
        });

        // Create Team
        $('#add-team-btn-confirm').click(function() {
            // Add Team & Display Toast Message

            let member_one_id = $('#t_member_one').val();
            let member_two_id = $('#t_member_two').val();

            let teamMembers = member_one_id + "," + member_two_id;

            $.ajax({
                url: "../assets/php/ajax/admin/createTeam.php",
                method: "POST",
                cache: false,
                data: {Team_Name: $('#t_name').val(), Team_Members: teamMembers},
                success: function(data) {
                    if(data === "OK") {
                        $('#addTeam').modal('toggle');

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Success!", Message: "The team has been created successfully."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });

                    } else {
                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Oops!", Message: "There was an issue while creating the team."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });
                    }

                    // Update Teams
                    $.ajax({
                        url: "../assets/php/ajax/admin/getTeamsList.php",
                        method: "POST",
                        cache: false,
                        success: function(dataWL){
                            $('#teams-container').html(dataWL);
                        }
                    });

                    // Refresh Values
                    $('#t_name').val("");

                    refreshSelectList();

                    $('#t_member_one').val('default').selectpicker('refresh');
                    $('#t_member_two').val('default').selectpicker('refresh');
                }
            });
        });
        // Create Team

    }
}

function getPromoDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Promotions
        $.ajax({
            url: "../assets/php/ajax/admin/getPromotionList.php",
            method: "POST",
            cache: false,
            success: function(dataWL){
                $('#promo-container').html(dataWL);
            }
        });

    }
}

function getCancelRidesDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Cancellable Rides
        $.ajax({
            url: "../assets/php/ajax/admin/getCancellableRidesList.php",
            method: "POST",
            cache: false,
            data: {User_Search: "Null"},
            success: function(data){
                $('#rides-container').html(data);
            }
        });

        $('#user-search').on('input', function() {
            if($('#user-search').val().length < 3) {
                // Display Cancellable Rides
                $.ajax({
                    url: "../assets/php/ajax/admin/getCancellableRidesList.php",
                    method: "POST",
                    cache: false,
                    data: {User_Search: "Null"},
                    success: function(data){
                        $('#rides-container').html(data);
                    }
                });
            } else {
                $('#rides-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                    "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                    "                <h6 class=\"font-weight-bold mt-4\">Searching for Cancellable Rides...</h6>\n" +
                    "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                    "            </div>");

                setTimeout(function(){
                    // Display Cancellable Rides
                    $.ajax({
                        url: "../assets/php/ajax/admin/getCancellableRidesList.php",
                        method: "POST",
                        cache: false,
                        data: {User_Search: $('#user-search').val()},
                        success: function(data){
                            $('#rides-container').html(data);
                        }
                    });
                }, 1000);
            }

        });



    }
}

let addMoneyId;

function getAddMoneyDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // Display Cancellable Rides
        $.ajax({
            url: "../assets/php/ajax/admin/getAddMoneyList.php",
            method: "POST",
            cache: false,
            data: {User_Search: "Null"},
            success: function(data){
                $('#wallet-container').html(data);
            }
        });

        $('#user-search').on('input', function() {
            if($('#user-search').val().length < 3) {
                // Display Cancellable Rides
                $.ajax({
                    url: "../assets/php/ajax/admin/getAddMoneyList.php",
                    method: "POST",
                    cache: false,
                    data: {User_Search: "Null"},
                    success: function(data){
                        $('#wallet-container').html(data);
                    }
                });
            } else {
                $('#wallet-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                    "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                    "                <h6 class=\"font-weight-bold mt-4\">Searching for Customers...</h6>\n" +
                    "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                    "            </div>");

                setTimeout(function(){
                    // Display Cancellable Rides
                    $.ajax({
                        url: "../assets/php/ajax/admin/getAddMoneyList.php",
                        method: "POST",
                        cache: false,
                        data: {User_Search: $('#user-search').val()},
                        success: function(data){
                            $('#wallet-container').html(data);
                        }
                    });
                }, 1000);
            }

        });



    }
}

function getSettingsDashboard() {
    if(window.localStorage.getItem("User_Email") === null) {
        window.location.href = "../admins/index.php";
    } else {
        let user_email = window.localStorage.getItem("User_Email");

        // START: Display Rider Details
        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Maximum_Radius_KM"},
            success: function(data){
                $('#max-rad-km').val(data);
            }
        });
        // END: Display Rider Details

        // START: Display Aider Driver Module Settings
        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Base_Fare_Driver"},
            success: function(data){
                $('#base-fare-driver').val(data);
            }
        });

        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Price_Per_KM_Driver"},
            success: function(data){
                $('#per-km-price-driver').val(data);
            }
        });

        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Aider_Driver_Primary_Cut"},
            success: function(data){
                $('#primary-driver-cut-per').val(data);
            }
        });

        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Aider_Driver_Secondary_Cut"},
            success: function(data){
                $('#secondary-driver-cut-per').val(data);
            }
        });
        // END: Display Aider Driver Module Settings

        // START: Display Aider Parcel Module Settings
        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Base_Fare_Parcel"},
            success: function(data){
                $('#base-fare-parcel').val(data);
            }
        });

        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Price_Per_KM_Parcel"},
            success: function(data){
                $('#per-km-price-parcel').val(data);
            }
        });

        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Aider_Parcel_Cut"},
            success: function(data){
                $('#parcel-rider-cut-per').val(data);
            }
        });
        // END: Display Aider Parcel Module Settings

        // START: Display Aider Food Module Settings
        $.ajax({
            url: "../assets/php/ajax/admin/getSettingsInformation.php",
            method: "POST",
            cache: false,
            data: {Settings_Info: "Aider_Food_Cut"},
            success: function(data){
                $('#food-rider-cut-per').val(data);
            }
        });
        // END: Display Aider Food Module Settings

        // START: [Settings] Rider - Save Button
        $('#save-rider').click(function() {

            let error = false;

            // STEP 1: Update Base Fare
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Maximum_Radius_KM", Settings_Value: $('#max-rad-km').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 2: Display Toast Message
            let pricingToastTitle, pricingToastMessage;
            if(error) {
                pricingToastTitle = "An error occurred!";
                pricingToastMessage = "There was an issue while trying to update the pricing settings.";
            } else {
                pricingToastTitle = "Settings Updated!";
                pricingToastMessage = "The rider settings has been updated.";
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: pricingToastTitle, Message: pricingToastMessage},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });
        });
        // END: [Settings] Rider - Save Button

        // START: [Settings] Aider Driver - Save Button
        $('#save-aider-driver').click(function() {
            let error = false;

            // STEP 1: Update Base Fare for Driver
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Base_Fare_Driver", Settings_Value: $('#base-fare-driver').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 2: Update Price per KM
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Price_Per_KM_Driver", Settings_Value: $('#per-km-price-driver').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 3: Update Primary Percentage
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Aider_Driver_Primary_Cut", Settings_Value: $('#primary-driver-cut-per').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 4: Update Secondary Percentage
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Aider_Driver_Secondary_Cut", Settings_Value: $('#secondary-driver-cut-per').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 5: Display Toast Message
            let pricingToastTitle, pricingToastMessage;
            if(error) {
                pricingToastTitle = "An error occurred!";
                pricingToastMessage = "There was an issue while trying to update the percentage settings.";
            } else {
                pricingToastTitle = "Settings Updated!";
                pricingToastMessage = "The pricing settings has been updated.";
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: pricingToastTitle, Message: pricingToastMessage},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });
        });
        // END: [Settings] Aider Driver - Save Button

        // START: [Settings] Aider Parcel - Save Button
        $('#save-aider-parcel').click(function() {
            let error = false;

            // STEP 1: Update Base Fare for Parcel
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Base_Fare_Parcel", Settings_Value: $('#base-fare-parcel').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 2: Update Price per KM
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Price_Per_KM_Parcel", Settings_Value: $('#per-km-price-parcel').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 3: Update Primary Percentage
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Aider_Parcel_Cut", Settings_Value: $('#parcel-rider-cut-per').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 4: Display Toast Message
            let pricingToastTitle, pricingToastMessage;
            if(error) {
                pricingToastTitle = "An error occurred!";
                pricingToastMessage = "There was an issue while trying to update the module settings.";
            } else {
                pricingToastTitle = "Settings Updated!";
                pricingToastMessage = "The module settings has been updated.";
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: pricingToastTitle, Message: pricingToastMessage},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });
        });
        // END: [Settings] Aider Parcel - Save Button

        // START: [Settings] Aider Food - Save Button
        $('#save-aider-food').click(function() {
            let error = false;

            // STEP 1: Update Primary Percentage
            $.ajax({
                url: "../assets/php/ajax/admin/updateSettingsInformation.php",
                method: "POST",
                cache: false,
                data: {Settings_Info: "Aider_Food_Cut", Settings_Value: $('#food-rider-cut-per').val(), isNumber: true},
                success: function(data){
                    if(data === "YES") {
                        error = true;
                    }
                }
            });

            // STEP 2: Display Toast Message
            let pricingToastTitle, pricingToastMessage;
            if(error) {
                pricingToastTitle = "An error occurred!";
                pricingToastMessage = "There was an issue while trying to update the module settings.";
            } else {
                pricingToastTitle = "Settings Updated!";
                pricingToastMessage = "The module settings has been updated.";
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: pricingToastTitle, Message: pricingToastMessage},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });
        });
        // END: [Settings] Aider Food - Save Button
    }
}
/* END: Dashboard */

/* START: Individual Functions */
function addTeam() {
    $('#addTeam').modal();
}

function editTeam(team_id) {
    try {
        $.ajax({
            url: "../assets/php/ajax/admin/getTeamEditingDetails.php",
            method: "POST",
            cache: false,
            data: {Team_ID: team_id},
            success: function (data) {
                if (data !== "ERROR") {
                    let dataArray = JSON.parse(data);

                    $('#edit_team_name').html(dataArray[0]);
                    $('#edit_t_name').val(dataArray[0]);

                    $.ajax({
                        url: "../assets/php/ajax/admin/getEditedRidersSelectList.php",
                        method: "POST",
                        cache: false,
                        data: {Rider_ID: parseInt(dataArray[1])},
                        success: function (dataSelectList) {
                            if(dataSelectList !== "ERROR") {
                                let dataSelectArray = JSON.parse(dataSelectList);
                                $('#edit_select-riders-list-1').html(dataSelectArray[0]);
                                $('#edit_select-drivers-list-1').html(dataSelectArray[1]);

                                $('#edit_t_member_one').selectpicker('refresh');
                                $('#edit_t_member_two').selectpicker('refresh');
                            }
                        }
                    });

                    $.ajax({
                        url: "../assets/php/ajax/admin/getEditedRidersSelectList.php",
                        method: "POST",
                        cache: false,
                        data: {Rider_ID: parseInt(dataArray[2])},
                        success: function (dataSelectList) {
                            if(dataSelectList !== "ERROR") {
                                let dataSelectArray = JSON.parse(dataSelectList);
                                $('#edit_select-riders-list-2').html(dataSelectArray[0]);
                                $('#edit_select-drivers-list-2').html(dataSelectArray[1]);

                                $('#edit_t_member_one').selectpicker('refresh');
                                $('#edit_t_member_two').selectpicker('refresh');
                            }
                        }
                    });
                }
            }
        });
    } finally {
        $('#editTeam').modal();

        $('#edit-team-btn-confirm').click(function() {

            let teamName = $('#edit_t_name').val();
            let teamMemberOne = $('#edit_t_member_one').val();
            let teamMemberTwo = $('#edit_t_member_two').val();

            $.ajax({
                url: "../assets/php/ajax/admin/editTeam.php",
                method: "POST",
                cache: false,
                data: {Team_ID: team_id, Team_Name: teamName, Team_Member_One: teamMemberOne, Team_Member_Two: teamMemberTwo},
                success: function (data) {
                    if(data !== "ERROR") {
                        $('#editTeam').modal('toggle');

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Success!", Message: "The " + teamName + " team has been edited successfully."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });
                    } else {
                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Oops!", Message: "There was an issue while editing the team."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });
                    }

                    // Update Teams
                    $.ajax({
                        url: "../assets/php/ajax/admin/getTeamsList.php",
                        method: "POST",
                        cache: false,
                        success: function(dataWL){
                            $('#teams-container').html(dataWL);
                        }
                    });
                }
            });
        });
    }


}

function deleteTeam(team_id) {
    try {
        $.ajax({
            url: "../assets/php/ajax/admin/getTeamDeletingDetails.php",
            method: "POST",
            cache: false,
            data: {Team_ID: team_id},
            success: function (data) {
                if (data !== "ERROR") {
                    $('#delete_team_name').html(data);
                    $('#delete_team_name_2').html(data);
                }
            }
        });
    } finally {
        $('#deleteTeam').modal();

        $('#delete-team-btn-confirm').click(function() {
            $.ajax({
                url: "../assets/php/ajax/admin/deleteTeam.php",
                method: "POST",
                cache: false,
                data: {Team_ID: team_id},
                success: function (data) {
                    if (data !== "ERROR") {
                        $('#deleteTeam').modal('toggle');

                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Success!", Message: "The team has been deleted."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });
                    } else {
                        // Display Toast Message
                        $.ajax({
                            url: "../assets/php/ajax/ui/sendToastMessage.php",
                            method: "POST",
                            cache: false,
                            data: {Title: "Oops!", Message: "There was an issue while deleting the team."},
                            success: function(dataToast){
                                $('.toast-container').html(dataToast);
                                $('.toast').toast('show');

                                setTimeout(function() {
                                    $('.toast-container').html("");
                                }, 5000);
                            }
                        });
                    }

                    // Update Teams
                    $.ajax({
                        url: "../assets/php/ajax/admin/getTeamsList.php",
                        method: "POST",
                        cache: false,
                        success: function(dataWL){
                            $('#teams-container').html(dataWL);
                        }
                    });
                }
            });
        });
    }
}

function deletePromo(promo_id) {
    $.ajax({
        url: "../assets/php/ajax/admin/deletePromotion.php",
        method: "POST",
        cache: false,
        data: {Promo_ID: promo_id},
        success: function (data) {
            if (data !== "ERROR") {
                // Display Toast Message
                $.ajax({
                    url: "../assets/php/ajax/ui/sendToastMessage.php",
                    method: "POST",
                    cache: false,
                    data: {Title: "Success!", Message: "The promotion has been deleted."},
                    success: function(dataToast){
                        $('.toast-container').html(dataToast);
                        $('.toast').toast('show');

                        setTimeout(function() {
                            $('.toast-container').html("");
                        }, 5000);
                    }
                });
            } else {
                // Display Toast Message
                $.ajax({
                    url: "../assets/php/ajax/ui/sendToastMessage.php",
                    method: "POST",
                    cache: false,
                    data: {Title: "Oops!", Message: "There was an issue while deleting the promotion."},
                    success: function(dataToast){
                        $('.toast-container').html(dataToast);
                        $('.toast').toast('show');

                        setTimeout(function() {
                            $('.toast-container').html("");
                        }, 5000);
                    }
                });
            }

            // Update Promotions
            $.ajax({
                url: "../assets/php/ajax/admin/getPromotionList.php",
                method: "POST",
                cache: false,
                success: function(dataWL){
                    $('#promo-container').html(dataWL);
                }
            });
        }
    });
}

function refreshSelectList() {
    // Display Select Items
    $.ajax({
        url: "../assets/php/ajax/admin/getRidersSelectList.php",
        method: "POST",
        cache: false,
        data: {Rider_Type: "RIDER"},
        success: function(dataWL){
            $('#select-riders-list-1').html(dataWL);
            $('#select-riders-list-2').html(dataWL);

            $('#t_member_one').selectpicker('refresh');
            $('#t_member_two').selectpicker('refresh');
        }
    });

    $.ajax({
        url: "../assets/php/ajax/admin/getRidersSelectList.php",
        method: "POST",
        cache: false,
        data: {Rider_Type: "DRIVER"},
        success: function(dataWL){
            $('#select-drivers-list-1').html(dataWL);
            $('#select-drivers-list-2').html(dataWL);

            $('#t_member_one').selectpicker('refresh');
            $('#t_member_two').selectpicker('refresh');
        }
    });
    // Display Select Items
}

function approveButtonClick(obj) {
    let emailApprove = obj.id;
    $('#approve_email').text(emailApprove);

    $('#riderApproval').modal();
}

function denyButtonClick(obj) {
    let emailApprove = obj.id;

    // Approve Rider & Display Toast Message
    $.ajax({
        url: "../assets/php/ajax/admin/denyRider.php",
        method: "POST",
        cache: false,
        data: {User_Email: emailApprove},
        success: function(data) {
            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Approval Status for " + emailApprove, Message: data},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            // Update Waiting List
            $.ajax({
                url: "../assets/php/ajax/admin/getWaitingList.php",
                method: "POST",
                cache: false,
                success: function(dataWL){
                    $('#waiting-list-container').html(dataWL);
                }
            });
        }
    });
}

function approveCashOutClick() {
    let emailApprove = $('.btn-approve').attr('id');

    // Approve Rider & Display Toast Message
    $.ajax({
        url: "../assets/php/ajax/admin/approveCashOutRequest.php",
        method: "POST",
        cache: false,
        data: {User_Email: emailApprove},
        success: function(dataMsg) {
            // Display Toast Message
            let msg = "";
            if(dataMsg === "ERROR") {
                msg = "You can't approve this request at this moment.";
            } else {
                msg = "The cash out request was successful.";
            }
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Cash Out Approval Status for " + emailApprove, Message: msg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            // Update Waiting List
            $.ajax({
                url: "../assets/php/ajax/admin/getCashOutRequests.php",
                method: "POST",
                cache: false,
                success: function(dataWL){
                    $('#waiting-list-container').html(dataWL);
                }
            });
        }
    });
}

function denyCashOutClick() {
    let emailApprove = $('.btn-approve').attr('id');

    // Approve Rider & Display Toast Message
    $.ajax({
        url: "../assets/php/ajax/admin/denyCashOutRequest.php",
        method: "POST",
        cache: false,
        data: {User_Email: emailApprove},
        success: function(dataMsg) {
            // Display Toast Message
            let msg = "";
            if(dataMsg === "ERROR") {
                msg = "You can't deny this request at this moment.";
            } else {
                msg = "The cash out request was denied successfully.";
            }
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Cash Out Denial Status for " + emailApprove, Message: msg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            // Update Waiting List
            $.ajax({
                url: "../assets/php/ajax/admin/getCashOutRequests.php",
                method: "POST",
                cache: false,
                success: function(dataWL){
                    $('#waiting-list-container').html(dataWL);
                }
            });
        }
    });
}

function cancelRide() {
    let rideInfo = $('.btn-cancel').attr('id');

    let rideDetails = rideInfo.split("-");

    // Approve Rider & Display Toast Message
    $.ajax({
        url: "../assets/php/ajax/admin/cancelRide.php",
        method: "POST",
        cache: false,
        data: {Ride_Type: rideDetails[0], Ride_ID: rideDetails[1]},
        success: function(dataMsg) {
            // Display Toast Message
            let msg = "";
            if(dataMsg === "ERROR") {
                msg = "There was an issue cancelling this ride.";
            } else {
                msg = "The ride has been cancelled.";
            }
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Ride Cancelled", Message: msg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            $('#rides-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                "                <h6 class=\"font-weight-bold mt-4\">Searching for Cancellable Rides...</h6>\n" +
                "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                "            </div>");

            setTimeout(function(){
                // Display Cancellable Rides
                $.ajax({
                    url: "../assets/php/ajax/admin/getCancellableRidesList.php",
                    method: "POST",
                    cache: false,
                    data: {User_Search: $('#user-search').val()},
                    success: function(data){
                        $('#rides-container').html(data);
                    }
                });
            }, 1000);
        }
    });
}

function addMoney() {
    let userInfo = $('.btn-cancel').attr('id');

    let userDetails = userInfo.split("-");

    addMoneyId = userDetails[1];

    $('#addMoney').modal();
}

function updateMoney() {
    // Update Wallet & Display Toast Message
    $.ajax({
        url: "../assets/php/ajax/user/updateUserDataByID.php",
        method: "POST",
        cache: false,
        data: {ID: addMoneyId, Key: "Credit", Value: $('#wallet-amt').val()},
        success: function(dataMsg) {
            $('#addMoney').modal('toggle');

            // Display Toast Message
            let msg = "";
            if(dataMsg === "ERROR") {
                msg = "There was an issue updating the wallet.";
            } else {
                msg = "The wallet has been updated.";
            }
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Wallet", Message: msg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            $('#rides-container').html("<div class=\"col-12 text-center mt-5\">\n" +
                "                <i class=\"fas fa-search fa-4x\" style=\"color: #DCDCDC;\"></i>\n" +
                "                <h6 class=\"font-weight-bold mt-4\">Searching for Customers...</h6>\n" +
                "                <h6 class=\"text-black-50\">This may take a moment.</h6>\n" +
                "            </div>");

            setTimeout(function(){
                // Display Cancellable Rides
                $.ajax({
                    url: "../assets/php/ajax/admin/getAddMoneyList.php",
                    method: "POST",
                    cache: false,
                    data: {User_Search: $('#user-search').val()},
                    success: function(data){
                        $('#wallet-container').html(data);
                    }
                });
            }, 1000);
        }
    });
}

function openRestaurant(id) {
    $.ajax({
        url: "../assets/php/ajax/admin/getRestaurantDetails.php",
        method: "POST",
        cache: false,
        data: {Rest_ID: id},
        success: function(data){
            if(!data.includes("ERROR")) {
                selectedRestaurant = parseInt(id);

                data = JSON.parse(data);

                $('#menu_view_restaurant_name').html(data[1]);
                $('#modal-restaurant-name').html(data[1]);

                // Display Menu List
                $.ajax({
                    url: "../assets/php/ajax/admin/getMenuList.php",
                    method: "POST",
                    cache: false,
                    data: {ID: selectedRestaurant},
                    success: function(data){
                        $('#menu-container').html(data);
                    }
                });

                if(!($('#restaurants-view').hasClass('d-none'))) {
                    $('#restaurants-view').addClass('d-none');
                }

                if($('#menu-view').hasClass('d-none')) {
                    $('#menu-view').removeClass('d-none');
                }

                if($('#food-back-btn').hasClass('d-none')) {
                    $('#food-back-btn').removeClass('d-none');
                }
            }
        }
    });
}

function editRestaurant(id) {
    $.ajax({
        url: "../assets/php/ajax/admin/getRestaurantDetails.php",
        method: "POST",
        cache: false,
        data: {Rest_ID: id},
        success: function(data){
            if(!data.includes("ERROR")) {
                selectedRestaurant = parseInt(id);

                data = JSON.parse(data);

                $('#restaurant_name_edit').html(data[1]);
                $('#r_name_edit').val(data[1]);
                $('#r_email_edit').val(data[2]);
                $('#r_hp_edit').val(data[3]);
                $('#r_tele_username_edit').val(data[4]);
                $('#r_loc_edit').val(data[5]);

                $('#editRestaurant').modal('toggle');

            }
        }
    });
}

function deleteRestaurant(id) {
    $.ajax({
        url: "../assets/php/ajax/admin/deleteRestaurant.php",
        method: "POST",
        cache: false,
        data: {Rest_ID: id},
        success: function(data) {
            let dataMsg = "";

            if(data === "OK") {
                dataMsg = "The restaurant has been deleted.";
            } else {
                dataMsg = "There was an issue while deleting the restaurant: " + data;
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Manage Menu", Message: dataMsg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            // Display Menu List
            $.ajax({
                url: "../assets/php/ajax/admin/getRestaurantList.php",
                method: "POST",
                cache: false,
                success: function(data){
                    $('#restaurant-container').html(data);
                }
            });
        }
    });
}

function editItemMenu(id) {
    $.ajax({
        url: "../assets/php/ajax/admin/getMenuItemDetails.php",
        method: "POST",
        cache: false,
        data: {MenuItem_ID: id},
        success: function(data){
            console.log(data);
            if(!data.includes("ERROR")) {
                selectedItem = id;

                data = JSON.parse(data);

                $('#edit-restaurant-name').html(data[2]);
                $('#m_name_edit').val(data[2]);
                $('#m_desc_edit').val(data[3]);
                $('#m_price_edit').val(data[4]);

                $('#editMenuItem').modal('toggle');
            }
        }
    });
}

function deleteItemMenu(id) {
    $.ajax({
        url: "../assets/php/ajax/admin/deleteMenuItem.php",
        method: "POST",
        cache: false,
        data: {Rest_ID: id},
        success: function(data) {
            let dataMsg = "";

            if(data === "OK") {
                dataMsg = "The item has been deleted.";
            } else {
                dataMsg = "There was an issue while deleting the item: " + data;
            }

            // Display Toast Message
            $.ajax({
                url: "../assets/php/ajax/ui/sendToastMessage.php",
                method: "POST",
                cache: false,
                data: {Title: "Manage Menu", Message: dataMsg},
                success: function(dataToast){
                    $('.toast-container').html(dataToast);
                    $('.toast').toast('show');

                    setTimeout(function() {
                        $('.toast-container').html("");
                    }, 5000);
                }
            });

            // Display Menu List
            $.ajax({
                url: "../assets/php/ajax/admin/getMenuList.php",
                method: "POST",
                cache: false,
                data: {ID: selectedRestaurant},
                success: function(data){
                    $('#menu-container').html(data);
                }
            });
        }
    });
}

function deleteCategory(type, id) {
    $.ajax({
        url: "../assets/php/ajax/admin/getCategoryData.php",
        method: "POST",
        cache: false,
        data: {Type: type, ID: id, Data: "Category_Name"},
        success: function(data){
            if(!data.includes("ERROR")) {
                selectedCategory = id;

                $('#cat_name_modal').html(data);
                $('#categoryDel').modal('toggle');
            }
        }
    });
}
/* END: Individual Functions */