class Persona {
    constructor(nome, cognome, data, reddito, sesso, id) {
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
        this.reddito = reddito;
        this.sesso = sesso;
        this.id = id;
    }

    modifica(nome, cognome, data, reddito, sesso) {
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
        this.reddito = reddito;
        this.sesso = sesso;
    }
}

var persone = [];
var ordinaNomeType = "az";
var ordinaCognomeType = "az";
var ordinaDataType = "az";
var ordinaRedditoType = "az";
var ordinaSessoType = "az";

var idTmp = 0;

function reset(what) {
    $("#nomeAgg").val(" ");
    $("#cognomeAgg").val(" ");
    $("#dataAgg").val(" ");

    if (what == "aggiungi") {
        $("#labelDialog").text("Aggiungi persona");
    } else {
        $("#labelDialog").text("Modifica persona");

        $("#nomeAgg").val(persone[idTmp].nome);
        $("#cognomeAgg").val(persone[idTmp].cognome);
        $("#dataAgg").val(persone[idTmp].data);
        $("#redditoAgg").prop('selectedIndex', persone[idTmp].reddito);

        $("#sessoAgg").val(persone[idTmp].sesso);
    }
}

function salva() {
    if ($("#labelDialog").text().toUpperCase().includes("AGGIUNGI")) {
        aggiungiPersona();
    } else {
        modificaPersona();
        showAll("az");
    }
}

function aggiungiPersona() {
    var nome = $("#nomeAgg").val();
    var cognome = $("#cognomeAgg").val();
    var data = $("#dataAgg").val();
    var reddito = $("#redditoAgg").val();
    var sesso = $("#sessoAgg").val();
    $("#lblNomeAgg").val("Nome");
    $("#lblCognomeAgg").val("Cognome");

    var redditoToAdd = 0;
    switch (reddito) {
        case "meno di 10.000":
            redditoToAdd = 0;
            break;

        case "da 10.000 a 20.000":
            redditoToAdd = 1;
            break;

        case "più di 20.000":
            redditoToAdd = 2;
            break;
    }

    var id = persone.length;
    persone.push(new Persona(nome, cognome, (data), redditoToAdd, sesso, id));

    var appenTo = "<tr class=\"" + id + "\"><td>" + nome + "</td><td>" + cognome + "</td><td>" + data + "</td><td>" + reddito + "</td><td>" + sesso + "</td>";

    appenTo += '<td class="text-right dropdown ' + id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu"><li><a data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li><a data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

    $("#tabellaPersone").append(appenTo);
}

function modificaPersona() {
    $("#lblNomeAgg").val("");
    $("#lblCognomeAgg").val("");
    var nome = $("#nomeAgg").val();
    var cognome = $("#cognomeAgg").val();
    var data = $("#dataAgg").val();
    var reddito = $("#redditoAgg").val();

     var redditoToAdd = 0;
    switch (reddito) {
        case "meno di 10.000":
            redditoToAdd = 0;
            break;

        case "da 10.000 a 20.000":
            redditoToAdd = 1;
            break;

        case "più di 20.000":
            redditoToAdd = 2;
            break;
    }

    var sesso = $("#sessoAgg").val();

    persone[idTmp].modifica(nome, cognome, (data), redditoToAdd, sesso);
}

function eliminaPersona() {
    persone.splice(idTmp, 1);
    showAll("az");
}

function setIdTmp(id) {
    idTmp = id;
}

function compareNome(e, n) { return e.nome < n.nome ? -1 : e.nome > n.nome ? 1 : 0 }

function compareCognome(o, n) { return o.cognome < n.cognome ? -1 : o.cognome > n.cognome ? 1 : 0 }

function compareReddito(d, e) { return d.reddito < e.reddito ? -1 : d.reddito > e.reddito ? 1 : 0 }

function compareData(d, e) { return new Date(d.data) < new Date(e.data) ? -1 : new Date(d.data) > new Date(e.data) ? 1 : 0 }

function compareSesso(d, e) { return d.sesso < e.sesso ? -1 : d.sesso > e.sesso ? 1 : 0 }

function showAll(type) {
    $("#tabellaPersone").children().remove();
    if (type == "az") {
        for (var e = 0; e < persone.length; e++) {

            var redditoToShow = 0;
            switch (persone[e].reddito) {
                case 0:
                    redditoToShow = "meno di 10.000";
                    break;

                case 1:
                    redditoToShow = "da 10.000 a 20.000";
                    break;

                case 2:
                    redditoToShow = "più di 20.000";
                    break;
            }

            var appenTo = "<tr class=\"" + persone[e].id + "\"><td>" + persone[e].nome + "</td><td>" + persone[e].cognome + "</td><td>" + persone[e].data + "</td><td>" + redditoToShow + "</td><td>" + persone[e].sesso + "</td>";

            appenTo += '<td class="text-right dropdown ' + persone[e].id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + persone[e].id + ')"><ul class="dropdown-menu"><li><a data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li><a data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

            $("#tabellaPersone").append(appenTo);
        }
    } else {
        for (var e = persone.length - 1; e > -1; e--) {
            var redditoToShow = 0;
            switch (persone[e].reddito) {
                case 0:
                    redditoToShow = "meno di 10.000";
                    break;

                case 1:
                    redditoToShow = "da 10.000 a 20.000";
                    break;

                case 2:
                    redditoToShow = "più di 20.000";
                    break;
            }

            var appenTo = "<tr class=\"" + persone[e].id + "\"><td>" + persone[e].nome + "</td><td>" + persone[e].cognome + "</td><td>" + persone[e].data + "</td><td>" + redditoToShow + "</td><td>" + persone[e].sesso + "</td>";

            appenTo += '<td class="text-right dropdown ' + persone[e].id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + persone[e].id + ')"><ul class="dropdown-menu"><li><a data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li><a data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

            $("#tabellaPersone").append(appenTo);
        }
    }
}

function ordinaPerNome() {

    persone.sort(compareNome);

    showAll(ordinaNomeType);

    if (ordinaNomeType == "az") {
        ordinaNomeType = "za";
    } else {
        ordinaNomeType = "az";
    }

}

function ordinaPerCognome() {

    persone.sort(compareCognome);

    showAll(ordinaCognomeType);

    if (ordinaCognomeType == "az") {
        ordinaCognomeType = "za";
    } else {
        ordinaCognomeType = "az";
    }

}

function ordinaPerData() {

    persone.sort(compareData);

    showAll(ordinaDataType);

    if (ordinaDataType == "az") {
        ordinaDataType = "za";
    } else {
        ordinaDataType = "az";
    }

}

function ordinaPerReddito() {

    persone.sort(compareReddito);

    showAll(ordinaRedditoType);

    if (ordinaRedditoType == "az") {
        ordinaRedditoType = "za";
    } else {
        ordinaRedditoType = "az";
    }

}

function ordinaPerSesso() {

    persone.sort(compareSesso);

    showAll(ordinaSessoType);

    if (ordinaSessoType == "az") {
        ordinaSessoType = "za";
    } else {
        ordinaSessoType = "az";
    }

}