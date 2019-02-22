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

    convertValoreToReddito(valore) {
        switch (valore) {
            case "meno di 10.000 €":
                return "basso";
            case "da 10.000 a 20.000 €":
                return "medio";
            case "più di 20.000 €":
                return "alto";
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


function activeOrDisableField(me) {
    $(me).prop("readonly", false);
    $(me).focusout(function (event) {
        event.stopPropagation();
        var idInClass = Number($(me).parent().parent().prop("class"));
        var className = $(me).parent().prop("class").split(" ")[0];
        let personaDaMod = persone.find(o => o.id === idInClass);
        var modified = false;
        console.log(personaDaMod.cognome + " - " + $(me).val())

        if (className == "nome") {
            $(me).parent().html(`<input type="text" pattern="^[a-zA-Z ]+$" class="form-control editable" style="text-align:center; background-color:transparent; border: none; " onclick="activeOrDisableField(this)" value="${$(me).val()}" readonly></input>`);
            
            if(personaDaMod.nome != $(me).val())
                modified = true;
        } else if (className == "cognome") {

            $(me).parent().html(`<input type="text" pattern="^[a-zA-Z ]+$" class="form-control editable" style="text-align:center; background-color:transparent; border: none; " onclick="activeOrDisableField(this)" value="${$(me).val()}" readonly ></input>`);
            if(personaDaMod.cognome != $(me).val())
                modified = true;
        } else if (className == "data" ) {

            $(me).html(`
                <input type="date" class="form-control editable dateEditable" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none" value="${$(me).val()}" readonly > 
            `)

            if(personaDaMod.data != $(me).val())
                modified = true;
        } else if (className == "reddito") {

            var selectRedditoBasso = "";
            var selectRedditoMedio = "";
            var selectRedditoAlto = "";
            if ($(me).val() === "basso") selectRedditoBasso = "selected";
            if ($(me).val() === "medio") selectRedditoMedio = "selected";
            if ($(me).val() === "alto") selectRedditoAlto = "selected";

            $(me).html(`
                <select class="form-control editable redditoSelect" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none; ">
                    <option value="basso" ${selectRedditoBasso}>meno di 10.000 €</option>
                    <option value="medio" ${selectRedditoMedio}>da 10.000 a 20.000 €</option>
                    <option value="alto" ${selectRedditoAlto}>pi&ugrave; di 20.000 €</option>
                </select> 
            `)

            if(personaDaMod.reddito != $(me).val())
                modified = true;
        } else if (className == "sesso" ) {

            var sessoM = "";
            var sessoF = "";
            if ($(me).val().toUpperCase() == "MASCHIO") sessoM = "selected";
            if ($(me).val().toUpperCase() == "FEMMINA") sessoF = "selected";

            $(me).html(`
                <select class="form-control editable sessoSelect" onclick="activeOrDisableField(this)" style="text-align-last:center; background-color:transparent; border: none; ">
                    <option value="Maschio" ${sessoM}>Maschio</option>
                    <option value="Femmina" ${sessoF}>Femmina</option>
                </select> 
            `)
            if(personaDaMod.sesso != $(me).val())
                modified = true;
        }

        if (modified) {
            if ($("." + idInClass).parent().children().last().html().includes("dropdown"))
                $("." + idInClass).parent().children().last().html('<div class="optionBtn"><i style="display:inline; margin-right:5px" class="' + idInClass + ' save-modify-inline fas fa-check"></i><i  style="display:inline" class="' + idInClass + ' cancel-modify-inline far fa-times-circle"></i></div>')
        }
        $(me).prop("readonly", true);
    })

    $(me).keypress(function (event) {
        event.stopPropagation();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' || keycode == '16') {
            $(me).blur();
        }
    });
}

$(document).on("click", ".save-modify-inline", function (event) {
    event.stopPropagation();
    var idInClass = Number($(this).prop("class").split(" ")[0]);
    let personaDaMod = persone.find(o => o.id === idInClass);
    var id = persone.indexOf(personaDaMod);
    var pattern = $($(this).parent().parent().parent().find(".nome").html()).prop("pattern");
    console.log(pattern);
    if (new RegExp(pattern).test($($(this).parent().parent().parent().find(".nome").html()).val()) && new RegExp(pattern).test($($(this).parent().parent().parent().find(".cognome").html()).val())) {
        var nome = $($(this).parent().parent().parent().find(".nome").html()).val()
        var cognome = $($(this).parent().parent().parent().find(".cognome").html()).val()
        var sesso = $($(this).parent().parent().parent().find(".sesso").html()).val();
        var data = $($(this).parent().parent().parent().find(".data").html()).val()
        var reddito = $($(this).parent().parent().parent().find(".reddito").html()).val()
        persone[id].nome = nome;
        persone[id].cognome = cognome;
        persone[id].sesso = sesso;
        persone[id].data = data;
        persone[id].reddito = (reddito);
        setIdTmp(idInClass);
        reset("modifica");
        $("#formAggiungi").submit();
    } else {
        if (!new RegExp(pattern).test($($(this).parent().parent().parent().find(".nome").html()).val())) {
            var newBorderColorNome = $(this).parent().parent().parent().find(".nome").html().replace("border: none", "border: 1px solid red");
            $(this).parent().parent().parent().find(".nome").html(newBorderColorNome);
        }else {
            var newBorderColorNome = $(this).parent().parent().parent().find(".nome").html().replace("border: 1px solid red", "border: none");
            $(this).parent().parent().parent().find(".nome").html(newBorderColorNome);
        }
        if (!new RegExp(pattern).test($($(this).parent().parent().parent().find(".cognome").html()).val())) {
            var newBorderColorCognome = $(this).parent().parent().parent().find(".cognome").html().replace("border: none", "border: 1px solid red");
            $(this).parent().parent().parent().find(".cognome").html(newBorderColorCognome);
        }else {
            var newBorderColorCognome = $(this).parent().parent().parent().find(".cognome").html().replace("border: 1px solid red", "border: none");
            $(this).parent().parent().parent().find(".cognome").html(newBorderColorCognome);
        }
    }

})

$(document).on("click", ".cancel-modify-inline", function (event) {
    event.stopPropagation();
    showAll("az");
})



$(document).on('change', '.redditoSelect', function () {
    var selectRedditoBasso = "";
    var selectRedditoMedio = "";
    var selectRedditoAlto = "";
    if ($(this).val() === "basso") selectRedditoBasso = "selected";
    if ($(this).val() === "medio") selectRedditoMedio = "selected";
    if ($(this).val() === "alto") selectRedditoAlto = "selected";
    $(this).parent().html(`
        <select class="form-control editable redditoSelect" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none; ">
            <option value="basso" ${selectRedditoBasso}>meno di 10.000 €</option>
            <option value="medio" ${selectRedditoMedio}>da 10.000 a 20.000 €</option>
            <option value="alto" ${selectRedditoAlto}>pi&ugrave; di 20.000 €</option>
        </select> 
    `)
    console.log($(this).val());
})

$(document).on('change', '.dateEditable', function () {
    var idInClass = Number($(this).parent().parent().prop("class"));
    var className = $(this).parent().prop("class").split(" ")[0];
    let personaDaMod = persone.find(o => o.id === idInClass);
    var modified = false;
    console.log(idInClass)
    if (personaDaMod.data != $(this).val()) {
        $(this).parent().parent().children().last().html('<div class="optionBtn"><i style="display:inline; margin-right:5px" class="' + idInClass + ' save-modify-inline fas fa-check"></i><i  style="display:inline" class="' + idInClass + ' cancel-modify-inline far fa-times-circle"></i></div>')
    }
    $(this).parent().html(`
        <input type="date" class="form-control editable dateEditable" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none" value="${$(this).val()}" readonly > 
    `);
})

$(document).on('change', '.sessoSelect', function () {

    var sessoM = "";
    var sessoF = "";
    if ($(this).val().toUpperCase() == "MASCHIO") sessoM = "selected";
    if ($(this).val().toUpperCase() == "FEMMINA") sessoF = "selected";

    $(this).html(`
        <select class="form-control editable sessoSelect" style="text-align-last:center; background-color:transparent; border: none; ">
            <option value="Maschio" ${sessoM}>Maschio</option>
            <option value="Femmina" ${sessoF}>Femmina</option>
        </select> 
    `)

    console.log($(this).val());
})


$(document).ready(function () {

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

    if (currentPage > 0) {
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
    // SETTO TUTTO A DEFAULT
    $("#nomeAgg").val("");
    $("#cognomeAgg").val("");
    $("#dataAgg").val("1990-01-01");
    $("#redditoAgg").val("basso");
    $("#emailAggField").hide();
    $("#emailAgg").removeAttr("required");
    $("#passwordAggField").hide();
    $("#passwordRegister").removeAttr("required");


    $("#nomeAggField").show();
    $("#cognomeAggField").show();
    $("#dataAggField").show();
    $("#redditoAggField").show();
    $("#sessoAggFieldM").show();
    $("#sessoAggFieldF").show();

    if (what == "aggiungi") {
        $(".labelDialog").text("Aggiungi persona");
        $("#typeOfSubmit").val("aggiungi");

        $("#nomeAgg").prop("required", true);
        $("#cognomeAgg").prop("required", true);
    } else if (what == "rimuovi") {
        let personaDaMod = persone.find(o => o.id === idTmp);
        $("#idPersonaRemovePerson").val(personaDaMod.id)
    } else if (what == "cerca") {
        $("#nomeCerca").prop('readonly', true);
        $("#nomeCerca").val("");
        $("#cognomeCerca").prop('readonly', true);
        $("#cognomeCerca").val("");
        $("#dataCerca").prop('readonly', true);
        $("#dataCerca").val("");
        $("#redditoCerca").prop('disabled', 'disabled');
        $("#emailAggField").hide();
        $("#passwordAggField").hide();

        $("#sessoCercaM").prop("checked", false);
        $("#sessoCercaF").prop("checked", false);
        $("#nomeCheckBox").prop("checked", false);
        $("#cognomeCheckBox").prop("checked", false);
        $("#dataCheckBox").prop("checked", false);
        $("#redditoCheckBox").prop("checked", false);
    } else if (what == "registrati") {
        $(".labelDialog").text("Registrazione");
        $("#typeOfSubmit").val("registrazione");

        // ATTIVO CIO CHE MI SERVE
        $("#passwordAggField").show();
        $("#emailAggField").show();
        $("#emailAgg").prop("required", true);
        $("#passwordRegister").prop("required", true);

        // DISATTIVO CIO CHE NON MI SERVE
        $("#nomeAggField").hide();
        $("#nomeAgg").removeAttr("required");
        $("#cognomeAggField").hide();
        $("#cognomeAgg").removeAttr("required");
        $("#dataAggField").hide();
        $("#redditoAggField").hide();
        $("#sessoAggFieldM").hide();
        $("#sessoAggFieldF").hide();
    }
    else {
        let personaDaMod = persone.find(o => o.id === idTmp);
        $(".labelDialog").text("Modifica persona");
        $("#typeOfSubmit").val("modifica");
        $("#emailAggField").hide();
        $("#passwordAggField").hide();
        $("#idPersona").val(personaDaMod.id);

        $("#nomeAgg").val(personaDaMod.nome);
        $("#cognomeAgg").val(personaDaMod.cognome);
        $("#dataAgg").val(personaDaMod.data);
        $("#redditoAgg").val(personaDaMod.reddito);

        if (personaDaMod.sesso === $("#sessoAggF").val()) {
            $("#sessoAggF").prop("checked", true);
        }
        if (personaDaMod.sesso === $("#sessoAggM").val()) {
            $("#sessoAggM").prop("checked", true);
        }
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
    addRecordToScreen(id, nome, cognome, data, reddito, sesso);
}

function addRecordToScreen(id, nome, cognome, data, reddito, sesso) {

    var index = persone.findIndex(e => e.id == id);

    var selectRedditoBasso = "";
    var selectRedditoMedio = "";
    var selectRedditoAlto = "";
    if (reddito === "basso") selectRedditoBasso = "selected";
    if (reddito === "medio") selectRedditoMedio = "selected";
    if (reddito === "alto") selectRedditoAlto = "selected";

    var sessoM = "";
    var sessoF = "";
    if (sesso.toUpperCase() == "MASCHIO") sessoM = "selected";
    if (sesso.toUpperCase() == "FEMMINA") sessoF = "selected";

    var appenTo = `
        <tr class=${id}>
            <td class='nome editableField'>
                <input type="text" pattern="^[a-zA-Z ]+$" class="form-control editable" style="text-align:center; background-color:transparent; border: none; " onclick="activeOrDisableField(this)" value="${nome}" readonly > 
            </td>
            <td class='cognome editableField'>
                <input type="text" pattern="^[a-zA-Z ]+$" class="form-control editable" style="text-align:center; background-color:transparent; border: none; " onclick="activeOrDisableField(this)" value="${cognome}" readonly > 
            </td>
            <td class='data editableField'>
                <input type="date" class="form-control editable dateEditable" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none" value="${data}" readonly > 
            </td>
            <td class='reddito editableField'>
                <select class="form-control editable" onclick="activeOrDisableField(this)" style="text-align:center; background-color:transparent; border: none; ">
                    <option value="basso" ${selectRedditoBasso}>meno di 10.000 €</option>
                    <option value="medio" ${selectRedditoMedio}>da 10.000 a 20.000 €</option>
                    <option value="alto" ${selectRedditoAlto}>pi&ugrave; di 20.000 €</option>
                </select> 
            </td>
            <td class='sesso' >
                <select class="form-control editable sessoSelect" onclick="activeOrDisableField(this)" style="text-align-last:center; background-color:transparent; border: none; ">
                    <option value="Maschio" ${sessoM}>Maschio</option>
                    <option value="Femmina" ${sessoF}>Femmina</option>
                </select> 
            </div>
            </td>"
    
    `
    appenTo += '<td class="text-right dropdown ' + id + '"><div class="optionBtn"><img class="VerticalOptions" src="img/VerticalOptions.png" data-toggle="dropdown" onclick="setIdTmp(' + id + '); reset();"><ul class="dropdown-menu dropdown-menu dropdown-menu-right"><li class=""><a data-toggle="modal" data-target="#ModalAggiungi">Modifica</a></li><li class=""><a data-toggle="modal" data-target="#ModalElimina" onclick="reset(\'rimuovi\')">Elimina</a></li></ul></div></td>';

    $("#tabellaPersone").append(appenTo);
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
                addRecordToScreen(persone[e].id, persone[e].nome, persone[e].cognome, persone[e].data, persone[e].reddito, persone[e].sesso);
            }
        }
    }

    var maxPage = Math.round((persone.length / elementForPage + 0.4) - 1);

    if (currentPage == 0 && currentPage != maxPage) {
        $("#paginaPrecedente").css("visibility", "hidden");
        $("#primaPagina").css("visibility", "hidden");
    } else {
        $("#primaPagina").css("visibility", "hidden");
        $("#ultimaPagina").css("visibility", "hidden");
        $("#paginaPrecedente").css("visibility", "hidden");
        $("#paginaSeguente").css("visibility", "hidden");
        $("#pageCount").css("visibility", "hidden")
    }

    if (maxPage > 0) {
        $("#pageCount").css("visibility", "visible")
    }
    else {
        $("#primaPagina").css("visibility", "hidden");
        $("#ultimaPagina").css("visibility", "hidden");
        $("#paginaPrecedente").css("visibility", "hidden");
        $("#paginaSeguente").css("visibility", "hidden");
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
