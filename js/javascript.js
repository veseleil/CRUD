class Persona {
    constructor(nome, cognome, data, reddito, sesso, id, email, password) {
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
        this.reddito = reddito;
        this.sesso = sesso;
        this.id = id;
        this.email = email;
        this.password = password;
    }

    modifica(nome, cognome, data, reddito, sesso) {
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
        this.reddito = reddito;
        this.sesso = sesso;
    }

    convertRedditoToValore() {
        switch (this.reddito) {
            case "basso":
                return "meno di 10.000 €";
            case "medio":
                return "da 10.000 a 20.000 €";
            case "alto":
                return "più di 20.000 €";
        }
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
/*
persone.push(new Persona("Gianmaria", "Rovelli", "2001-06-02", "basso", "Maschio", persone.length));
addRecordToScreen(persone.length - 1, "Gianmaria", "Rovelli", "2001-06-02", "basso", "Maschio");
persone.push(new Persona("Federica", "Gatti", "2007-02-08", "medio", "Femmina", persone.length));
addRecordToScreen(persone.length - 1, "Federica", "Gatti", "2001-06-02", "medio", "Femmina");
showAll("az");
*/

$("#nomeCheckBox").change(function () {

    if (this.checked) {
        $("#nomeCerca").prop('readonly', false);
        $("#nomeCerca").prop('required', true);
    } else {
        $("#nomeCerca").prop('readonly', true);
        $("#nomeCerca").removeAttr('required');
    }
});

$("#cognomeCheckBox").change(function () {

    if (this.checked) {
        $("#cognomeCerca").prop('readonly', false);
        $("#cognomeCerca").prop('required', true);
    } else {
        $("#cognomeCerca").prop('readonly', true);
        $("#cognomeCerca").removeAttr('required');
    }
});

$("#dataCheckBox").change(function () {

    if (this.checked) {
        $("#dataCerca").prop('readonly', false);
        $("#dataCerca").prop('required', true);
    } else {
        $("#dataCerca").prop('readonly', true);
        $("#dataCerca").removeAttr('required');
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
    $("#redditoAgg").val("basso");
    $("#emailAggField").hide();

    if (what == "aggiungi") {
        $(".labelDialog").text("Aggiungi persona");
        $("#typeOfSubmit").val("aggiungi");
        $("#emailAggField").show();
    } else if (what == "cerca") {
        $("#nomeCerca").prop('readonly', true);
        $("#nomeCerca").val("");
        $("#cognomeCerca").prop('readonly', true);
        $("#cognomeCerca").val("");
        $("#dataCerca").prop('readonly', true);
        $("#dataCerca").val("");
        $("#redditoCerca").prop('disabled', 'disabled');
        $("#emailAggField").hide();

        $("#sessoCercaM").prop("checked", false);
        $("#sessoCercaF").prop("checked", false);
        $("#nomeCheckBox").prop("checked", false);
        $("#cognomeCheckBox").prop("checked", false);
        $("#dataCheckBox").prop("checked", false);
        $("#redditoCheckBox").prop("checked", false);
    }
    else {
        let personaDaMod = persone.find(o => o.id === idTmp);
        $(".labelDialog").text("Modifica persona");
        $("#typeOfSubmit").val("modifica");
        $("#emailAggField").hide();
        $("#idPersona").val(personaDaMod.id);

        $("#nomeAgg").val(personaDaMod.nome);
        $("#cognomeAgg").val(personaDaMod.cognome);
        $("#dataAgg").val(personaDaMod.data);
        $("#redditoAgg").val(personaDaMod.reddito);

        $("#sessoAgg").val(personaDaMod.sesso);
    }
}

function salva() {
    if ($(".labelDialog").text().toUpperCase().includes("AGGIUNGI")) {
        aggiungiPersona();
    } else {
        modificaPersona();
        showAll("az");
    }

    $('#ModalAggiungi').modal('hide')
    return false;
}

function copia() {
    var redditoToShow = 0;
    var numeroCopie = 1;
    for (var i = 0; i < numeroCopie; i++) {
        persone.push(new Persona(persone[idTmp].nome, persone[idTmp].cognome, persone[idTmp].data, persone[idTmp].reddito, persone[idTmp].sesso, persone.length));
        addRecordToScreen(persone.length - 1, persone[idTmp].nome, persone[idTmp].cognome, persone[idTmp].data, persone[idTmp].reddito, persone[idTmp].sesso);
    }

    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
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
            addRecordToScreen(element.id, element.nome, element.cognome, element.data, element.reddito, element.sesso);
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

            if (redditoCerca != undefined) {
                if (element.reddito.includes(redditoCerca)) {
                    aggiungi = true;
                }
            }
            if (sessoCerca != undefined) {
                if (element.sesso.includes(sessoCerca)) {
                    aggiungi = true;
                }
            }

            if (aggiungi) {
                addRecordToScreen(element.id, element.nome, element.cognome, element.data, element.reddito, element.sesso);
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

    var id = persone.length;
    persone.push(new Persona(nome, cognome, (data), reddito, sesso, id));

    // var appenTo = "<tr class=\"" + id + "\"><td>" + nome + "</td><td>" + cognome + "</td><td>" + formattedDate(new Date(data)) + "</td><td>" + reddito + "</td><td>" + sesso + "</td>";

    // appenTo += '<td class="text-right dropdown ' + id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu dropdown-menu dropdown-menu-right"><li><a class="blue-back" data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li><a class="blue-back" data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

    // $("#tabellaPersone").append(appenTo);
    addRecordToScreen(id, nome, cognome, data, reddito, sesso);
}

function addRecordToScreen(id, nome, cognome, data, reddito, sesso) {

    var index = persone.findIndex(e => e.id == id);
    reddito = persone[index].convertRedditoToValore();
    var appenTo = "<tr class=\"" + id + "\"><td class='editable-field nome'>" + nome + "</td><td class='editable-field cognome'>" + cognome + "</td><td class='editable-data'>" + formattedDate(new Date(data)) + "</td><td class='editable-reddito'>" + reddito + "</td><td class='editable-sesso'>" + sesso + "</td>";

    appenTo += '<td class="text-right dropdown ' + id + '"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu dropdown-menu dropdown-menu-right"><li class=""><a data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li class=""><a data-toggle="modal" onclick="copia()">Copia</a></li><li class=""><a data-toggle="modal" data-target="#ModalElimina">Elimina</a></li></ul></td>';

    $("#tabellaPersone").append(appenTo);

    /*

    $(".editable-field").click(function () {
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        var param = $(this).prop('class').split(' ')[1];
        var width = $(this).width();
        var testo;
        if ($(this).html().indexOf("<br>") != -1 && $(this).html().indexOf("<br>") != 0) {
            testo = $(this).html().substring(0, $(this).html().indexOf("<br>"));
        } else {
            testo = $(this).html();
        }

        if (testo == persone[index][param]) {
            $(this).html("<input type='text' value='" + persone[index][param] + "'/>");
        }
        $(this).find($('input')).focusout({ index: index, param: param }, function () {
            if ($(this).val() != "" && !(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>[0-9\]\/?]/).test($(this).val())) {
                persone[index][param] = $(this).val();
                $(this).parent().text(persone[index][param]);
            } else {
                $(this).parent().html(persone[index][param] + "<br><font size='2' color='red'>non valido</font>");
            }
        })

    })

    $(".editable-reddito").click(function () {
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        if ($(this).children().length == 0) {
            $(this).html(`
            <select>
                <option value="basso">meno di 10.000 €</option>
                <option value="medio">da 10.000 a 20.000 €</option>
                <option value="alto">pi&ugrave; di 20.000 €</option>
            </select>
            `);
            $(this).find($('select')).val(persone[index].reddito);
            //$(this).css("width", "450px");
        }

        $(this).find($('select')).focusout({ index: index }, function () {
            persone[index].reddito = $(this).val();
            $(this).parent().text(persone[index].convertRedditoToValore());
        })
    })

    $(".editable-sesso").click(function () {
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        if ($(this).children().length == 0) {
            $(this).html(`
            <select>
                <option value="Maschio">Maschio</option>
                <option value="Femmina">Femmina</option>
            </select>
            `);
            $(this).find($('select')).val(persone[index].sesso);
        }

        $(this).find($('select')).focusout({ index: index }, function () {
            persone[index].sesso = $(this).val();
            $(this).parent().text(persone[index].sesso);
        })
    })

    $(".editable-reddito").click(function () {
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        if ($(this).children().length == 0) {
            $(this).html(`
            <select>
                <option value="basso">meno di 10.000 €</option>
                <option value="medio">da 10.000 a 20.000 €</option>
                <option value="alto">pi&ugrave; di 20.000 €</option>
            </select>
            `);
            $(this).find($('select')).val(persone[index].reddito);
        }

        $(this).find($('select')).focusout({ index: index }, function () {
            persone[index].reddito = $(this).val();
            $(this).parent().text(persone[index].convertRedditoToValore());
        })
    })

    $(".editable-data").click(function () {
        var testo = $(this).text().split('-').reverse().join('-');
        var id = $(this).parent().prop("class");
        var index = persone.findIndex(e => e.id == id);
        if (testo != "" && testo != undefined) {
            $(this).html("<input type='date' value='" + testo + "'/>");
            $(this).css("width", "20%");

            $(this).find($('input')).focusout({ index: index }, function () {
                persone[index].data = $(this).val();
                $(this).parent().text(formattedDate(new Date(persone[index].data)));
            })
        }
    })

    */
}

function modificaPersona() {
    $("#lblNomeAgg").val("");
    $("#lblCognomeAgg").val("");
    var nome = $("#nomeAgg").val();
    var cognome = $("#cognomeAgg").val();
    var data = $("#dataAgg").val();
    var reddito = $("#redditoAgg").val();

    var sesso = "";
    if ($("#sessoAggM").prop("checked") == true) {
        sesso = "Maschio";
    } else {
        sesso = "Femmina";
    }

    let personaDaMod = persone.find(o => o.id === idTmp);
    persone[persone.indexOf(personaDaMod)].modifica(nome, cognome, (data), reddito, sesso);
}

function eliminaPersona() {
    persone.splice(idTmp, 1);

    var maxPage = Math.round((persone.length / elementForPage + 0.5) - 1);
    if (maxPage == 1) {
        $("#pageCount").text("1");
        $("#pageCount").css("visibility", "hidden");
        $("#paginaPrecedente").css("visibility", "hidden");
        $("#primaPagina").css("visibility", "hidden");
        currentPage = 0;
    }


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

                addRecordToScreen(persone[e].id, persone[e].nome, persone[e].cognome, persone[e].data, persone[e].reddito, persone[e].sesso);
            }
        }
    } else {

        for (var e = (currentPage * elementForPage) + elementForPage - 1; e > currentPage * elementForPage - 1; e--) {
            if (persone[e] != undefined) {
                var redditoToShow = 0;

                addRecordToScreen(persone[e].id, persone[e].nome, persone[e].cognome, persone[e].data, persone[e].reddito, persone[e].sesso);
            }
        }
    }

    var maxPage = Math.round((persone.length / elementForPage + 0.4) - 1);
    if (maxPage > 0)
        $("#pageCount").css("visibility", "visible")
    else {
        $("#pageCount").css("visibility", "hidden")
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