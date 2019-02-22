<?php

session_start();

$db = "crud";
$host = "192.168.245.5";
$username = "root";
$password = "";
$conn = new PDO("mysql:dbname=$db;host=$host", $username, $password, array(PDO::ATTR_PERSISTENT => true));

$logged = false;

if(isset($_SESSION["email"])){
    $logged = true;
}

if(isset($_POST["type"])){
    $type = $_POST["type"];
    if($type === "login"){

        $email_input = $_POST["email"];
        $pass_input = $_POST["password"];
        $sql = "SELECT * FROM tbllogin WHERE (email=:email)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $email_input, PDO::PARAM_STR);
        $stmt->execute();

        $table_data = "";

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            if($row["email"] === $email_input && $row["password"] === md5($pass_input)){
                $_SESSION["email"] = $_POST["email"];
                $_SESSION["password"] = $_POST["password"];
                $logged = true;
            }
        }
    }else if($type === "logout"){
        session_destroy();
        echo "<script>window.location.href = ''</script>";
    } else if($type === "rimuovi" && $logged === true){
        $id = intval($_POST["idPersona"]);

        /*
        $sql = "DELETE FROM tblutenti WHERE (id=:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        */

        $sql = "DELETE FROM tblutenti WHERE (idutente=:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

    }
    else if($type === "modifica" && $logged === true){
        $nome = $_POST["nome"];
        $cognome = $_POST["cognome"];
        $data = $_POST["data"];
        $time = strtotime($data);
        $data = date("Ymd", $time);
        $reddito = $_POST["reddito"];
        $sesso = $_POST["sessoAgg"];
        $id = $_POST["idPersona"];

        $sql = "UPDATE tblutenti SET nome=:nome, cognome=:cognome, sesso=:sesso, reddito=:reddito, data=:data WHERE (idutente=:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_STR);
        $stmt->bindValue(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindValue(':cognome', $cognome, PDO::PARAM_STR);
        $stmt->bindValue(':sesso', $sesso, PDO::PARAM_STR);
        $stmt->bindValue(':reddito', $reddito, PDO::PARAM_STR);
        $stmt->bindValue(':data', $data, PDO::PARAM_INT);
        $stmt->execute();
    }else if($type === "aggiungi" && $logged === true){
        $nome = $_POST["nome"];
        $cognome = $_POST["cognome"];
        $data = $_POST["data"];
        $time = strtotime($data);
        $data = date("Ymd", $time);
        $reddito = $_POST["reddito"];
        $sesso = $_POST["sessoAgg"];

        $sql = "INSERT INTO tblutenti VALUE(:nome, :cognome, :sesso, :reddito, NULL, :data)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindValue(':cognome', $cognome, PDO::PARAM_STR);
        $stmt->bindValue(':sesso', $sesso, PDO::PARAM_STR);
        $stmt->bindValue(':reddito', $reddito, PDO::PARAM_STR);
        $stmt->bindValue(':data', $data, PDO::PARAM_INT);
        $stmt->execute();
    } else if($type == "registrazione"){
        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = "INSERT INTO tbllogin VALUE(:email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':password', md5($password), PDO::PARAM_STR);
        $stmt->execute();
    }
}

?>

<!DOCTYPE html>
<html lang="it">

<head>
    <title>Esercizio gruppo 2</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="css/Stile.css">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script src="js/javascript.js"></script>
</head>

<body>
    <div class="container-fluid">  

        <div class="row justify-content-end justify-self-center">
            <?php
                if($logged === true){
                    echo <<<XML
                            <form method="POST" action="">
                                <input type="hidden" name="type" value="logout" /> 
                                <button type="submit" class="btn btn-primary btnLoginLogout">Logout</button> 
                            </form>
                            </div>
                                            
                            <button type="button" class="btnAggiungi" data-toggle="modal" data-target="#ModalAggiungi" onclick="reset('aggiungi')">
                                <img class="PlusIcon" src="img/plus.png" alt="#">
                            </button> 
                            <button type="button" class="btnCerca" data-toggle="modal" data-target="#ModalCerca" onclick="reset('cerca')">
                                <i class="SearchButton fas fa-search"></i>
                            </button>
                        XML;
                }else {
                    echo <<<XML
                        <button type="button" class="btn btn-primary btnLoginLogout" data-toggle="modal" data-target="#ModalLogin">Login</button> 
                        <button type="button" class="btn btn-primary btnLoginLogout" data-toggle="modal" data-target="#ModalAggiungi" onclick="reset('registrati');">Registrati</button> 
                        </div>
                    XML;
                }
            ?>


        
        <div class="modal fade" id="ModalLogin" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="labelDialogLogin">Login</h4> <button type="button" class="close"
                            data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST">
                            <input type="hidden" name="type" value="login" /> 
                            <div class="form-group row"> 
                                <label for="emailLogin" class="col-sm-3 col-form-label">Email</label>
                                <div class="col-8"> 
                                    <input type="email" class="form-control" name="email" id="emailLogin" required> 
                                </div>
                            </div>
                            <div class="form-group row"> 
                                <label for="passwordLogin"
                                    class="col-sm-3 col-form-label">Password</label>
                                <div class="col-8"> 
                                    <input type="password" class="form-control" name="password" id="passwordLogin" required> 
                                </div>
                            </div>
                            <div class="modal-footer"> 
                                <button type="submit" class="btn btn-primary ">Entra</button> 
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Chiudi</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalAggiungi" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="labelDialog">Aggiungi persona</h4> <button type="button" class="close"
                            data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form action="" METHOD="POST" id="formAggiungi">
                            <input type="hidden" name="type" id="typeOfSubmit" value="" /> 
                            <input type="hidden" name="idPersona" id="idPersona" value="" /> 
                            <div class="form-group row" id="emailAggField"> <label for="emailAgg"
                                    class="col-sm-3 col-form-label">Email</label>
                                <div class="col-8"> <input type="text" class="form-control" name="email" id="emailAgg"
                                         required> </div>
                            </div>
                            <div class="form-group row" id="passwordAggField"> 
                                <label for="passwordRegister"
                                    class="col-sm-3 col-form-label">Password</label>
                                <div class="col-8"> 
                                    <input type="password" class="form-control" name="password" id="passwordRegister" required> 
                                </div>
                            </div>
                            <div class="form-group row" id="nomeAggField"> 
                                <label for="nomeAgg"
                                    class="col-sm-3 col-form-label">Nome</label>
                                <div class="col-8"> <input type="text" class="form-control" name="nome" id="nomeAgg"
                                        pattern="^[a-zA-Z ]+$" required> </div>
                            </div>
                            <div class="form-group row" id="cognomeAggField"> <label for="cognomeAgg"
                                    class="col-sm-3 col-form-label">Cognome</label>
                                <div class="col-8"> <input type="text" class="form-control" name="cognome" id="cognomeAgg"
                                        pattern="^[a-zA-Z ]+$" required> </div>
                            </div>
                            <div class="form-group row" id="dataAggField"> <label for="dataAgg"
                                    class="col-sm-3 col-form-label">Data</label>
                                <div class="col-8"> <input type="date" class="form-control" name="data" id="dataAgg" required>
                                </div>
                            </div>
                            <div class="form-group row" id="redditoAggField"> <label for="redditoAgg"
                                    class="col-sm-3 col-form-label">Reddito</label> <select name="reddito" id="redditoAgg"
                                    class="col-7 form-control">
                                    <option value="basso" selected>meno di 10.000 €</option>
                                    <option value="medio">da 10.000 a 20.000 €</option>
                                    <option value="alto">pi&ugrave; di 20.000 €</option>
                                </select> </div>
                            <div class="form-check form-check-inline" id="sessoAggFieldM"> 
                                <input class="form-check-input" type="radio" name="sessoAgg" id="sessoAggM" value="Maschio" required checked> 
                                <label class="form-check-label" for="sessoAggM">
                                    Maschio
                                </label> 
                            </div>
                            <div class="form-check form-check-inline" id="sessoAggFieldF"> 
                                <input class="form-check-input" type="radio" name="sessoAgg" id="sessoAggF" value="Femmina" required> 
                                    <label class="form-check-label" for="sessoAggF">Femmina</label> 
                            </div>
                            <div class="modal-footer"> <button type="submit" class="btn btn-primary ">Salva</button> 
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Chiudi</button> </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    <div class="modal fade" id="ModalCerca" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="labelDialog">Cerca informazioni</h4> <button type="button" class="close"
                        data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form onsubmit="return cerca()">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <input type="checkbox" id="nomeCheckBox"
                                        aria-label="Checkbox for following text input"> </div>
                            </div><input type="text" class="form-control" id="nomeCerca" pattern="^[a-zA-Z0-9]+$"
                                placeholder="Nome">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <input type="checkbox" id="cognomeCheckBox"
                                        aria-label="Checkbox for following text input"> </div>
                            </div><input type="text" class="form-control" id="cognomeCerca" pattern="^[a-zA-Z0-9]+$"
                                placeholder="Cognome">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <input type="checkbox" id="dataCheckBox"
                                        aria-label="Checkbox for following text input"> </div>
                            </div><input type="date" class="form-control" id="dataCerca">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <input type="checkbox" id="redditoCheckBox"
                                        aria-label="Checkbox for following text input"> </div>
                            </div><select id="redditoCerca" class="form-control custom-select">
                                <option value="basso" selected>meno di 10.000 €</option>
                                <option value="medio">da 10.000 a 20.000 €</option>
                                <option value="alto">pi&ugrave; di 20.000 €</option>
                            </select>
                        </div>
                        <div style="text-align: center">
                            <div class="form-check form-check-inline"> <input class="form-check-input" type="radio"
                                    name="sessoCerca" id="sessoCercaM" value="option1"> <label class="form-check-label"
                                    for="sessoCercaM">Maschio</label> </div>
                            <div class="form-check form-check-inline"> <input class="form-check-input" type="radio"
                                    name="sessoCerca" id="sessoCercaF" value="option2"> <label class="form-check-label"
                                    for="sessoCercaF">Femmina</label> </div>
                        </div>
                        <div class="modal-footer"> <button type="submit" class="btn btn-primary ">Cerca</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    
    <div class="divTable">
    <?php 
        if($logged === true){
            // MOSTRO PRIMA PARTE
            echo <<<XML
                <div class="row no-more-tables justify-content-center" style="min-height: 430px;">
                    <table class="table table-sm table-condensed cf">
                        <thead class="tableHeader">
                            <tr class="table-header">
                                <th scope="col" id="headernome" onclick="ordinaPerNome()">Nome</th>
                                <th scope="col" id="headercognome" onclick="ordinaPerCognome()">Cognome</th>
                                <th scope="col" id="headerdata" onclick="ordinaPerData()">Data Nascita</th>
                                <th scope="col" id="headerredd" onclick="ordinaPerReddito()">Reddito</th>
                                <th scope="col" id="headersesso" onclick="ordinaPerSesso()">Sesso</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="tabellaPersone"> 

                XML;

            // MOSTRO I DATI DEGLI UTENTI
            $sql2 = "SELECT * FROM tblutenti";
            $stmt2 = $conn->prepare($sql2);
            $stmt2->execute();

            while($row = $stmt2->fetch(PDO::FETCH_ASSOC)){
                $id = $row["idutente"];
                $nome = $row["nome"];
                $cognome = $row["cognome"];
                $sesso = $row["sesso"];
                $dataStr = $row["data"];
                $time = strtotime($dataStr);
                $data = date('d/m/Y',$time);
                $dateToAddToClass = date('Y-m-d', $time);

                $reddito = $row["reddito"];
                switch ($reddito) {
                    case "basso":
                        $redditoToShow =  "meno di 10.000 €";
                        break;
                    case "medio":
                        $redditoToShow = "da 10.000 a 20.000 €";
                        break;
                    case "alto":
                        $redditoToShow = "più di 20.000 €";
                        break;
                }
                 echo <<<XML
                 <script>
                    persone.push(new Persona("$nome", "$cognome", "$dateToAddToClass", "$reddito", "$sesso", $id));
                    //addRecordToScreen($id, $nome, $cognome, $dateToAddToClass, $reddito, $sesso);
                 </script>
                XML;
           
            }

            // CONCLUDE TABELLA
            echo <<<XML
                        </tbody>
                    </table>
                </div></div>
                <div class="row">
                    <div class="btn-toolbar justify-content-center" id="toolbar" role="toolbar"
                        aria-label="Toolbar with button groups">
                        <div class="btn-group" role="group" aria-label="First group"> 
                            <button type="button" onclick="primaPagina()" id="primaPagina" class="btn btn-primary"><i class="fas fa-angle-double-left"></i></button>
                            <button type="button" onclick="paginaPrecedente()" id="paginaPrecedente" class="btn btn-primary"><i class="fas fa-angle-left"></i></button>
                            <button type="button" class="btn btn-primary" id="pageCount"><b>1</b></button>
                            <button type="button" onclick="paginaSeguente()" id="paginaSeguente" class="btn btn-primary"><i class="fas fa-angle-right"></i></button>
                            <button type="button" onclick="ultimaPagina()" id="ultimaPagina" class="btn btn-primary"><i class="fas fa-angle-double-right"></i></button>
                        </div>
                    </div>
                </div>
                <script> showAll("az") </script>
                XML;
        }else {
            echo <<<XML
                <style>
                    body {background-image: url("img/punto.png"); background-repeat: no-repeat; background-size: cover;}
                    .container-fluid {background-color : transparent}
                </style>
            XML;
        }
    
    ?>


    <div class="modal fade" id="ModalElimina" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Sei sicuro di voler eliminare?</h4>
                </div>
                <div class="modal-footer"> 
                    <form action="" method="POST">
                        <input type="hidden" name="type" value="rimuovi" /> 
                        <input type="hidden" name="idPersona" id="idPersonaRemovePerson" value="" />
                        <button type="submit" class="btn btn-default btn-danger">SI</button>
                        <button type="button" class="btn btn-default " data-dismiss="modal">NO</button> 
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
