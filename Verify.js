
var strData = loadFile("/members.csv");
var membersArray = CSVToArray(strData);
var squareArray = CSVToArray(loadFile('/squareorders.csv'));
var targetF = "Neil";
var targetL = "Bhatia"
// console.log(membersArray);
// console.log(SquareArray);

const memberNameIndex = 1; // Just the first name
const squareNameIndex = 11; // Full name

var results = [false, false];
var resultsArray = [];
// console.log(squareArray);

compareCSV(targetF, targetL);


function compareCSV(targetF, targetL) {
    
    /* Search in our database */
    searchMembers(membersArray, targetF, targetL);
    searchSquare(squareArray, targetF, targetL);
    var response = processResults(results, resultsArray);
    console.log(response);
    console.log(results);

    /* Reset */
    results = [false, false];
    resultsArray = [];

}

function processResults() {
    var response = "";
    if (results[0] == true) {
        response += "Person has registered in the database\n";
    } else {
        response += "Person has NOT registered in the database\n";
    }

    if (results[1] == true) {
        response += "Person has purchased membership on square";
    } else {
        response += "Person has NOT purchased membership on square";
    }
    console.log
    return response;
}

function searchMembers(membersArray, targetF, targetL) {
    membersArray.forEach((currentMember) => {
        if (membersArray[memberNameIndex] !== null && membersArray[memberNameIndex + 1] !== null) {
            var currentFirst = currentMember[memberNameIndex];
            var currentLast = currentMember[memberNameIndex + 1];
            if (targetL === currentLast) {
                if (targetF === currentFirst) {
                    results[0] = true;
                    resultsArray.push(currentMember);
                }
            }
        }
    });
}

function searchSquare(membersArray, targetF, targetL) {
    squareArray.forEach((currentCustomer, index) => {
        
        if (currentCustomer[11] != null) {
            
            var customerNames = currentCustomer[11].split(" ");
            var currentFirst = customerNames[0];
            var currentLast = customerNames[1];
            // console.log(currentLast);
            // console.log(index + "\n");
            // console.log(currentCustomer);

            if (targetL === currentLast) {
                console.log(currentFirst + " " + currentLast);
                if (targetF === currentFirst) {
                    results[1] = true;
                    // resultsArray.push(currentMember);
                }
            }
        }
    });
}





/**
 * Handles loading of the file from the computer
 * Code belongs to some random dude on the internet fuck
 * 
 * @param URL that is being loaded
 * @returns void
 */
function loadFile(url) {
    var req = false;
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest && !(window.ActiveXObject)) {
        try { req = new XMLHttpRequest() }
        catch (e) { req = false }
    }
    else // branch for IE/Windows ActiveX version
    {
        if (window.ActiveXObject) {
            try { req = new ActiveXObject("Msxml2.XMLHTTP") }
            catch (e) {
                try { req = new ActiveXObject("Microsoft.XMLHTTP") }
                catch (e) { req = false }
            }
        }
    }

    if (req) {
        req.open("GET", url, false);
        req.send("");
        return req.responseText
    }
    return ''
}

/**
 * Turns a string of data into an array
 * 
 * @param strData that will be turned into array
 * @param strDelimiter that will be the delimiter eg ','
 * @returns array
 */
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}