import moment from "moment";
import { ScheduleProps, ScheduleType } from "../../shared/types";

export default function Schedule({schedule, id}: ScheduleProps) {
    return (
        <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/3 px-4 py-2">Day</th>
            <th className="w-1/5 px-4 py-2">Opening Hour</th>
            <th className="w-1/5 px-4 py-2">Closing Hour</th>
          </tr>
        </thead>
        <tbody>
          {
            schedule.map((_schedule: ScheduleType, index: number) => (
              <tr key={`${moment()}-${id}-${index}`}>
                <td className="border px-4 py-2">{moment().day(_schedule.day).format('dddd')}</td>
                <td className="border px-4 py-2">{moment(_schedule.start, "HH:mm:ss").format("h:mm:ss A")}</td>
                <td className="border px-4 py-2">{moment(_schedule.end, "HH:mm:ss").format("h:mm:ss A")}</td>
              </tr>
            ))
          }
        </tbody>
      </table>     
    );
}