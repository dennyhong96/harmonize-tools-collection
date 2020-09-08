//variables for fed tax calculations
let sstax = 0.062;
let fedincometax = 0.02;
let medicare = 0.0145;
// define global variables
let marriagestatus = document.getElementById("fed-filing-status").value;
let yearincome = 0; let periodicincome = 0; let payfreq = "Weekly"; payPeriods = 52;
let pretaxdeductions = 0; let fedincometaxValue = 0; let sstaxValue = 0; let medicareVal = 0;
let posttaxdeductions = 0; let takeHome = 0;
let numAllowances = 0; let numAdditionalAllowances = 0; let additionalWithholdings = 0;
var totalStateTaxes = 0; // variable for total state taxes
var stateAbbreviation = document.getElementById("state-dropdown").value;


//run all functions once with default salary of zero dollars
calcsplitincome(); //this function has function calls to other required functions

//add listeners to state info inputs and special exemptions checkboxes
document.getElementById("state-info").addEventListener("change", function (event) {
    stateTaxCalc(stateAbbreviation);
});
document.getElementById("city-info").addEventListener("change", function (event) {
    stateTaxCalc(stateAbbreviation);
});
document.getElementById("state-exemptions").addEventListener("change", function (event) {
    stateTaxCalc(stateAbbreviation);
});

document.getElementById("pretax").getElementsByClassName("pretax-deduction-amount")[0].addEventListener("change", function (event) {
    calcpretaxamount();
});
document.getElementById("posttax").getElementsByClassName("posttax-deduction-amount")[0].addEventListener("change", function (event) {
    calcposttaxamount();
});

document.getElementById("freq").addEventListener("change", function (event) {
    calcsplitincome();
    calcpretaxamount();
});
document.getElementById("salary-input").addEventListener("change", function (event) {
    calcsplitincome();
    calcpretaxamount();
});
document.getElementById("ss-checkbox").addEventListener("change", function (event) {
    sstaxCalc();
});
document.getElementById("fedincometax-checkbox").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("medicare-checkbox").addEventListener("change", function (event) {
    medicareCalc();
});
// update the state on dropdown
document.getElementById("state-dropdown").addEventListener("change", function (event) {
    var CityTaxOutputElement = document.getElementById("city-tax-output");
    while (CityTaxOutputElement.firstChild) {
        CityTaxOutputElement.removeChild(CityTaxOutputElement.firstChild);
    }
    changeState();
});

//listeners for fed income tax
document.getElementById("fed-filing-status").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("fed-dependent-amount").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("fed-deductions").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("fed-other-income").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("fed-Additional Withholdings").addEventListener("change", function (event) {
    incometax();
});
document.getElementById("fed-multi-jobs").addEventListener("change", function (event) {
    incometax();
});

// loops through each pre-tax deduction row and adds up. Before taxes are calculated,
// this sum is subtracted from total income
function calcpretaxamount() {
    pretaxdeductions = Number(document.getElementById("pretax").getElementsByClassName("pretax-deduction-amount")[0].value);
    for (var a = 1; a <= numberOfPreTaxDeductions; a++) { //loop through each duplicate pretax id
        pretaxdeductions += Number(document.getElementById("pretax" + a).getElementsByClassName("pretax-deduction-amount")[0].value);
    }
    document.getElementById("pretaxdeductions").innerHTML = '$' + addCommas(pretaxdeductions);
    if (pretaxdeductions > periodicincome) {
        pretaxdeductions = periodicincome;
    }
    document.getElementById("gross-pay").innerHTML = '$' + addCommas((periodicincome - pretaxdeductions));
    //re-calculate all fields when this is calculated
    incometax();
    sstaxCalc();
    medicareCalc();
    stateTaxCalc(document.getElementById("state-dropdown").value); //calculate state taxes

    calcTakeHome();
}

// same ideas as pre-tax income. the sume of post-tax income is subtracted before displaying gross pay
function calcposttaxamount() {
    posttaxdeductions = Number(document.getElementById("posttax").getElementsByClassName("posttax-deduction-amount")[0].value);
    for (var b = 1; b <= numberOfPostTaxDeductions; b++) {
        posttaxdeductions += Number(document.getElementById("posttax" + b).getElementsByClassName("posttax-deduction-amount")[0].value);
    }
    document.getElementById("posttaxdeductions").innerHTML = '$' + addCommas(posttaxdeductions);
    calcTakeHome();
}

// calculate federal income tax
function incometax() {

    // check special exemptions
    if (document.getElementById("fedincometax-checkbox").checked == true) {
        fedincometaxValue = 0;
        // call function addCommas to properly format output numbers
        document.getElementById("incometax").innerHTML = '$' + addCommas(fedincometaxValue);
        document.getElementById("incometax").innerHTML = '$' + addCommas(fedincometaxValue);
        document.getElementById("federaltaxes").innerHTML = '$' + addCommas((medicareVal + sstaxValue + fedincometaxValue));
        calcTakeHome();
    }
    else {
        fedfilingstatus = document.getElementById("fed-filing-status").value;
        var dictionary = null;
        let formVersion = "2019form";
        if (document.getElementById("fed-multi-jobs").checked == true) {
            formVersion = "2020form";
        }

        $(document).ready(function () {
            $.getJSON('json/fedtaxinfo.json', function (fedData) {
                var yearlypretax = 0;

                if (payfreq == "Weekly") {
                    yearlypretax = pretaxdeductions * 52;
                }
                else if (payfreq == "Monthly") {
                    yearlypretax = pretaxdeductions * 12;
                }
                else if (payfreq == "Bi-weekly") {
                    yearlypretax = pretaxdeductions * 52 / 2;
                }
                else if (payfreq == "Semi-Monthly") {
                    yearlypretax = pretaxdeductions * 12 / 2;
                }
                else if (payfreq == "Annually") {
                    yearlypretax = Number(pretaxdeductions);
                }

                form = fedData[formVersion];
                if (fedfilingstatus == "Married") {
                    dictionary = form["Married"];
                }
                if (fedfilingstatus == "Single") {
                    dictionary = form["Single"];
                }
                else if (fedfilingstatus == "Head of Household") {
                    dictionary = form["HeadHousehold"];
                }
                var SD = dictionary["SD"];;
                listA = dictionary["A"]; listB = dictionary["B"]; listC = dictionary["C"]; listD = dictionary["D"];
                if ((yearincome - yearlypretax) < SD) SD = (yearincome - yearlypretax);
                var Aval = 0; var Bval = 0; var Cval = 0; var Dval = 0; var addWithholdings = document.getElementById("fed-Additional Withholdings").value;
                var otherInc = document.getElementById("fed-other-income").value; var deductions = document.getElementById("fed-deductions").value;
                var adjustAnnual = (Number(yearincome) - Number(yearlypretax) - Number(SD) + Number(otherInc) - Number(deductions) - Number(addWithholdings));

                var index = 0;
                while (listA[index] <= (adjustAnnual) && index < listA.length - 1) {
                    index++;
                }
                index--;
                Aval = listA[index]; Bval = listB[index]; Cval = listC[index]; Dval = listD[index];
                var steptwo = adjustAnnual - Aval; var stepthree = steptwo * Dval; var stepfour = stepthree + Cval;
                dependentAmount = document.getElementById("fed-dependent-amount").value; var fdepent = 0;
                var perperiodliability = 0;
                if (payfreq == "Weekly") {
                    perperiodliability = stepfour / 52;
                    fdepent = Number(dependentAmount) / 52;
                }
                else if (payfreq == "Monthly") {
                    perperiodliability = stepfour / 12;
                    fdepent = Number(dependentAmount) / 12;
                }
                else if (payfreq == "Bi-weekly") {
                    perperiodliability = (stepfour / 52) * 2;
                    fdepent = Number((dependentAmount / 52) * 2);
                }
                else if (payfreq == "Semi-Monthly") {
                    perperiodliability = (stepfour / 12) / 2;
                    fdepent = Number((dependentAmount / 12) / 2);
                }
                else if (payfreq == "Annually") {
                    perperiodliability = (stepfour);
                    fdepent = Number(dependentAmount);
                }
                fedincometaxValue = perperiodliability - (fdepent) + Number(document.getElementById("fed-Additional Withholdings").value);

            }).then(() => {
                document.getElementById("federaltaxes").innerHTML = '$' + addCommas(Number(fedincometaxValue) + Number(sstaxValue) + Number(medicareVal));
                document.getElementById("incometax").innerHTML = '$' + addCommas(fedincometaxValue);
                calcTakeHome();
            });
        })
    }
}

// calcualte federal social security taxes
function sstaxCalc() {
    if (document.getElementById("ss-checkbox").checked == false) {
        sstaxValue = (periodicincome - pretaxdeductions) * sstax;
    }
    else {
        sstaxValue = 0;
    }
    document.getElementById("SS").innerHTML = '$' + addCommas(sstaxValue);
    document.getElementById("federaltaxes").innerHTML = '$' + addCommas((medicareVal + sstaxValue + fedincometaxValue));
    document.getElementById("FICA").innerHTML = '$' + addCommas((sstaxValue + medicareVal));
    calcTakeHome();
}

// calculate federal medicare taxes
function medicareCalc() {
    if (document.getElementById("medicare-checkbox").checked == false) {
        medicareVal = (periodicincome - pretaxdeductions) * medicare;
    }
    else {
        medicareVal = 0;
    }
    document.getElementById("Medicare").innerHTML = '$' + addCommas(medicareVal);
    document.getElementById("federaltaxes").innerHTML = '$' + addCommas((medicareVal + sstaxValue + fedincometaxValue));
    document.getElementById("FICA").innerHTML = '$' + addCommas((sstaxValue + medicareVal));
    calcTakeHome();
}

// changes input and output fields when a new state is selected
function changeState() {

    stateAbbreviation = document.getElementById("state-dropdown").value;
    document.getElementById("city-info").innerHTML = "";
    // call function that then picks the state-specific function to calculate tax amounts
    // the component is "all" indicates that the entire stateTaxCalc needs to be recalculated

    stateJSONPath = 'json/' + stateAbbreviation + '.json';
    $(document).ready(function () {
        $.getJSON(stateJSONPath, function (stateData) {

            // update the text and link in the subheader
            if (stateAbbreviation === 'CA') {
                document.getElementById("instructions").innerHTML = "Use employee\'s Form <a href=\"https://www.edd.ca.gov/pdf_pub_ctr/de4.pdf\">DE 4 </a> to enter the California state tax <br><br> information (if they have filed it).<br>";
                document.getElementById("instructions").style.display = "";
                document.getElementById("state-tax-form-link").innerHTML = "<a href=\"https://www.edd.ca.gov/pdf_pub_ctr/de4.pdf\">DE 4 </a>"
            }
            else if (stateAbbreviation === 'NY') {
                document.getElementById("instructions").innerHTML = "Use employee\'s Form <a href=\"https://www.tax.ny.gov/pdf/current_forms/it/it2104_fill_in.pdf\">IT-2104 </a> to enter the New York state tax <br><br> information (if they have filed it).<br>";
                document.getElementById("instructions").style.display = "";
                document.getElementById("state-tax-form-link").innerHTML = "<a href=\"https://www.tax.ny.gov/pdf/current_forms/it/it2104_fill_in.pdf\">IT-2104 </a>"

            }
            else if (stateAbbreviation === 'WA' || stateAbbreviation === 'TX') {
                document.getElementById("instructions").innerHTML = "";
                document.getElementById("instructions").style.display = "none";

            }

            // update the title of the web page
            document.getElementById("state-tax-title").innerHTML = stateData["StateName"].toUpperCase().fontsize(7) + ' Paycheck Calculator';

            var stateInfoForm = document.getElementById("state-info");

            var stateTaxInputLabels = stateData["StateTaxInputLabels"];
            var stateTaxInputTypes = stateData["StateTaxInputTypes"];
            var statePopUpText = stateData["PopUpText"];
            var stateTaxOutputLabels = stateData["OutputLabels"];

            while (stateInfoForm.firstChild) {
                stateInfoForm.removeChild(stateInfoForm.firstChild);
            }

            // some states don't have any state information. For these states there's nothing to display in paycheck estimation section
            if (!stateTaxOutputLabels) {
                document.getElementById("state-tax-header").style.display = "none";
                document.getElementById("total-state-taxes").style.display = "none";
            }
            else {
                document.getElementById("state-tax-header").style.display = "";
                document.getElementById("total-state-taxes").style.display = "";
                document.getElementById("stateinfosection").style.display = "";

                // for new york, add a helptip and popup to the right of of the state name
                if (stateData["StateName"] == "New York") {

                    document.getElementById("state-tax-header").innerHTML = "";

                    // create a popup
                    var popUp = document.createElement("div");
                    popUp.setAttribute("class", "popup");
                    popUp.innerHTML = "Enter zip code to calculate local taxes";
                    popUp.setAttribute("id", "NYC-zipcode-popup");
                    // popUp.style.color = "red";

                    // create a help tip
                    var helpTip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    helpTip.setAttribute("viewBox", "0 0 16 16");
                    helpTip.setAttribute("class", "bi bi-info-circle");
                    helpTip.setAttribute("fill", "currentColor");
                    helpTip.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    helpTip.setAttribute("width", "1em");
                    helpTip.setAttribute("height", "1em");
                    helpTip.setAttribute("id", "NYC-zipcode-helptip");
                    helpTip.setAttribute("onclick", "togglePopUp('NYC-zipcode-popup')");
                    // helpTip.setAttribute("fill", "red");
                    var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    var path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    path1.setAttribute("fill-rule", "evenodd");
                    path1.setAttribute("d", "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z");
                    path2.setAttribute("d", "M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z");
                    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                    circle.setAttribute("cx", "8"); circle.setAttribute("cy", "4.5"); circle.setAttribute("r", "1");
                    helpTip.appendChild(path1); helpTip.appendChild(path2); helpTip.appendChild(circle);

                    // create the NYC title
                    var headerHelptip = document.createElement("div");
                    headerHelptip.appendChild(helpTip);
                    var title = document.createElement("div");
                    title.innerHTML = stateData["StateName"] + ' Taxes';
                    headerHelptip.appendChild(title);
                    headerHelptip.setAttribute("class", "heading-and-helptip");

                    // append elements
                    document.getElementById("state-tax-header").appendChild(popUp);
                    document.getElementById("state-tax-header").appendChild(headerHelptip);
                }
                else {
                    // if state is not NY setting a header in paycheck estimation is much simpler
                    // re-set the margin to 0px is important when selecting a new state after selecting NYC because helptip adds margin
                    document.getElementById("state-tax-header").style.marginLeft = "0px";
                    document.getElementById("state-tax-header").innerHTML = stateData["StateName"] + ' Taxes';
                }
            }

            if (stateTaxInputLabels != null && stateTaxInputLabels.length > 0) {
                document.getElementById("stateinfosection").style.display = "";

                // create input fields
                for (var a = 0; a < stateTaxInputLabels.length; a++) { //loop through each state info line item


                    // create the label for each input
                    // create popup
                    var popUp = document.createElement("div");
                    popUp.setAttribute("class", "popup");
                    popUp.innerHTML = stateData["PopUpText"][a];
                    var popUpID = statePopUpText[a] + "-popup";
                    popUp.setAttribute("id", popUpID);

                    // create div that contains heading and helptip
                    var lineLabel = document.createElement("div");
                    lineLabel.setAttribute("class", "heading-and-helptip");

                    var label = document.createElement("LABEL");
                    label.innerHTML = stateTaxInputLabels[a];
                    // TODO: help tip is smaller if there's more text. Sometimes this is noticeable
                    var helpTip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    helpTip.setAttribute("viewBox", "0 0 16 16");
                    helpTip.setAttribute("class", "bi bi-info-circle");
                    helpTip.setAttribute("fill", "currentColor");
                    helpTip.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    helpTip.setAttribute("width", "1em");
                    helpTip.setAttribute("height", "1em");
                    helpTip.setAttribute("id", statePopUpText[a] + "-helptip");

                    helpTip.setAttribute("onclick", "togglePopUp('" + popUpID + "')");

                    var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    var path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    path1.setAttribute("fill-rule", "evenodd");
                    path1.setAttribute("d", "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z");
                    path2.setAttribute("d", "M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z");
                    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                    circle.setAttribute("cx", "8"); circle.setAttribute("cy", "4.5"); circle.setAttribute("r", "1");
                    helpTip.appendChild(path1); helpTip.appendChild(path2); helpTip.appendChild(circle);

                    // lineLabel has the help tip and the label
                    lineLabel.appendChild(helpTip);
                    lineLabel.appendChild(label);

                    // add top margin before elements populate the section
                    if (a == 0) {
                        var margin = document.createElement("div");
                        margin.style.margin = "10px";
                        stateInfoForm.appendChild(margin);
                    }


                    // create a drop-down element
                    if (stateTaxInputTypes[a] === "Drop-down") {
                        var lineItem = document.createElement("SELECT");
                        lineItem.setAttribute("id", stateTaxInputLabels[a]);
                        lineItem.setAttribute("class", "dropdown");

                        // populate the dropdown items
                        if (stateTaxInputLabels[a] === "Filing Status") {
                            var stateFilingStatusOptions = stateData["StateFilingStatus"];
                            for (var i = 0; i < stateFilingStatusOptions.length; i++) {
                                var option = document.createElement("option");
                                option.text = stateFilingStatusOptions[i];
                                lineItem.add(option);

                            }
                        }
                        var dropDownContainer = document.createElement("div");
                        dropDownContainer.setAttribute("class", "dropdown");
                        dropDownContainer.appendChild(lineItem);

                        var labelInput = document.createElement("div");
                        labelInput.setAttribute("class", "label-input");
                        labelInput.appendChild(popUp);
                        labelInput.appendChild(lineLabel);
                        labelInput.appendChild(dropDownContainer);
                        labelInput.style.float = "left";

                        stateInfoForm.appendChild(labelInput);

                    }

                    // create an integer input element
                    if (stateTaxInputTypes[a] === "Integer") {

                        var lineItem = document.createElement("INPUT");
                        lineItem.setAttribute("type", "number");
                        lineItem.setAttribute("id", stateTaxInputLabels[a]);
                        lineItem.setAttribute("class", "input"); //classify for formatting
                        lineItem.setAttribute("name", stateTaxInputLabels[a]);
                        lineItem.setAttribute("min", "0");
                        lineItem.setAttribute("placeholder", "0");


                        var numberInput = document.createElement("div");
                        numberInput.setAttribute("class", "number-input");
                        numberInput.appendChild(lineItem);

                        var labelInput = document.createElement("div");
                        labelInput.setAttribute("class", "label-input");
                        labelInput.appendChild(popUp);
                        labelInput.appendChild(lineLabel);
                        labelInput.appendChild(numberInput);
                        labelInput.style.float = "left";

                        stateInfoForm.appendChild(labelInput);

                        if (stateTaxInputLabels[a] === "Zip code") {
                            document.getElementById("Zip code").addEventListener("change", function (event) {
                                changeZipCode(Number(event.target.value));
                            });
                        }
                    }

                    // create a dollar amount input element
                    if (stateTaxInputTypes[a] === "DollarAmount") {

                        var lineItem = document.createElement("INPUT");
                        lineItem.setAttribute("type", "number");
                        lineItem.setAttribute("id", stateTaxInputLabels[a]);
                        lineItem.setAttribute("class", "input"); //classify for formatting
                        lineItem.setAttribute("name", stateTaxInputLabels[a]);
                        lineItem.setAttribute("min", "0");
                        lineItem.setAttribute("placeholder", "0.00");

                        var dollarInput = document.createElement("div");
                        dollarInput.setAttribute("class", "dollar-input");
                        dollarInput.appendChild(lineItem);

                        var dollarLabelInput = document.createElement("div");
                        dollarLabelInput.setAttribute("class", "label-input");
                        dollarLabelInput.appendChild(popUp);
                        dollarLabelInput.appendChild(lineLabel);
                        dollarLabelInput.appendChild(dollarInput);
                        dollarLabelInput.style.float = "left";

                        stateInfoForm.appendChild(dollarLabelInput);

                    }

                    // create a radio button element
                    // note: this doesn't have proper formatting because MVP doesn't have radio buttons
                    if (stateTaxInputTypes[a] === "Radio") {

                        var lineLabel = document.createElement("LABEL");
                        lineLabel.innerHTML = stateTaxInputLabels[a]
                        stateInfoForm.appendChild(lineLabel);

                        var options = ["Yes", "No"];
                        for (var b = 0; b < options.length; b++) {
                            var lineItem = document.createElement("INPUT");
                            lineItem.setAttribute("type", "radio");
                            lineItem.setAttribute("id", stateTaxInputLabels[a] + options[b]);
                            lineItem.setAttribute("name", stateTaxInputLabels[a]);
                            lineItem.setAttribute("value", options[b]);
                            stateInfoForm.appendChild(lineItem);

                            var lineItem = document.createElement("LABEL");
                            lineItem.setAttribute("for", stateTaxInputLabels[a] + options[b]);
                            lineItem.innerHTML = options[b];


                            stateInfoForm.appendChild(lineItem);
                        }
                    }



                }

            }
            // if there are no state taxes, don't populate state input fields
            else {
                document.getElementById("stateinfosection").style.display = "none";
            }


            // populate state special exemptions
            var SpecialExemptionLabels = stateData["Exemptions"];
            var SpecialExemptionElement = document.getElementById("state-exemptions");
            while (SpecialExemptionElement.firstChild) {
                SpecialExemptionElement.removeChild(SpecialExemptionElement.firstChild);
            }
            if (SpecialExemptionLabels) {
                for (var i = 0; i < SpecialExemptionLabels.length; i++) { //loop through each state info line item

                    var lineItem = document.createElement("INPUT");
                    lineItem.innerHTML = SpecialExemptionLabels[i];
                    lineItem.setAttribute("type", "checkbox");
                    lineItem.setAttribute("id", SpecialExemptionLabels[i] + "_Exemption");
                    lineItem.setAttribute("class", "checkbox");

                    var lineLabel = document.createElement("LABEL");
                    lineLabel.innerHTML = SpecialExemptionLabels[i];
                    lineLabel.setAttribute("class", "checkbox-label");
                    lineLabel.style.paddingLeft = "3px";

                    var specialExemptionsRow = document.createElement("div");
                    specialExemptionsRow.setAttribute("class", "checkbox-row");

                    specialExemptionsRow.appendChild(lineItem);
                    specialExemptionsRow.appendChild(lineLabel);


                    SpecialExemptionElement.appendChild(specialExemptionsRow);


                }
            }

            // populate labels and numbers in paycheck estimation section
            var outputLabels = stateData["OutputLabels"];
            var StateTaxOutputElement = document.getElementById("state-tax-output");
            while (StateTaxOutputElement.firstChild) {
                StateTaxOutputElement.removeChild(StateTaxOutputElement.firstChild);
            }
            if (outputLabels) {
                for (var i = 0; i < outputLabels.length; i++) { //loop through each state info line item
                    var container = document.createElement("div");
                    container.setAttribute("class", "disp_container");

                    var lineLabel = document.createElement("div");
                    lineLabel.innerHTML = outputLabels[i];
                    lineLabel.setAttribute("class", "disp_title");
                    container.appendChild(lineLabel);

                    var lineItem = document.createElement("SPAN");
                    lineItem.setAttribute("id", outputLabels[i]);
                    lineItem.setAttribute("class", "disp_number");
                    container.appendChild(lineItem);

                    StateTaxOutputElement.appendChild(container);

                }
            }
            if (!stateTaxInputLabels) { document.getElementById("state-tax-output").display = "hidden"; }


        }).then(() => {
            // this function has to run completely before other steps in tax calculation can proceed
            stateTaxCalc(stateAbbreviation);
            calcpretaxamount();
            calcposttaxamount();
            calcTakeHome();
        });
    });


}

// NY taxes require zip code
function changeZipCode(zipCode) {
    stateAbbreviation = document.getElementById("state-dropdown").value;
    // call function that then picks the state-specific function to calculate tax amounts
    // the component is "all" indicates that the entire stateTaxCalc needs to be recalculated

    stateJSONPath = 'json/' + stateAbbreviation + '.json';

    cityExists = false;

    $(document).ready(function () {
        $.getJSON(stateJSONPath, function (stateData) {
            var cityInfoForm = document.getElementById("city-info");
            while (cityInfoForm.firstChild) {
                cityInfoForm.removeChild(cityInfoForm.firstChild);
            }

            if (stateData["NYCZipCodes"].includes(zipCode)) {

                cityName = "NYC"
                var outputLabel = "New York City Income Tax";
                cityExists = true;

            }
            else if (stateData["YonkersZipCodes"].includes(zipCode)) {
                cityName = "Yonkers"
                var outputLabel = "Yonkers City Income Tax";
                cityExists = true;
            }
            else {
                var CityTaxOutputElement = document.getElementById("city-tax-output");
                while (CityTaxOutputElement.firstChild) {
                    CityTaxOutputElement.removeChild(CityTaxOutputElement.firstChild);
                }
            }

            // check if the zip code is in a valid city.
            // this function adds helptip, popup, title, and input elements
            if (cityExists) {

                // remove helptip in new york tax title
                document.getElementById("NYC-zipcode-helptip").innerHTML = "";
                document.getElementById("state-tax-header").style.marginLeft = "-20px";
                document.getElementById("NYC-zipcode-popup").style.visibility = "hidden";

                // # NYC allowances input
                var popUp = document.createElement("div");
                popUp.setAttribute("class", "popup");
                popUp.innerHTML = "Number of allowances to be claimed for local taxes, if any";
                popUp.setAttribute("id", "num-NYC-allowances-popup");

                var lineLabel = document.createElement("div");
                lineLabel.setAttribute("class", "heading-and-helptip");

                var label = document.createElement("LABEL");
                label.innerHTML = "Number of " + cityName + " allowances";
                // TODO: help tip is smaller if there's more text. Sometimes this is noticeable
                var helpTip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                helpTip.setAttribute("viewBox", "0 0 16 16");
                helpTip.setAttribute("class", "bi bi-info-circle");
                helpTip.setAttribute("fill", "currentColor");
                helpTip.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                helpTip.setAttribute("width", "1em");
                helpTip.setAttribute("height", "1em");
                helpTip.setAttribute("id", "num-NYC-allowances-helptip");

                helpTip.setAttribute("onclick", "togglePopUp('num-NYC-allowances-popup')");

                var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                var path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                path1.setAttribute("fill-rule", "evenodd");
                path1.setAttribute("d", "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z");
                path2.setAttribute("d", "M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z");
                var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                circle.setAttribute("cx", "8"); circle.setAttribute("cy", "4.5"); circle.setAttribute("r", "1");
                helpTip.appendChild(path1); helpTip.appendChild(path2); helpTip.appendChild(circle);

                // lineLabel has the help tip and the label
                lineLabel.appendChild(helpTip);
                lineLabel.appendChild(label);

                var lineItem = document.createElement("INPUT");
                lineItem.setAttribute("type", "number");
                lineItem.setAttribute("id", "Number of " + cityName + " allowances");
                lineItem.setAttribute("class", "input"); //classify for formatting
                lineItem.setAttribute("name", "Number of " + cityName + " allowances");
                lineItem.setAttribute("min", "0");
                lineItem.setAttribute("placeholder", "0");

                var numberInput = document.createElement("div");
                numberInput.setAttribute("class", "number-input");
                numberInput.appendChild(lineItem);

                var labelInput = document.createElement("div");
                labelInput.setAttribute("class", "label-input");
                labelInput.appendChild(popUp);
                labelInput.appendChild(lineLabel);
                labelInput.appendChild(numberInput);
                labelInput.style.float = "left";

                cityInfoForm.appendChild(labelInput);

                // additional NYC whitholding amount input field
                var popUp = document.createElement("div");
                popUp.setAttribute("class", "popup");
                popUp.innerHTML = "Additional annual amount to be withheld in " + cityName + " taxes, if any";
                popUp.setAttribute("id", "num-NYC-additional-witholdings-popup");

                var lineLabel = document.createElement("div");
                lineLabel.setAttribute("class", "heading-and-helptip");

                var label = document.createElement("LABEL");
                label.innerHTML = cityName + " Additional Withholdings";

                var helpTip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                helpTip.setAttribute("viewBox", "0 0 16 16");
                helpTip.setAttribute("class", "bi bi-info-circle");
                helpTip.setAttribute("fill", "currentColor");
                helpTip.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                helpTip.setAttribute("width", "1em");
                helpTip.setAttribute("height", "1em");
                helpTip.setAttribute("id", "num-NYC-additional-witholdings-helptip");

                helpTip.setAttribute("onclick", "togglePopUp('num-NYC-additional-witholdings-popup')");

                var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                var path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                path1.setAttribute("fill-rule", "evenodd");
                path1.setAttribute("d", "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z");
                path2.setAttribute("d", "M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z");
                var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                circle.setAttribute("cx", "8"); circle.setAttribute("cy", "4.5"); circle.setAttribute("r", "1");
                helpTip.appendChild(path1); helpTip.appendChild(path2); helpTip.appendChild(circle);

                // lineLabel has the help tip and the label
                lineLabel.appendChild(helpTip);
                lineLabel.appendChild(label);

                // line item is just the input
                var lineItem = document.createElement("INPUT");
                lineItem.setAttribute("type", "number");
                lineItem.setAttribute("id", "Additional " + cityName + " withholding amounts");
                lineItem.setAttribute("class", "input"); //classify for formatting
                lineItem.setAttribute("name", "Additional " + cityName + " withholding amounts");
                lineItem.setAttribute("min", "0");
                lineItem.setAttribute("placeholder", "0.00");

                var numberInput = document.createElement("div");
                numberInput.setAttribute("class", "dollar-input");
                numberInput.appendChild(lineItem);

                var labelInput = document.createElement("div");
                labelInput.setAttribute("class", "label-input");
                labelInput.appendChild(popUp);
                labelInput.appendChild(lineLabel);
                labelInput.appendChild(numberInput);
                labelInput.style.float = "left";

                cityInfoForm.appendChild(labelInput);

                // populate output fields in paycheck estimation section
                var CityTaxOutputElement = document.getElementById("city-tax-output");
                while (CityTaxOutputElement.firstChild) {
                    CityTaxOutputElement.removeChild(CityTaxOutputElement.firstChild);
                }

                var container = document.createElement("div");
                container.setAttribute("class", "disp_container");

                var lineLabel = document.createElement("div");
                lineLabel.innerHTML = outputLabel;
                lineLabel.setAttribute("class", "disp_title");
                container.appendChild(lineLabel);
                //StateTaxOutputElement.appendChild(lineLabel);

                var lineItem = document.createElement("SPAN");
                lineItem.setAttribute("id", outputLabel);
                lineItem.setAttribute("class", "disp_number");
                container.appendChild(lineItem);

                CityTaxOutputElement.appendChild(container);

            }
        }).then(() => { taxCalcNY(); });
    });
}

/* takes as input the state, and calls the function to calculate taxes for that state */
function stateTaxCalc(state) {
    eval("taxCalc" + state + "()");
}

function taxCalcWA() {

    // CALCULATE WA TAXES

    $(document).ready(function () {
        $.getJSON('json/WA.json', function (stateData) {
            // STEP 5_2 Family Leave Benefits Calculation
            if (document.getElementById("Paid Family & Medical Leave_Exemption").checked) {
                totalStateTaxes = 0;
            }
            else {
                annualSalary = Number(document.getElementById("salary-input").value);
                sVariable = annualSalary - pretaxdeductions * payPeriods;
                a = 0.004 * .6333 * sVariable;
                totalStateTaxes = a / payPeriods;
            }
        }).then(() => {
            document.getElementById("Paid Family & Medical Leave").innerHTML = '$' + addCommas(totalStateTaxes);
            document.getElementById("total-state-taxes").innerHTML = '$' + addCommas(totalStateTaxes);
            calcTakeHome();
        });
    })

    calcTakeHome();

}

// no state taxes for texas
function taxCalcTX() {

}

// calculate California tax
function taxCalcCA() {

    var standardDeduction = new Number(); var SDIMultiple = Number(0.01); var stateIncomeTax = new Number();
    var stateDisabilityInsurance = new Number();

    // CALCULATE CALI DISABILITY INSURANCE TAX

    //default stateDisabilityInsurance=0, which remains if box is checked
    if (document.getElementById("State Disability Insurance_Exemption").checked == false) {
        stateDisabilityInsurance = (periodicincome - pretaxdeductions) * SDIMultiple;
    }

    document.getElementById("State Disability Insurance").innerHTML = '$' + addCommas(stateDisabilityInsurance);


    if (document.getElementById("State Tax_Exemption").checked == true) {
        //this function is run but fields don't populate if button is checked
        totalStateTaxes = ((stateDisabilityInsurance) + (stateIncomeTax)) //update state tax
        document.getElementById("State Tax").innerHTML = '$' + addCommas(stateIncomeTax);
        document.getElementById("total-state-taxes").innerHTML = '$' + addCommas(totalStateTaxes);
        calcTakeHome();
    }
    else {
        statefilingStatus = document.getElementById("Filing Status").value;

        var dictionary = null;
        $(document).ready(function () {
            $.getJSON('json/CA.json', function (calistateData) {
                var yearlypretax = 0;
                if (payfreq == "Weekly") {
                    yearlypretax = pretaxdeductions * 52;
                }
                else if (payfreq == "Monthly") {
                    yearlypretax = pretaxdeductions * 12;
                }
                else if (payfreq == "Bi-weekly") {
                    yearlypretax = pretaxdeductions * 52 / 2;
                }
                else if (payfreq == "Semi-Monthly") {
                    yearlypretax = pretaxdeductions * 12 * 2;
                }
                else if (payfreq == "Annually") {
                    yearlypretax = Number(pretaxdeductions);
                }

                if (statefilingStatus == "Married/Registered Domestic Partnership (RDP) filing jointly") {
                    dictionary = calistateData["Married"];
                }
                if (statefilingStatus == "Single" || statefilingStatus == "Married/RDP filing separately") {
                    dictionary = calistateData["Single"];
                }
                else if (statefilingStatus == "Head of household") {
                    dictionary = calistateData["HeadHousehold"];
                }
                standardDeduction = dictionary["SD"];
                listA = dictionary["A"]; listB = dictionary["B"]; listC = dictionary["C"]; listD = dictionary["D"];
                if ((yearincome - yearlypretax) < standardDeduction) standardDeduction = (yearincome - yearlypretax);
                var Aval = 0; var Bval = 0; var Cval = 0; var Dval = 0;
                var index = 0;
                while (listA[index] <= (yearincome - standardDeduction - yearlypretax) && index < listA.length - 1) {
                    index++;
                }
                index--;
                Aval = listA[index]; Bval = listB[index]; Cval = listC[index]; Dval = listD[index];
                var steptwo = Cval + (Dval * ((yearincome - standardDeduction - yearlypretax) - Aval));
                numAllowances = document.getElementById("Number of Allowances").value;
                numAdditionalAllowances = document.getElementById("Additional State Allowances").value;
                additionalWithholdings = Number(document.getElementById("Additional Withholdings").value);
                var stepthree = (steptwo) - ((Number(numAllowances) + Number(numAdditionalAllowances)) * 134.2);
                var stepfour = new Number();
                if (payfreq == "Weekly") {
                    stepfour = stepthree / 52;
                }
                else if (payfreq == "Monthly") {
                    stepfour = stepthree / 12;
                }
                else if (payfreq == "Bi-weekly") {
                    stepfour = (stepthree / 52) * 2;
                }
                else if (payfreq == "Semi-Monthly") {
                    stepfour = (stepthree / 12) / 2;
                }
                else if (payfreq == "Annually") {
                    stepfour = (stepthree);
                }
                stateIncomeTax = (stepfour) + (additionalWithholdings);

            }).then(() => {
                document.getElementById("State Tax").innerHTML = '$' + addCommas(stateIncomeTax);
                totalStateTaxes = ((stateDisabilityInsurance) + (stateIncomeTax)) //update state tax
                document.getElementById("total-state-taxes").innerHTML = '$' + addCommas(totalStateTaxes);

                calcTakeHome();
            });
        })
    }

    // call the take home tax functon, which displays net pay
    calcTakeHome();

}

// calculate New York tax
function taxCalcNY() {

    // CALCULATE NY TAXES

    statefilingStatus = document.getElementById("Filing Status").value;

    $(document).ready(function () {
        $.getJSON('json/NY.json', function (stateData) {
            // STEP 5_1 NY SDI Calculation
            if (document.getElementById("State Disability Insurance_Exemption").checked) {
                nySDI = 0;
            }
            else {
                nySDI = stateData["SDI"][payfreq];
            }

            // STEP 5_2 Family Leave Benefits Calculation
            if (document.getElementById("Family Leave Benefits_Exemption").checked) {
                familyLeaveBenefits = 0;
            }
            else {
                annualSalary = Number(document.getElementById("salary-input").value);
                a = annualSalary * 0.0027;
                if (a > 196.72) {
                    b = 196.72;
                }
                else {
                    b = annualSalary * 0.0027;
                }

                familyLeaveBenefits = b / payPeriods;
            }

            // STEP 5_3 NY STATE Tax Calculation
            if (document.getElementById("State Tax_Exemption").checked) {
                stateIncomeTax = 0;
            }
            else {
                statefilingStatus = document.getElementById("Filing Status").value;
                x1 = stateData["FilingStatusData"]["Annually"][statefilingStatus];
                y1 = stateData["FilingStatusData"]["Annually"]["y1"];
                numAllowances = Number(document.getElementById("Number of State Allowances").value);

                sdNY = x1 + (y1 * numAllowances);
                sVariable = annualSalary - pretaxdeductions * payPeriods;

                c = Math.max(0, sVariable - sdNY)

                if (statefilingStatus === "Married") {
                    taxTable = stateData["TaxTable"]["Married"]
                }
                else {
                    taxTable = stateData["TaxTable"]["Single"]
                }

                var i = 0;
                while (i < taxTable["S"].length - 1 && c > taxTable["S"][i + 1]) {
                    i++;
                }

                d = (c - taxTable["S"][i]) * taxTable["M"][i] + taxTable["A"][i];

                e = d + Number(document.getElementById("Additional State Withholdings").value);
                f = e / payPeriods;
                stateIncomeTax = f;
            }

            // // Step 5_4 NYC Tax Calculation

            zipCode = Number(document.getElementById("Zip code").value);
            cityTax = 0;
            if (stateData["NYCZipCodes"].includes(zipCode)) {
                x2 = stateData["NYCFilingStatusData"]["Annually"][statefilingStatus];
                y2 = stateData["NYCFilingStatusData"]["Annually"]["y2"];
                numNYCAllowances = Number(document.getElementById("Number of NYC allowances").value);

                sdNYC = x2 + (y2 * numNYCAllowances);

                c = Math.max(0, sVariable - sdNYC)

                if (statefilingStatus === "Married") {
                    taxTable = stateData["NYCTaxTable"]["Married"]
                }
                else {
                    taxTable = stateData["NYCTaxTable"]["Single"]
                }

                var i = 0;
                while (i < taxTable["S"].length - 1 && c > taxTable["S"][i + 1]) {
                    i++;
                }

                d = (c - taxTable["S"][i]) * taxTable["M"][i] + taxTable["A"][i];

                e = d + Number(document.getElementById("Additional NYC withholding amounts").value);
                f = e / payPeriods;
                cityTax = f;
            }
            else if (stateData["YonkersZipCodes"].includes(zipCode)) {
                x3 = stateData["FilingStatusData"]["Annually"][statefilingStatus];
                y3 = stateData["FilingStatusData"]["Annually"]["y1"];
                numYonkersAllowances = Number(document.getElementById("Number of Yonkers allowances").value);
                sdYonkers = x3 + (y3 * numYonkersAllowances);

                c = Math.max(0, sVariable - sdYonkers)

                if (statefilingStatus === "Married") {
                    taxTable = stateData["TaxTable"]["Married"]
                }
                else {
                    taxTable = stateData["TaxTable"]["Single"]
                }

                var i = 0;
                while (i < taxTable["S"].length - 1 && c > taxTable["S"][i + 1]) {
                    i++;
                }

                d = (c - taxTable["S"][i]) * taxTable["M"][i] + taxTable["A"][i];

                e = d + Number(document.getElementById("Additional Yonkers withholding amounts").value);
                f = e / payPeriods;
                cityTax = f;
            }
        }).then(() => {
            document.getElementById("State Tax").innerHTML = '$' + addCommas(stateIncomeTax);
            document.getElementById("Family Leave Benefits").innerHTML = '$' + addCommas(familyLeaveBenefits);
            document.getElementById("State Disability Insurance").innerHTML = '$' + addCommas(nySDI);
            totalStateTaxes = nySDI + familyLeaveBenefits + stateIncomeTax + cityTax;
            document.getElementById("total-state-taxes").innerHTML = '$' + addCommas(totalStateTaxes);
            if (document.getElementById("Yonkers City Income Tax") != null) {
                document.getElementById("Yonkers City Income Tax").innerHTML = '$' + addCommas(cityTax);
            }
            if (document.getElementById("New York City Income Tax") != null) {
                document.getElementById("New York City Income Tax").innerHTML = '$' + addCommas(cityTax);
            }
            calcTakeHome();
        });
    })

    calcTakeHome();

}

// divides according to pay frequency
function calcsplitincome() {

    yearincome = Number(document.getElementById("salary-input").value);
    payfreq = document.getElementById("freq").value;
    if (payfreq == "Weekly") {
        payPeriods = 52;
    }
    else if (payfreq == "Monthly") {
        payPeriods = 12;
    }
    else if (payfreq == "Bi-weekly") {
        payPeriods = 52 / 2;
    }
    else if (payfreq == "Semi-Monthly") {
        payPeriods = 12 / 2;
    }
    else if (payfreq == "Annually") {
        payPeriods = 1;
    }

    if (payfreq == "Weekly") {
        periodicincome = yearincome / 52;
    }
    else if (payfreq == "Monthly") {
        periodicincome = yearincome / 12;
    }
    else if (payfreq == "Bi-weekly") {
        periodicincome = (yearincome / 52) * 2;
    }
    else if (payfreq == "Semi-Monthly") {
        periodicincome = (yearincome / 12) / 2;
    }
    else if (payfreq == "Annually") {
        periodicincome = (yearincome);
    }
    document.getElementById("gross-pay").innerHTML = '$' + addCommas(periodicincome);

    changeState();
    incometax();
    sstaxCalc();
    medicareCalc();

    calcTakeHome();
}

function calcTakeHome() {
    // TODO: fix bug where net pay increases if deductions exceed gross pay.
    takeHome = Math.round(100 * (periodicincome - pretaxdeductions - fedincometaxValue - sstaxValue - medicareVal - totalStateTaxes - posttaxdeductions)) / 100;
    if (takeHome >= 0) { document.getElementById("takehomepay").innerHTML = '$' + addCommas(takeHome); }
    else if (takeHome < 0) { document.getElementById("takehomepay").innerHTML = '$0.00'; }
}

// adds a new row of deduction name and amount for pre-tax
var numberOfPreTaxDeductions = 0; //number of pre-tax deductions
var originalpretax = document.getElementById("pretax");
var clonepretax = originalpretax.cloneNode(true); // "deep" clone
function duplicatepretax() {
    if (numberOfPreTaxDeductions == 0) {
        clonepretax.id = "pretax" + ++numberOfPreTaxDeductions; // there can only be one element with an ID
        originalpretax.appendChild(clonepretax);
    }
    else {
        var nextclonepre = clonepretax.cloneNode(true); // "deep" clone
        nextclonepre.id = originalpretax.id + (++numberOfPreTaxDeductions); // there can only be one element with an ID
        nextclonepre.getElementsByClassName("pretax-deduction-amount")[0].value = 'Amount';
        clonepretax.appendChild(nextclonepre);
        clonepretax = nextclonepre;
    }
    document.getElementById(clonepretax.id).addEventListener("change", function (event) {
        calcpretaxamount();
    })
    pretaxbuttonvisible();
}

/*minus button should only be visible when there is more than 1 row of deduction name and amount*/
pretaxbuttonvisible();
function pretaxbuttonvisible() {
    if (numberOfPreTaxDeductions == 0) {
        document.getElementById("pretaxMinusButton").style.visibility = "hidden";
    }
    else {
        document.getElementById("pretaxMinusButton").style.visibility = "visible";
    }

}

// same operations as pre-tax deduction duplication and button visibility
var numberOfPostTaxDeductions = 0; //number of post-tax deductions
var originalposttax = document.getElementById("posttax");
var cloneposttax = originalposttax.cloneNode(true); // "deep" clone
function duplicateposttax() {
    if (numberOfPostTaxDeductions == 0) {
        cloneposttax.id = "posttax" + ++numberOfPostTaxDeductions; // there can only be one element with an ID
        originalposttax.appendChild(cloneposttax);
    }
    else {
        var nextclonepost = cloneposttax.cloneNode(true); // "deep" clone
        nextclonepost.id = originalposttax.id + (++numberOfPostTaxDeductions); // there can only be one element with an ID
        nextclonepost.getElementsByClassName("posttax-deduction-amount")[0].value = 'Amount';
        cloneposttax.appendChild(nextclonepost);
        cloneposttax = nextclonepost;
    }
    document.getElementById(cloneposttax.id).addEventListener("change", function (event) {
        calcposttaxamount();
    })
    posttaxbuttonvisible();
}

posttaxbuttonvisible();
function posttaxbuttonvisible() {
    if (numberOfPostTaxDeductions == 0) {
        document.getElementById("posttaxMinusButton").style.visibility = "hidden";
    }
    else {
        document.getElementById("posttaxMinusButton").style.visibility = "visible";
    }
}

// removes an added row
function deletepretax() {
    if (numberOfPreTaxDeductions > 0) { document.getElementById(originalpretax.id + numberOfPreTaxDeductions).outerHTML = ""; numberOfPreTaxDeductions--; }
    //update the number of input fields
    calcpretaxamount();
    pretaxbuttonvisible();
}

function deleteposttax() {
    if (numberOfPostTaxDeductions > 0) { document.getElementById(originalposttax.id + numberOfPostTaxDeductions).outerHTML = ""; numberOfPostTaxDeductions--; }
    //update the numbero f input fields
    calcposttaxamount();
    posttaxbuttonvisible();
}

// purple circle button to right of paychec estimation output
function displayFeedback() {
    window.open('https://docs.google.com/forms/d/1CH8bANrc68a-sFYdpgqM83xjISe5tKZafJ9yEIN2kPs/edit');
}

// round number to nearest 2 decimal pts and add commas
function addCommas(x) {
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// makes popup visible or hidden by press on helptip
function togglePopUp(popUp) {

    if (document.getElementById(String(popUp)).style.visibility == 'visible') {
        document.getElementById(String(popUp)).style.visibility = 'hidden';
    }
    else {
        document.getElementById(String(popUp)).style.visibility = 'visible';
    }

}
