/**
 * Created by steve on 29/11/2015.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Instantiate the table with the existing HTML tbody and the row with the template
    var templateTest = document.querySelector('#test');

    var testContent = document.importNode(templateTest.content, true),
        content = document.querySelector('#pageContent');

    content.appendChild(testContent);
});