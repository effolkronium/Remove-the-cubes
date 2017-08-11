// Module pattern
const Result = (() => {
    let resultData = []; // BD of results
    const nameElement = $('.nameInput');
    const nameMaxSize = 12;
    const tableElement = $('.tableBody');

    nameElement.on('input', (() => { // Closure
        let oldName = '';
        return () => { // Prevent too big names
            if (nameElement.val().length > nameMaxSize) {
                nameElement.val(oldName);
            } else {
                oldName = nameElement.val();
            }
        }
    })());

    $("#resultModal").on('hide.bs.modal', () => {
        const name = nameElement.val();
        const points = $('.score').html().match(/Your score: (\d+)/i)[1]; //Extract points

        if (name.length) {
            save(name, points);
        }
    });

    // Add new DOM element into table
    function saveInTable(name, points) {
        const tableRow = $('<tr>');

        const nameElement = $('<td>');
        nameElement.html(name);

        const pointsElement_ = $('<td>');
        const pointElement = $('<span>', {
            class: 'pull-right'
        });
        pointElement.html(points);
        pointsElement_.append(pointElement);

        tableRow.append(nameElement);
        tableRow.append(pointsElement_);
        $('.tableBody').append(tableRow);
    }

    // Save in BD, local storage and in table
    function save(name, points) {
        resultData.push({
            'name': name,
            'points': points
        });

        localStorage.setItem("data", JSON.stringify(resultData));

        updateTable();
    }

    // Load BD from local storage and initilize result table
    function load() {
        const dataStr = localStorage.getItem("data");
        if (dataStr.length) {
            try { // catch invalid data in local storage
                resultData = JSON.parse(dataStr);
                updateTable();
            } catch (err) {
                console.log('Warning: invalid data in local storage');
                resultData = [];
            }
        }
    }

    // Clear table. Sort resultData by points. Insert sorted results into table
    function updateTable() {
        tableElement.empty();

        resultData.sort((lhs, rhs) => {
            if (lhs.points < rhs.points) return 1;
            if (lhs.points > rhs.points) return -1;
            return 0;
        });

        resultData.forEach(result => {
            saveInTable(result.name, result.points);
        });
    }

    load(); // Load

    return {
        addResult: points => {
            $('.score').html("Your score: " + points);
            $("#resultModal").modal({
                backdrop: 'static' // Prevent close on click outside of modal window
            });
        }
    }
})();
