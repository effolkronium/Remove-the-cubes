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

    $("#resultModal").on('hide.bs.modal', () => { // Invoke at modal close
        const name = nameElement.val();
        const points = $('.score').html().match(/Your score: (\d+)/i)[1]; //Extract points

        if (name.length) {
            save(name, points);
        }
    });

    // Add new DOM element into table
    const saveInTable = (name, points) => {
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
    const save = (name, points) => {
        resultData.push({
            'name': name,
            'points': points
        });

        $.ajax({
            url: 'api/save_result_table',
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(resultData),
            dataType:'json'
          });

        updateTable();
    }

    // Load BD from local storage and initilize result table
    const load = () => {
        resultData = [];
        $.ajax({
            url: "api/load_result_table", success: (result) => {
                resultData = result;
                console.log(JSON.stringify(resultData));
                updateTable();
            }
        });
    }

    // Clear table. Sort resultData by points. Insert sorted results into table
    const updateTable = () => {
        tableElement.empty();

        resultData.sort((lhs, rhs) => {
            if (parseInt(lhs.points) < parseInt(rhs.points)) return 1;
            if (parseInt(lhs.points) > parseInt(rhs.points)) return -1;
            return 0;
        });

        while(resultData.length > 5) // Save last 5 with biggest points
            resultData.pop();

        resultData.forEach(result => {
            saveInTable(result.name, result.points);
        });
    }

    load(); // Load BD

    return {
        addResult: points => {
            $('.score').html("Your score: " + points);
            $("#resultModal").modal({
                backdrop: 'static' // Prevent close on click outside of modal window
            });
        }
    }
})();
