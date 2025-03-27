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
			const hideSeconds = settings.hideSeconds
				? settings.hideSeconds !== "false"
				: false;
			const timeFormat =
				settings.format === "12hr"
					? hideSeconds
						? "hh:mm a"
						: "hh:mm:ss a"
					: hideSeconds
					? "HH:mm"
					: "HH:mm:ss";

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
	hideSeconds: string | null;
}

interface ClockProps {
	settings: ClockSettings;
}

Clock.defaultProps = {
	settings: {
		type: "clock",
		format: "24hr",
		hideSeconds: null,
	},
};
