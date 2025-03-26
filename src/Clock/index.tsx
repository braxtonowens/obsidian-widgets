import * as React from "react";
import { moment } from "obsidian";
import { WidgetType } from "src/types/Widgets";

const Clock = ({ settings }: ClockProps) => {
	const [time, setTime] = React.useState(moment().format("HH:mm:ss"));
	const [date, setDate] = React.useState(
		moment().format("dddd, MMMM DD, YYYY")
	);
	const [amPm, setAmPm] = React.useState(moment().format("A"));

	React.useEffect(() => {
		const clockInterval = setInterval(() => {
			const showSeconds = settings.seconds === "true";
			const timeFormat =
				settings.format === "12hr"
					? showSeconds
						? "hh:mm:ss a"
						: "hh:mm a"
					: showSeconds
					? "HH:mm:ss"
					: "HH:mm";

			setAmPm(moment().format("A"));
			setTime(moment().format(timeFormat));
			setDate(moment().format("dddd, MMMM DD, YYYY"));
		}, 100);

		() => {
			clearInterval(clockInterval);
		};
	}, []);

	return (
		<div className="Clock_Face">
			<div className="Clock_Divider" />
			<div className="Clock__time-container">
				<div className="Clock__time">{time}</div>
				{settings.format === "12hr" && (
					<div className="Clock__am-pm">{amPm}</div>
				)}
			</div>

			<div className="Clock_Date">{date}</div>
			<div className="Clock_Divider" />
		</div>
	);
};

export default Clock;

export interface ClockSettings {
	type: WidgetType;
	format: "12hr" | "24hr";
	seconds: string;
}

interface ClockProps {
	settings: ClockSettings;
}

Clock.defaultProps = {
	settings: {
		type: "clock",
		format: "24hr",
		seconds: true,
	},
};
