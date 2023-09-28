const ELEMENT = {
	FORM: document.querySelector('.form'),
	INPUT: document.querySelector('.date-input'),
	DESCRIPTION_FIELD: document.querySelector('h1'),
	TIMER_FIELD: document.getElementById('timer'),
	TARGET_DATE: new Date(JSON.parse(localStorage.getItem('date'))),
}

const DESCRIPTION = {
	PAST: 'Прошло времени:',
	FUTURE: 'Осталось времени:',
}

const ERROR = {
	NO_DATE: 'Пожалуйста, введите дату',
}

const APPENDIX = {
	ONEDAY: 'день',
	TWOTOFOURDAYS: 'дня',
	OTHERDAYS: 'дней',
}

export { ELEMENT, DESCRIPTION, ERROR, APPENDIX }