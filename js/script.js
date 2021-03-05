// в константу присваивается функция, которая возвращает отфильтрованный массив
const filterByType = (type, ...values) => values.filter(value => typeof value === type), 
	hideAllResponseBlocks = () => {
		// функция создает массив из элементов DOM дерева
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебор массива, скрытие элементов
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// функция вывода сообщения
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// вызов функции
		hideAllResponseBlocks(); 
		// делаем элемент видимым
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
			// если селектор существует, то в его значение присвается текст из переменной msgText (переданной в функции)
		}
	},

	// функция выводит сообщиения об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// функция вывод сообщение о том, что все хорошо
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// функция вывода сообщения о том, что результатов нет (показывать ещё нечего)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// функция выбора сообщения для вывода
	tryFilterByType = (type, values) => {
		try {
			// запуск функции, массив превращаем в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// в константу присваиваем условие, если строка имеет длинну
			const alertMsg = (valuesArray.length) ?
			// то выводим  данные с типом type
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе выводим что данные отсутствуют
				`Отсутствуют данные типа ${type}`;
				// запуск функции
			showResults(alertMsg);
		} catch (e) {
			// если произошла ошибка, вывод сообщения об ошибке
			showError(`Ошибка: ${e}`);
		}
	};

	// в константу присваиваем селектор по id
const filterButton = document.querySelector('#filter-btn');

// добавляем слушателя для кнопки по событию клик
filterButton.addEventListener('click', e => {
	// в константу присваиваем селектор по id
	const typeInput = document.querySelector('#type');
	// в константу присваиваем селектор по id
	const dataInput = document.querySelector('#data');

	// если  value у поля пустое
	if (dataInput.value === '') {
		// выводим tooltip с сообщением
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// запуск функции
		showNoResults();
		// иначе
	} else {
		// убираем сообщение из tooltip
		dataInput.setCustomValidity('');
		// отключаем стандарное событие для кнопки
		e.preventDefault();
		// вызываем функцию, принимаем значение из выпадающенго списка, принимаем значение из input, к обоим применяем метод trim(), который удаляет пробелы в начале и конце строки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});