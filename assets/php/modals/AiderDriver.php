<?php


class AiderDriver {

    function book($customerEmail, $Pickup_Location, $Dropoff_Location, $Price) {

        $Aider = new Aider();
        $responseCustomerID = $Aider->getUserModal()->getCustomerModal()->getCustomerInformationByEmail($customerEmail, 'ID');

        if($responseCustomerID['error']) {
            $response['error'] = true;
            $response['message'] = "The email used for this account is not registered with us. Try re-logging.";
        } else {
            $DatabaseHandler = new DatabaseHandler();
            $connection = $DatabaseHandler->getMySQLiConnection();

            $priceAmount = implode($Price);

            // Subtract Funds
            $responseFunds = $this->checkAndSubtractFunds($customerEmail, $priceAmount);

            if($responseFunds['error']) {
                $response['error'] = true;
                $response['message'] = $responseFunds['message'];
            } else {
                $insert_id = null;
                $t_type = "DRIVER";

                // [START] Add to Delivery Listing
                $sql = "INSERT INTO aider_transaction_driver(Customer_ID, Pickup_Location, Dropoff_Location, Price, Transaction_Datetime, Status)" .
                    "VALUES (?, ?, ?, ?, ?, ?)";

                $transactionDate = date("Y-m-d H:i:s");
                $status = "FINDING-RIDER";

                $statement = $connection->prepare($sql);
                $statement->bind_param("issdss",$responseCustomerID['data'], $Pickup_Location, $Dropoff_Location, $priceAmount, $transactionDate, $status);

                if($statement->execute()) {
                    $response['error'] = false;

                    $insert_id = $connection->insert_id;
                } else {
                    $response['error'] = true;
                    $response['message'] = "There was an error while setting up the delivery.";
                }
                $statement->close();
                // [END] Add to Delivery Listing

                if(!$response['error']) {
                    // [START] Add to Delivery Sorting
                    $sqlSort = "INSERT INTO aider_transaction_sorting(Transaction_ID, Transaction_Type, Transaction_Datetime, Transaction_Status) VALUES (?, ?, ?, ?)";

                    $statementSort = $connection->prepare($sqlSort);
                    $statementSort->bind_param("isss", $insert_id, $t_type, $transactionDate, $status);

                    if($statementSort->execute()) {
                        $response['error'] = false;
                    } else {
                        $response['error'] = true;
                        $response['message'] = "There was an error while pushing the data to the sorting service.";
                    }
                    $statementSort->close();
                    // [END] Add to Delivery Sorting
                }

                $connection->close();
            }
        }
        return $response;
    }

    private function checkAndSubtractFunds($Email, $Amount) {
        $Aider = new Aider();
        $responseCustomerModal = $Aider->getUserModal()->getCustomerModal()->getCustomerInformationByEmail($Email, "Credit");

        if($responseCustomerModal['error']) {
            $response['error'] = true;
            $response['message'] = "There was an error wile trying to fetch your wallet.";
        } else {
            if($responseCustomerModal['data'] < $Amount) {
                $response['error'] = true;
                $response['message'] = "You've insufficient funds. Top up to continue." . " - " . $Amount;
            } else {
                if(is_numeric($responseCustomerModal['data'])) {
                    $newPrice = ((double)$responseCustomerModal['data'] - (double)$Amount);
                    $responseUpdateWallet = $Aider->getUserModal()->getCustomerModal()->updateCustomerInformationByEmail($Email, "Credit", $newPrice);

                    if($responseUpdateWallet['error']) {
                        $response['error'] = true;
                        $response['message'] = "There was an issue while trying to update your wallet.";
                    } else {
                        $response['error'] = false;
                    }
                } else {
                    $response['error'] = true;
                    $response['message'] = "There was an internal error with value exchanging.";
                }


            }
        }

        return $response;
    }

}