"use client";

import React from "react";
import {
	format,
	parse,
	addDays,
	isSameDay,
	startOfWeek,
	endOfWeek,
	getWeek,
	startOfMonth,
	endOfMonth,
	addMonths,
	subMonths,
	isSameMonth,
	setDefaultOptions,
} from "date-fns";
import { nb } from "date-fns/locale";
import styles from "./Calendar.module.css";

class Calendar extends React.Component {
	state = {
		currentDate: new Date(),
		selectedDate: new Date(),
	};

	renderHeader() {
		setDefaultOptions({ locale: nb });

		const dateFormat = "MMMM yyyy";

		return (
			<div className={styles.calendar__header}>
				<div className={styles.calendar__header__icon} onClick={this.prevMonth}>
					{"<"}-
				</div>
				<span>{format(this.state.currentDate, dateFormat)}</span>
				<div className={styles.calendar__header__icon} onClick={this.nextMonth}>
					-{">"}
				</div>
			</div>
		);
	}

	renderDays() {
		const dateFormat = "EEEE";
		const days = [];

		const startDate = startOfWeek(this.state.currentDate);

		days.push(<div className={styles.calendar__week__number} key="week-label">#</div>);

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className={[styles.col, styles.col_center].join(" ")} key={i}>
					{format(addDays(startDate, i), dateFormat)}
				</div>,
			);
		}

		return (
			<div className={[styles.calendar__days, styles.row].join(" ")}>
				{days}
			</div>
		);
	}

	renderCells() {
		const { currentDate, selectedDate } = this.state;
		const monthStart = startOfMonth(currentDate);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);

		const dateFormat = "d";
		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = "";
		let weekNumber = 0;

		while (day <= endDate) {
			weekNumber = getWeek(day);
			days.push(<div className={styles.calendar__week__number} key={weekNumber}>{weekNumber}</div>,);
			for (let i = 0; i < 7; i++) {
				formattedDate = format(day, dateFormat);
				const cloneDay = day;
				days.push(
					<div
						className={`${styles.col} ${styles.calendar__col} ${styles.calendar__cell} ${
							!isSameMonth(day, monthStart)
								? styles.calendar__disabled
								: isSameDay(day, selectedDate)
								  ? styles.calendar__selected
								  : ""
						}`}
						key={day.toString()}
						onClick={() => this.onDateClick(cloneDay)}
					>
						<span className={styles.calendar__cell__number}>
							{formattedDate}
						</span>
						<span className={styles.calendar__cell__bg}>{formattedDate}</span>
					</div>,
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div className={styles.row} key={day.toString()}>
					{days}
				</div>,
			);
			days = [];
		}
		return <div className="body">{rows}</div>;
	}

	onDateClick = (day: Date) => {
		this.setState({
			selectedDate: day,
		});
	};

	nextMonth = () => {
		this.setState({
			currentDate: addMonths(this.state.currentDate, 1),
		});
	};

	prevMonth = () => {
		this.setState({
			currentDate: subMonths(this.state.currentDate, 1),
		});
	};

	render() {
		return (
			<div className="calendar">
				{this.renderHeader()}
				{this.renderDays()}
				{this.renderCells()}
			</div>
		);
	}
}

export default Calendar;
