import styles from "./calendar-preview.module.css";

const weeks = [
	["26", "27", "28", "29", "30", "31", "1"],
	["2", "3", "4", "5", "6", "7", "8"],
	["9", "10", "11", "12", "13", "14", "15"],
	["16", "17", "18", "19", "20", "21", "22"],
	["23", "24", "25", "26", "27", "28", "29"],
	["30", "1", "2", "3", "4", "5", "6"],
] as const;

export function CalendarPreview() {
	return (
		<div
			className={styles.preview}
			role="img"
			aria-label="Preview of the calendar application's November month view"
		>
			<div className={styles.browserBar}>
				<div className={styles.windowControls} aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
				<span>Calendar</span>
				<span className={styles.browserBarEnd}>Local</span>
			</div>
			<div className={styles.previewBody}>
				<div className={styles.previewHeading}>
					<div>
						<span className={styles.eyebrow}>Your month</span>
						<strong>November 2026</strong>
					</div>
					<div className={styles.previewActions} aria-hidden="true">
						<span>Today</span>
						<span>+</span>
					</div>
				</div>
				<div className={styles.weekdays} aria-hidden="true">
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
						<span key={day}>{day}</span>
					))}
				</div>
				<div className={styles.monthGrid} aria-hidden="true">
					{weeks.flatMap((week, weekIndex) =>
						week.map((day, dayIndex) => (
							<div
								key={`${weekIndex}-${day}`}
								className={[
									styles.day,
									weekIndex === 0 && dayIndex < 6 ? styles.outsideMonth : "",
									weekIndex === 5 && dayIndex > 0 ? styles.outsideMonth : "",
								].join(" ")}
							>
								<span className={day === "18" ? styles.today : undefined}>
									{day}
								</span>
								{day === "6" ? <i className={styles.eventBlue} /> : null}
								{day === "12" ? <i className={styles.eventClay} /> : null}
								{day === "18" ? (
									<>
										<i className={styles.eventBlue} />
										<i className={styles.eventSage} />
									</>
								) : null}
								{day === "24" ? <i className={styles.eventClay} /> : null}
							</div>
						)),
					)}
				</div>
			</div>
		</div>
	);
}
