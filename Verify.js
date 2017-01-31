
var strData = loadFile("/members.csv");
var membersArray = CSVToArray(strData);
var SquareArray = CSVToArray(loadFile('/squareorders.csv'));
console.log(membersArray);
console.log(SquareArray);








/**
 * Handles loading of the file from the computer
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