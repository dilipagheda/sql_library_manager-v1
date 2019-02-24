/* 
  Pagination is handled on this file, a client side java script.
*/

//Get all tr elements from tbody which are rows
let trElements = $('tbody tr');
const totalRows = trElements.length;
//Calculate total number of pages, assuming a page size of 10
const totalPages = Math.ceil(totalRows / 10);

//Initilise buttons. It uses bootstrap library for styling
$('.pagination').append(`<li class="page-item" id="prev">
<button class="page-link">Previous</button>
</li>`);

for (let i = 1; i <= totalPages; i++) {
    $('.pagination').append(`<li class="page-item" id=${i}><button class="page-link">${i}</button></li>`);
    $(`#${i}`).click(function () {
        showPageFor(i);
    });
}
$('.pagination').append(`<li class="page-item" id="next">
<button class="page-link">Next</a>
</li>`);

//Add some logic to show only 10 pagination buttons at a time.
//User can reveal / hide  buttons by clicking on previous or next
let lastPageButtonShown = 10;
let firstPageButtonShown = 1;
if (totalPages > 10) {
    for (let i = 11; i <= totalPages; i++) {
        $(`#${i}`).hide();
    }

    $('#prev').addClass('disabled');
    $('#next').removeClass('disabled');

} else {
    $('#prev').addClass('disabled');
    $('#next').addClass('disabled');
}

$('#prev').click(function () {
    if ($(this).hasClass('disabled')) return;
    if (firstPageButtonShown > 1) {
        $(`#${lastPageButtonShown}`).hide();
        lastPageButtonShown--;

    }
    firstPageButtonShown--;
    if (firstPageButtonShown < 1) {
        firstPageButtonShown = 1;
        $(this).addClass('disabled');
    } else {
        $(`#${firstPageButtonShown}`).show();
        $(`#${lastPageButtonShown}`).show();
    }
    $('#next').removeClass('disabled');


});

$('#next').click(function () {
    if ($(this).hasClass('disabled')) return;
    if (lastPageButtonShown < totalPages) {
        $(`#${firstPageButtonShown}`).hide();
        firstPageButtonShown++;

    }
    lastPageButtonShown++;
    if (lastPageButtonShown > totalPages) {
        lastPageButtonShown = totalPages;
        $(this).addClass('disabled');
        $('#prev').removeClass('disabled');
    } else {
        $(`#${firstPageButtonShown}`).show();
        $(`#${lastPageButtonShown}`).show();
    }

});

//A function which actually handles pagination
//It takes pageNumber and displays only those 10 rows and hides remaining ones.
function showPageFor(pageNumber) {
    trElements.each(function (index) {
        if (index < pageNumber * 10 && index >= (pageNumber - 1) * 10) {
            console.log(index + "  show");
            $(this).addClass('show');
            $(this).removeClass('hide');

        } else {
            console.log(index + " hide");
            $(this).addClass('hide');
            $(this).removeClass('show');

        }

    });
}

//Initial call to show first page
showPageFor(1);