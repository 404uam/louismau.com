import styles from "./calendar-preview.module.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const dates = [
	...Array.from({ length: 30 }, (_, index) => ({
		day: index + 1,
		outsideMonth: false,
	})),
	...Array.from({ length: 12 }, (_, index) => ({
		day: index + 1,
		outsideMonth: true,
	})),
] as const;

type PreviewItem = {
	type: "event" | "task";
	label: string;
	time?: string;
};

const items: Record<number, readonly PreviewItem[]> = {
	2: [{ type: "task", label: "Send invoice" }],
	4: [{ type: "event", label: "Product sync", time: "10:00 AM" }],
	6: [{ type: "event", label: "Lunch with Mia", time: "12:30 PM" }],
	9: [{ type: "task", label: "Review roadmap" }],
	12: [{ type: "event", label: "Dentist", time: "3:00 PM" }],
	16: [
		{ type: "event", label: "Design critique", time: "9:30 AM" },
		{ type: "task", label: "Send notes" },
	],
	18: [
		{ type: "event", label: "Project review", time: "11:00 AM" },
		{ type: "event", label: "Focus time", time: "2:00 PM" },
		{ type: "task", label: "Prepare release" },
	],
	21: [{ type: "event", label: "Weekly walk", time: "8:00 AM" }],
	24: [{ type: "event", label: "Portfolio review", time: "4:00 PM" }],
	27: [{ type: "task", label: "Get Hired at Dream Job" }],
	30: [{ type: "event", label: "Month review", time: "10:00 AM" }],
};

export function CalendarPreview({ compact = false }: { compact?: boolean }) {
	return (
		<div
			className={`${styles.preview} ${compact ? styles.compact : ""}`}
			role="img"
			aria-label="Static preview of the Calendar application's November 2026 month view, including sample events and tasks"
		>
			<div className={styles.toolbar} aria-hidden="true">
				<div className={styles.heading}>
					<span>Monthly view</span>
					<strong>November 2026</strong>
				</div>
				<div className={styles.controls}>
					<span className={styles.newItem}>
						<span className={styles.plus}>+</span>
						New Item
					</span>
					<span className={styles.viewPicker}>
						<span className={styles.selectedView}>Month</span>
						<span>Week</span>
						<span>3-day</span>
						<span>Day</span>
					</span>
					<span className={styles.today}>Today</span>
					<span className={styles.navigation}>
						<span>‹</span>
						<span>›</span>
					</span>
				</div>
			</div>
			<div className={styles.calendar} aria-hidden="true">
				<div className={styles.weekdays}>
					{weekdays.map((day) => (
						<span key={day}>
							<abbr title={day}>{day}</abbr>
						</span>
					))}
				</div>
				<div className={styles.monthGrid}>
					{dates.map(({ day, outsideMonth }, index) => {
						const visibleItems = outsideMonth ? [] : (items[day] ?? []);
						const hiddenItems = visibleItems.slice(2);

						return (
							<div
								key={`${outsideMonth ? "december" : "november"}-${day}`}
								className={`${styles.day} ${outsideMonth ? styles.outsideMonth : ""}`}
							>
								<time
									className={
										!outsideMonth && day === 18 ? styles.current : undefined
									}
								>
									{day}
								</time>
								<div className={styles.itemList}>
									{visibleItems
										.slice(0, 2)
										.map(({ type, label, time }, itemIndex) => (
											<div
												key={`${index}-${itemIndex}`}
												className={
													type === "event" ? styles.event : styles.task
												}
											>
												{type === "event" ? (
													<span className={styles.eventTime}>{time}</span>
												) : (
													<i className={styles.taskDot} />
												)}
												<span className={styles.itemTitle}>{label}</span>
											</div>
										))}
									{hiddenItems.length > 0 ? (
										<span className={styles.more}>
											+{hiddenItems.length} more
										</span>
									) : null}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
