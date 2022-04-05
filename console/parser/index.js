const moment = require('moment');

/**
 * @description Used to parse the given schedule.
 * @class ScheduleParser
 */
class ScheduleParser {
  constructor(time_string) {
    this.time_string = time_string;
    this.WEEK_DAYS = [
      'Mon',
      'Tues',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ];
    this.days = [];
    this.start_time = '';
    this.end_time = '';
    console.log('=============================');
    console.log(`Prcessing ${this.time_string}`);
  }

  formatTimeString() {
    /** 
     * In some places, thursday is written as `Thurs` and in somewhere it is written as `Thu`
     * So replace Thurs by Thu
    */
    if(this.time_string.includes('Thurs')) {
      this.time_string = this.time_string.replace('Thurs', 'Thu');
    }

    const count = (this.time_string.match(/:/g) || []).length;
    if(count===2) return this;
    const bad_hours = this.time_string.match(/(\s[0-9]*)\s(am|pm)/g);
    bad_hours.map(
      hour => {
        hour = hour.trim();
        let _hour = hour.split(" ");
        _hour[0] = `${_hour[0]}:00`;
        _hour = _hour.join(' ');
        this.time_string = this.time_string.replace(hour,_hour);
      }
    );
    return this;
  }

  getWeekDayIndex(day = '') {
    const week_day_index = this.WEEK_DAYS.findIndex((_day) => {
      return _day===day;
    });
    return week_day_index;
  }

  /**
   * Input => Mon-Thu, Sun
   * Output => [Mon, Tue, Wed, Thu, Sun]
   * @param {string} day_range
   * @memberof ScheduleParser
   */
  splitDaysRange(day_range) {
    let _days = day_range.split(',').map(_=>_.trim());
    let _result_days = [];
    _days.forEach(_day => {
      if(_day.includes('-')) {
        const _day_range = _day.split('-');
        const start_day = _day_range[0];
        const end_day = _day_range[1];
        const week_day_start_key = this.getWeekDayIndex(start_day);
        const week_day_end_key = this.getWeekDayIndex(end_day);
        const day_ranges = this.WEEK_DAYS.slice(week_day_start_key, week_day_end_key+1);
        _result_days.push(...day_ranges);
      } else {
        _result_days.push(_day);
      }
    });
    return _result_days;
  }

  parseDays() {
    // this.time_string = this.formatTimeString(this.time_string);
    const regex = new RegExp(/^(.*)(\s)(am|pm)(\s)-/g);
    const matched_string = this.time_string.match(regex);
    const start_time_colon = new RegExp(/([0-9]*)\s(am|pm)/g);
    const matched_start_time_string = matched_string[0].match(start_time_colon);
    const position = this.time_string.indexOf(matched_start_time_string);
    let week_days = this.time_string.substring(0,position-1);
    //Reverse the week_days, and remove the digit part with the space
    week_days = week_days.split("").reverse().join("");
    week_days = week_days.substring(week_days.indexOf(' ')+1);
    week_days = week_days.split("").reverse().join("");    
    this.days = this.splitDaysRange(week_days);
    return this;
  }

  parseOperatingHours() {
    const startTimesRegex = new RegExp(/(\s)[0-9](.*)(\s)(am|pm)(\s)/g);
    this.start_time = this.time_string.match(startTimesRegex).map(_=>_.trim()).toString();
    this.start_time = moment(this.start_time, 'h:mm A').format('HH:mm:ss');
    const endTimesRegex = new RegExp(/ - (.*)(am|pm)$/g);
    this.end_time = this.time_string.match(endTimesRegex).map(_=>_.replace(' - ', '')).toString();
    this.end_time = moment(this.end_time, 'h:mm A').format('HH:mm:ss');
    return this;
  }

  getDays() {
    return this.days;
  }

  getSchedules() {
    const schedules = this.days.map(day => {
      return {
        day: day,
        start: this.start_time,
        end: this.end_time
      }
    });
    return schedules;
  }
}

// new ScheduleParser('Mon-Sun 11:30 am - 9 pm').formatTimeString().parseDays().parseOperatingHours();
// new ScheduleParser('Mon, Thurs, Sat 7:15 am - 8:15 pm').formatTimeString().parseDays().parseOperatingHours();
// new ScheduleParser('Tues 2:45 pm - 5:45 pm').formatTimeString().parseDays().parseOperatingHours();
// new ScheduleParser("Sat 5 pm - 9 pm").formatTimeString().parseDays().parseOperatingHours().getSchedules();
// new ScheduleParser("Mon-Thu, Sun 11:30 am - 9:30 pm").formatTimeString().parseDays().parseOperatingHours().getSchedules();
// const result = new ScheduleParser("Mon-Thu, Sun 11:30 am - 9 pm").formatTimeString().parseDays().parseOperatingHours().getSchedules();
// console.log("result:: ", result);

module.exports = ScheduleParser;