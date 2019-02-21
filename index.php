<?php



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
</head>

<body>
    <div class="container-fluid"> 
    <button type="button" class="btnAggiungi" data-toggle="modal"
            data-target="#ModalAggiungi" onclick="reset('aggiungi')"><img class="PlusIcon" src="img/plus.png"
                alt="#"></button> <button type="button" class="btnCerca" data-toggle="modal" data-target="#ModalCerca"
            onclick="reset('cerca')"><i class="SearchButton fas fa-search"></i></button>
        <div class="modal fade" id="ModalAggiungi" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="labelDialog">Aggiungi persona</h4> <button type="button" class="close"
                            data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="return salva();">
                            <div class="form-group row"> <label for="nomeAgg"
                                    class="col-sm-3 col-form-label">Nome</label>
                                <div class="col-8"> <input type="text" class="form-control" id="nomeAgg"
                                        pattern="^[a-zA-Z0-9]+$" required> </div>
                            </div>
                            <div class="form-group row"> <label for="cognomeAgg"
                                    class="col-sm-3 col-form-label">Cognome</label>
                                <div class="col-8"> <input type="text" class="form-control" id="cognomeAgg"
                                        pattern="^[a-zA-Z0-9]+$" required> </div>
                            </div>
                            <div class="form-group row"> <label for="dataAgg"
                                    class="col-sm-3 col-form-label">Data</label>
                                <div class="col-8"> <input type="date" class="form-control" id="dataAgg" required>
                                </div>
                            </div>
                            <div class="form-group row"> <label for="redditoAgg"
                                    class="col-sm-3 col-form-label">Reddito</label> <select id="redditoAgg"
                                    class="col-7 form-control">
                                    <option value="basso" selected>meno di 10.000 €</option>
                                    <option value="medio">da 10.000 a 20.000 €</option>
                                    <option value="alto">pi&ugrave; di 20.000 €</option>
                                </select> </div>
                            <div class="form-check form-check-inline"> <input class="form-check-input" type="radio"
                                    name="sessoAgg" id="sessoAggM" value="option1" required checked> <label
                                    class="form-check-label" for="sessoAggM">Maschio</label> </div>
                            <div class="form-check form-check-inline"> <input class="form-check-input" type="radio"
                                    name="sessoAgg" id="sessoAggF" value="option2" required> <label
                                    class="form-check-label" for="sessoAggF">Femmina</label> </div>
                            <div class="modal-footer"> <button type="submit"
                                    class="btn btn-primary btnGreen">Salva</button> <button type="button"
                                    class="btn btn-danger" data-dismiss="modal">Close</button> </div>
                        </form>
                    </div>
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
                        <div class="modal-footer"> <button type="submit" class="btn btn-primary btnGreen">Cerca</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row no-more-tables" style="min-height: 430px;">
    <button type="button" class="btn btn-primary">Primary</button>  
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
            <tbody id="tabellaPersone"> </tbody>
        </table>
    </div>
    <div class="row">
        <div class="btn-toolbar justify-content-center" id="toolbar" role="toolbar"
            aria-label="Toolbar with button groups">
            <div class="btn-group" role="group" aria-label="First group"> <button type="button" onclick="primaPagina()"
                    id="primaPagina" class="btn btn-primary" style="visibility: hidden"><i
                        class="fas fa-angle-double-left"></i></button> <button type="button"
                    onclick="paginaPrecedente()" id="paginaPrecedente" class="btn btn-primary"
                    style="visibility: hidden"><i class="fas fa-angle-left"></i></button> <button type="button"
                    class="btn btn-primary" id="pageCount" style="visibility: hidden"><b>1</b></button> <button
                    type="button" onclick="paginaSeguente()" id="paginaSeguente" class="btn btn-primary"
                    style="visibility: hidden"><i class="fas fa-angle-right"></i></button> <button type="button"
                    onclick="ultimaPagina()" id="ultimaPagina" class="btn btn-primary" style="visibility: hidden"><i
                        class="fas fa-angle-double-right"></i></button> </div>
        </div>
    </div>
    <div class="modal fade" id="ModalElimina" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Sei sicuro di voler eliminare?</h4>
                </div>
                <div class="modal-footer"> <button type="button" class="btn btn-default btn-danger" data-dismiss="modal"
                        onclick="eliminaPersona()">SI</button> <button type="button" class="btn btn-default btnGreen"
                        data-dismiss="modal">NO</button> </div>
            </div>
        </div>
    </div>
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
</body>

</html>