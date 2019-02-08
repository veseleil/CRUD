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

var elementForPage = 10;
var currentPage = 0;

persone.push(new Persona("gatto", "miao", "2001-06-02", 1, "Maschio", persone.length));
addRecordToScreen(persone.length, "gatto", "miao", "2001-06-02", 1, "Maschio");
showAll("az");

$("#nomeCheckBox").change(function () {

    if (this.checked) {
        $("#nomeCerca").prop('readonly', false);
    } else {
        $("#nomeCerca").prop('readonly', true);
    }
});

$("#cognomeCheckBox").change(function () {

    if (this.checked) {
        $("#cognomeCerca").prop('readonly', false);
    } else {
        $("#cognomeCerca").prop('readonly', true);
    }
});

$("#dataCheckBox").change(function () {

    if (this.checked) {
        $("#dataCerca").prop('readonly', false);
    } else {
        $("#dataCerca").prop('readonly', true);
    }
});

$("#redditoCheckBox").change(function () {

    if (this.checked) {
        $("#redditoCerca").removeAttr('disabled');
    } else {
        $("#redditoCerca").prop('disabled', 'disabled');
    }
});

function paginaSeguente() {
    currentPage = currentPage + 1;
    $("#pageCount").text(currentPage + 1);
    showAll("az");

    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    if (currentPage > maxPage - 1) {
        $("#paginaSeguente").css("visibility", "hidden");
        $("#ultimaPagina").css("visibility", "hidden");
    } else {
        $("#paginaSeguente").css("visibility", "visible")
        $("#ultimaPagina").css("visibility", "visible");
    }

    if (currentPage > 0) {
        $("#paginaPrecedente").css("visibility", "visible")
        $("#primaPagina").css("visibility", "visible");
    }
}

function paginaPrecedente() {

    currentPage = currentPage - 1;
    $("#pageCount").text(currentPage + 1);
    showAll("az");

    if (currentPage == 0) {
        $("#paginaPrecedente").css("visibility", "hidden")
        $("#primaPagina").css("visibility", "hidden");
    } else {
        $("#paginaPrecedente").css("visibility", "visible")
        $("#primaPagina").css("visibility", "visible");
    }

    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    if (currentPage < maxPage) {
        $("#paginaSeguente").css("visibility", "visible")
        $("#ultimaPagina").css("visibility", "visible");
    }
}

function primaPagina() {
    currentPage = 0;
    $("#pageCount").text(currentPage + 1);
    showAll("az");
    $("#paginaPrecedente").css("visibility", "hidden")
    $("#primaPagina").css("visibility", "hidden");
    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    if (maxPage + 1 == 1) {
        $("#paginaSeguente").css("visibility", "hidden");
        $("#ultimaPagina").css("visibility", "hidden");
    } else {
        $("#paginaSeguente").css("visibility", "visible");
        $("#ultimaPagina").css("visibility", "visible");
    }
}

function ultimaPagina() {
    currentPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    $("#pageCount").text(currentPage + 1);
    showAll("az");

    $("#paginaSeguente").css("visibility", "hidden")
    $("#ultimaPagina").css("visibility", "hidden");
    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    if (maxPage + 1 == 1) {
        $("#paginaPrecedente").css("visibility", "hidden");
        $("#primaPagina").css("visibility", "hidden");
    } else {
        $("#paginaPrecedente").css("visibility", "visible");
        $("#primaPagina").css("visibility", "visible");
    }
}

function reset(what) {
    $("#nomeAgg").val("");
    $("#cognomeAgg").val("");
    $("#dataAgg").val("1990-01-01");

    if (what == "aggiungi") {
        $("#labelDialog").text("Aggiungi persona");
    } else if (what == "cerca") {
        $("#nomeCerca").prop('readonly', true);
        $("#nomeCerca").val("");
        $("#cognomeCerca").prop('readonly', true);
        $("#cognomeCerca").val("");
        $("#dataCerca").prop('readonly', true);
        $("#dataCerca").val("");
        $("#redditoCerca").prop('disabled', 'disabled');

        $("#sessoCercaM").prop("checked", false);
        $("#sessoCercaF").prop("checked", false);
        $("#nomeCheckBox").prop("checked", false);
        $("#cognomeCheckBox").prop("checked", false);
        $("#dataCheckBox").prop("checked", false);
        $("#redditoCheckBox").prop("checked", false);
    }
    else {
        $("#labelDialog").text("Modifica persona");

        $("#nomeAgg").val(persone[idTmp].nome);
        $("#cognomeAgg").val(persone[idTmp].cognome);
        $("#dataAgg").val(persone[idTmp].data);
        $("#redditoAgg").prop('selectedIndex', persone[idTmp].reddito);

        //$("#sessoAgg").val(persone[idTmp].sesso);
        if (persone[idTmp].sesso) {
            $("#sessoAggM").prop("checked") = true;
            $("#sessoAggF").prop("checked") = false;
        } else {
            $("#sessoAggF").prop("checked") = true;
            $("#sessoAggM").prop("checked") = false;
        }
    }
}

function salva() {
    if ($("#labelDialog").text().toUpperCase().includes("AGGIUNGI")) {
        aggiungiPersona();
    } else {
        modificaPersona();
        showAll("az");
    }

    $('#ModalAggiungi').modal('hide')
    return false;
}

function copia() {
    console.log("leggimi");
    var redditoToShow = 0;
    var numeroCopie = 10;
    for (var i = 0; i < numeroCopie; i++) {
        switch (persone[idTmp].reddito) {
            case 0:
                redditoToShow = "meno di 10.000 €";
                break;

            case 1:
                redditoToShow = "da 10.000 a 20.000 €";
                break;

            case 2:
                redditoToShow = "più di 20.000 €";
                break;
        }
        persone.push(new Persona(persone[idTmp].nome, persone[idTmp].cognome, persone[idTmp].data, persone[idTmp].reddito, persone[idTmp].sesso, persone.length));
        addRecordToScreen(persone.length - 1, persone[idTmp].nome, persone[idTmp].cognome, persone[idTmp].data, redditoToShow, persone[idTmp].sesso);
    }
    console.log("ciao son");

    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    console.log(maxPage + " - " + currentPage);
    if (maxPage + 1 > 1) {
        if (currentPage < maxPage) {
            $("#paginaSeguente").css("visibility", "visible")
            $("#ultimaPagina").css("visibility", "visible");
        }
    }

    showAll("az");
}

function cerca() {
    var nomeCerca;
    var cognomeCerca;
    var dataCerca;
    var redditoCerca;
    var sessoCerca;

    if (!$("#nomeCheckBox").prop("checked") && !$("#cognomeCheckBox").prop("checked") && !$("#dataCheckBox").prop("checked") && !$("#redditoCheckBox").prop("checked") && !($("#sessoCercaF").prop("checked") || $("#sessoCercaM").prop("checked"))) {
        $("#tabellaPersone").children().remove();
        persone.forEach(element => {
            var redditoToShow = 0;
            switch (element.reddito) {
                case 0:
                    redditoToShow = "meno di 10.000 €";
                    break;

                case 1:
                    redditoToShow = "da 10.000 a 20.000 €";
                    break;

                case 2:
                    redditoToShow = "più di 20.000 €";
                    break;
            }
            addRecordToScreen(element.id, element.nome, element.cognome, element.data, redditoToShow, element.sesso);
        });
    } else {
        if ($("#nomeCheckBox").prop("checked") == true) {
            nomeCerca = $("#nomeCerca").val();
        }
        if ($("#cognomeCheckBox").prop("checked") == true) {
            cognomeCerca = $("#cognomeCerca").val();
        }
        if ($("#dataCheckBox").prop("checked") == true) {
            dataCerca = $("#dataCerca").val();
        }
        if ($("#redditoCheckBox").prop("checked") == true) {
            redditoCerca = $("#redditoCerca").val();
        }
        if ($("#sessoCercaF").prop("checked") == true) {
            sessoCerca = "Femmina";
        }
        if ($("#sessoCercaM").prop("checked") == true) {
            sessoCerca = "Maschio";
        }


        $("#tabellaPersone").children().remove();
        persone.forEach(element => {
            var aggiungi = false;
            if (nomeCerca != undefined) {
                if (element.nome.includes(nomeCerca)) {
                    aggiungi = true;
                }
            }
            if (cognomeCerca != undefined) {
                if (element.cognome.includes(cognomeCerca)) {
                    aggiungi = true;
                }
            }
            if (dataCerca != undefined) {
                if (element.data.includes(dataCerca)) {
                    aggiungi = true;
                }
            }
            var redditoToShow = 0;
            if (redditoCerca != undefined) {
                switch (element.reddito) {
                    case 0:
                        redditoToShow = "meno di 10.000 €";
                        break;

                    case 1:
                        redditoToShow = "da 10.000 a 20.000 €";
                        break;

                    case 2:
                        redditoToShow = "più di 20.000 €";
                        break;
                }
                if (redditoToShow.includes(redditoCerca)) {
                    aggiungi = true;
                }
            }
            if (sessoCerca != undefined) {
                if (element.sesso.includes(sessoCerca)) {
                    aggiungi = true;
                }
            }

            if (aggiungi) {
                addRecordToScreen(element.id, element.nome, element.cognome, element.data, redditoToShow, element.sesso);
            }
        });
    }

    $('#ModalCerca').modal('hide')
    return false;
}

function aggiungiPersona() {
    var nome = $("#nomeAgg").val();
    var cognome = $("#cognomeAgg").val();
    var data = $("#dataAgg").val();
    var reddito = $("#redditoAgg").val();
    //var sesso = $("#sessoAgg").val();
    $("#lblNomeAgg").val("Nome");
    $("#lblCognomeAgg").val("Cognome");

    var sesso = "";
    if ($("#sessoAggM").prop("checked") == true) {
        sesso = "Maschio";
    } else {
        sesso = "Femmina";
    }

    var redditoToAdd = 0;
    switch (reddito) {
        case "meno di 10.000 $":
            redditoToAdd = 0;
            break;

        case "da 10.000 a 20.000 $":
            redditoToAdd = 1;
            break;

        case "più di 20.000 $":
            redditoToAdd = 2;
            break;
    }

    var id = persone.length;
    persone.push(new Persona(nome, cognome, (data), redditoToAdd, sesso, id));

    // var appenTo = "<tr class=\"" + id + "\"><td>" + nome + "</td><td>" + cognome + "</td><td>" + formattedDate(new Date(data)) + "</td><td>" + reddito + "</td><td>" + sesso + "</td>";

    // appenTo += '<td class="text-right dropdown ' + id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu dropdown-menu dropdown-menu-right"><li><a class="blue-back" data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li><a class="blue-back" data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

    // $("#tabellaPersone").append(appenTo);
    addRecordToScreen(id, nome, cognome, data, reddito, sesso);
}

function addRecordToScreen(id, nome, cognome, data, reddito, sesso) {
    var appenTo = "<tr class=\"" + id + "\"><td class='editable-field'>" + nome + "</td><td class='editable-field'>" + cognome + "</td><td class='editable-data'>" + formattedDate(new Date(data)) + "</td><td class='editable-reddito'>" + reddito + "</td><td class='editable-sesso'>" + sesso + "</td>";

    appenTo += '<td class="text-right dropdown ' + id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu dropdown-menu dropdown-menu-right"><li class=""><a class="" data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li class=""><a data-toggle="modal" onclick="copia()">Copia</a></li><li class=""><a data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

    $("#tabellaPersone").append(appenTo);


    $(".editable-field").click(function () {
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        console.log(index);
        var width = $(this).width();
        console.log(1,$(this), $(this).first())
        $(this).html("<input type='text' value='" + ($(this).text() == persone[index].nome ? persone[index].nome : $(this).first().value) + "'/>");
        $(this).css("width", width + "px");
        $(this).find($('input')).focus();

    })

    $(".editable-reddito").click(function () {
        var testo = $(this).text().split('-').reverse().join('-');
        console.log(testo)
        var width = $(this).width() + 10;
        if (testo != "" && testo != undefined) {
            $(this).html(`
            <select>
                <option selected>meno di 10.000 €</option>
                <option>da 10.000 a 20.000 €</option>
                <option>pi&ugrave; di 20.000 €</option>
            </select>
            `);
            $(this).css("width", width + "px");
        }
    })

    $(".editable-data").click(function () {
        var testo = $(this).text().split('-').reverse().join('-');
        console.log(testo)
        var width = $(this).width() + 10;
        if (testo != "" && testo != undefined) {
            $(this).html("<input type='date' value='" + testo + "'/>");
            $(this).css("width", width + "px");
        }
    })
}

function editNome(id) {
    console.log($("#" + id).find($("td").html("<input type='text' value='ciao'/>")));
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
        case "meno di 10.000 €":
            redditoToAdd = 0;
            break;

        case "da 10.000 a 20.000€":
            redditoToAdd = 1;
            break;

        case "più di 20.000 €":
            redditoToAdd = 2;
            break;
    }

    var sesso = "";
    if ($("#sessoAggM").prop("checked") == true) {
        sesso = "Maschio";
    } else {
        sesso = "Femmina";
    }

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

        for (var e = currentPage * elementForPage; e < (currentPage * elementForPage) + elementForPage; e++) {
            if (persone[e] != undefined) {
                var redditoToShow = 0;
                switch (persone[e].reddito) {
                    case 0:
                        redditoToShow = "meno di 10.000 €";
                        break;

                    case 1:
                        redditoToShow = "da 10.000 a 20.000 €";
                        break;

                    case 2:
                        redditoToShow = "più di 20.000 €";
                        break;
                }

                addRecordToScreen(persone[e].id, persone[e].nome, persone[e].cognome, persone[e].data, redditoToShow, persone[e].sesso);
            }
        }
    } else {

        for (var e = (currentPage * elementForPage) + elementForPage - 1; e > currentPage * elementForPage - 1; e--) {
            console.log("aeryu");
            if (persone[e] != undefined) {
                var redditoToShow = 0;
                console.log("aeryuciao");
                switch (persone[e].reddito) {
                    case 0:
                        redditoToShow = "meno di 10.000 €";
                        break;

                    case 1:
                        redditoToShow = "da 10.000 a 20.000 €";
                        break;

                    case 2:
                        redditoToShow = "più di 20.000 €";
                        break;
                }

                addRecordToScreen(persone[e].id, persone[e].nome, persone[e].cognome, persone[e].data, redditoToShow, persone[e].sesso);
            }
        }
    }
}

function selezionato(selezionato) {
    var selezionato;
    if (selezionato == "nome") {
        $("#headercognome").html("Cognome");
        $("#headerdata").html("Data Nascita");
        $("#headerredd").html("Reddito");
        $("#headersesso").html("Sesso");
    } else if (selezionato == "cognome") {
        $("#headernome").html("Nome");
        $("#headerdata").html("Data Nascita");
        $("#headerredd").html("Reddito");
        $("#headersesso").html("Sesso");
    } else if (selezionato == "data") {
        $("#headernome").html("Nome");
        $("#headercognome").html("Cognome");
        $("#headerredd").html("Reddito");
        $("#headersesso").html("Sesso");
    } else if (selezionato == "reddito") {
        $("#headernome").html("Nome");
        $("#headercognome").html("Cognome");
        $("#headerdata").html("Data Nascita");
        $("#headersesso").html("Sesso");
    } else if (selezionato == "sesso") {
        $("#headernome").html("Nome");
        $("#headercognome").html("Cognome");
        $("#headerdata").html("Data Nascita");
        $("#headerredd").html("Reddito");
    }
}

function ordinaPerNome() {


    persone.sort(compareNome);

    showAll(ordinaNomeType);

    if (ordinaNomeType == "az") {
        $("#headernome").html("Nome <i class='fas fa-sort-up'></i>");
        selezionato("nome");
        ordinaNomeType = "za";
    } else if (ordinaNomeType == "za") {

        $("#headernome").html("Nome <i class='fas fa-sort-down'></i>");
        selezionato("nome");
        ordinaNomeType = "az";

    }

}

function ordinaPerCognome() {
    if (ordinaNomeType == "az")
        persone.sort(compareCognome);

    showAll(ordinaCognomeType);

    if (ordinaCognomeType == "az") {
        $("#headercognome").html("Cognome <i class='fas fa-sort-up'></i>");
        selezionato("cognome");
        ordinaCognomeType = "za";
    } else {
        $("#headercognome").html("Cognome <i class='fas fa-sort-down'></i>");
        selezionato("cognome");
        ordinaCognomeType = "az";
    }

}

function ordinaPerData() {

    persone.sort(compareData);

    showAll(ordinaDataType);

    if (ordinaDataType == "az") {
        $("#headerdata").html("Data Nascita <i class='fas fa-sort-up'></i>");
        selezionato("data");
        ordinaDataType = "za";
    } else {
        $("#headerdata").html("Data Nascita <i class='fas fa-sort-down'></i>");
        selezionato("data");
        ordinaDataType = "az";
    }

}

function ordinaPerReddito() {

    persone.sort(compareReddito);

    showAll(ordinaRedditoType);

    if (ordinaRedditoType == "az") {
        $("#headerredd").html("Reddito <i class='fas fa-sort-up'></i>");
        selezionato("reddito");
        ordinaRedditoType = "za";
    } else {
        $("#headerredd").html("Reddito <i class='fas fa-sort-down'></i>");
        selezionato("reddito");
        ordinaRedditoType = "az";
    }

}

function ordinaPerSesso() {

    persone.sort(compareSesso);

    showAll(ordinaSessoType);

    if (ordinaSessoType == "az") {
        $("#headersesso").html("Sesso <i class='fas fa-sort-up'></i>");
        selezionato("sesso");
        ordinaSessoType = "za";
    } else {
        $("#headersesso").html("Sesso <i class='fas fa-sort-down'></i>");
        selezionato("sesso");
        ordinaSessoType = "az";
    }

}

function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}-${month}-${year}`;
}