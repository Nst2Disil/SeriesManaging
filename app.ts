import $ from 'jquery';

// интерфейс для типизации объектов
interface Series {
    _id: string;
    name: string;
    year: number;
    rating: string;
    genre: string;
}

// функции для отправки запросов на сервер и обновления интерфейса в соответствии с полученными данными
async function addSeries(name: string, year: number, rating: string, genre: string) {
    // ключевое слово await, чтобы дождаться завершения запроса fetch к серверу, который выполняется асинхронно
    const response = await fetch('http://localhost:3000/series', {
        // параметры запроса
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, year, rating, genre })
    });
    if (response.ok) {
        loadSeries();
    } else {
        console.error('Failed to add series');
    }
}

async function deleteSeries(id: string) {
    const response = await fetch(`http://localhost:3000/series/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        loadSeries();
    } else {
        console.error('Failed to delete series');
    }
}

async function loadSeries() {
    const response = await fetch('http://localhost:3000/series'); //get-запрос
    if (response.ok) {
        const series: Series[] = await response.json(); // извлечение данных
        const seriesList = $('#seriesList'); // синтаксис jQuery для выбора элементов DOM по их идентификатору
        seriesList.empty(); // удаление дочерних элементов контейнера
        series.forEach((s: Series) => {
            const listItem = $('<div>');
            listItem.text(`${s.name} (${s.year}) - Rating: ${s.rating}, Genre: ${s.genre}`);
            const deleteButton = $('<button>Delete</button>');
            deleteButton.on('click', () => deleteSeries(s._id)); // jQuery для привязки обработчика события click к кнопке удаления
            listItem.append(deleteButton);
            seriesList.append(listItem); // div добавляется в список сериалов
        });
    } else {
        console.error('Failed to fetch series');
    }
}

// События submit форм обрабатываются, чтобы предотвратить их дефолтное поведение (отправку формы) 
// и вместо этого выполнить нужные действия (добавление или удаление сериалов).
$('#addSeriesForm').submit(function (event) {
    event.preventDefault(); // предотвращение отправки формы
    // считывание значений полей формы
    const name = $('#name').val() as string;
    const year = parseInt($('#year').val() as string);
    const rating = $('#rating').val() as string;
    const genre = $('#genre').val() as string;
    // вызов функции
    addSeries(name, year, rating, genre);
});

$('#deleteSeriesForm').submit(function (event) {
    event.preventDefault();
    const id = $('#deleteId').val() as string;
    deleteSeries(id);
});

$('#getSeriesBtn').click(function () {
    loadSeries();
});

// При загрузке страницы вызывается функция loadSeries для отображения списка сериалов
// синтаксис jQuery для ожидания загрузки всего HTML-документа и вызова функции
$(document).ready(loadSeries);
