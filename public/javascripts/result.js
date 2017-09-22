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


        if( !name.length)
            name = 'anonymous';

        save(name, parseInt(points));
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

    // Save 
    const save = (name, points) => {
        $.post('save_result', JSON.stringify({
            'name': name,
            'points': parseInt(points)
        }));

        load();
    }

    // Load
    const load = () => {
        resultData = [];
        $.get('ajax/get_top_10', data =>{ 
            resultData = data;
            updateTable();
        });
    }

    // Clear table. Sort resultData by points. Insert sorted results into table
    const updateTable = () => {
        tableElement.empty();

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
