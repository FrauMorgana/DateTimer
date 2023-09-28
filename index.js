import { isEqual, isPast, intervalToDuration, formatDuration, formatDistanceToNow, formatDistanceToNowStrict, eachYearOfInterval, isLeapYear } from "date-fns";
import { ELEMENT, ERROR, DESCRIPTION, APPENDIX } from "./js/data";
import ru from "date-fns/locale/ru";

ELEMENT.FORM.addEventListener('submit', formHandler);

function formHandler(e) {
	e.preventDefault();
	try { 
		if (!ELEMENT.INPUT.value) {
			throw new InputError(ERROR.NO_DATE);
		}
		toLocaleStorage(ELEMENT.INPUT.value);
		render(ELEMENT.TARGET_DATE);
	} catch(err) {
		alert(err.message);
		console.log(err);
	}
}

class InputError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

function toLocaleStorage(date) {
	const dateJson = JSON.stringify(date);
	localStorage.setItem('date', dateJson);
	ELEMENT.TARGET_DATE = new Date(JSON.parse(localStorage.getItem('date')));
	ELEMENT.TARGET_DATE.setHours(0);
}

function render(date) {
	if (isPast(date) || isEqual (date, new Date())) {
		ELEMENT.DESCRIPTION_FIELD.textContent = DESCRIPTION.PAST;
	} else {
		ELEMENT.DESCRIPTION_FIELD.textContent = DESCRIPTION.FUTURE;
	}
	ELEMENT.TIMER_FIELD.textContent = defineTimer(date);
}

function defineTimer(date) {
	const result = formatDistanceToNowStrict(date, {unit: 'day', locale: ru});
	const allDays = parseInt(result);

	const duration = intervalToDuration({
		start: date,
		end: new Date(),
	});

	if (date === new Date()){
		return formatDistanceToNow(date, {locale: ru},)
	} else if ((!duration.years) && (!duration.months)) {
		return formatDuration(duration, {format: [ 'days', 'hours', 'minutes',], locale: ru})
	} else  {
		let counter = 0;
		let yearsInInterval = 0;

		if (date.getFullYear() > new Date().getFullYear()) {
			yearsInInterval = eachYearOfInterval({
			start: new Date(),
			end: date,
		})} else {
			yearsInInterval = eachYearOfInterval({
			start: date,
			end: new Date(),
		})}

		if (yearsInInterval.length > 0) {
			yearsInInterval.forEach(item => {
			if (isLeapYear(new Date(item))) counter++;
		})}
		
		const years = formatDuration(duration, {format: [ 'years' ], locale: ru});
		const hours = formatDuration(duration, {format: [ 'hours' ], locale: ru});

		const daysPreCount = (allDays - (duration.years * 365 + counter)).toString();
		
		let days = '';
		if (daysPreCount.slice(-2) >= 10 && daysPreCount.slice(-2) <= 20){
			days = `${daysPreCount} ${APPENDIX.OTHERDAYS}`
		} else if (daysPreCount.at(-1) == 1){
			days = `${daysPreCount} ${APPENDIX.ONEDAY}`
		} else if (daysPreCount.at(-1) > 1 && daysPreCount.at(-1) < 5) {
			days = `${daysPreCount} ${APPENDIX.TWOTOFOURDAYS}`
		} else {
			days = `${daysPreCount} ${APPENDIX.OTHERDAYS}`
		}
		let output = '';
		if (parseInt(days) == 0) {
			output = years  + ' ' + hours;
		} else {
			output = years + ' ' + days + ' ' + hours;
		}
		return output;
	}
}