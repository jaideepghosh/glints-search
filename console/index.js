const csv = require('csvtojson')
const APP_CONSTANTS = require('../shared/constants');
const ScheduleParser = require('./parser');
const csvFilePath = __dirname+'/hours.csv';
const supabase = require('../shared/db_client');

const readCSVData = async (csvFilePath) => {
    const jsonArray = await csv({noheader:true, headers: ['name','hours']}).fromFile(csvFilePath);
    // console.log(jsonArray);
    return jsonArray;
}

const prepareData = async () => {
    try {
        const raw_data = await readCSVData(csvFilePath);
        const prepared_data = raw_data.map(data => {
            const schedules = data.hours.split("/").map(_=>_.trim());
            const prepared_schedules = schedules.map(schedule => {
                const _schedule = new ScheduleParser(schedule).formatTimeString().parseDays().parseOperatingHours().getSchedules();
                return _schedule;
            });
            return {
                name: data.name,
                schedules: prepared_schedules
            }
        });
        // console.log("prepared_data:: ", prepared_data);
        return prepared_data;
    } catch (error) {
        throw new Error(error);
    }
}

const execute = async () => {
    let restaurants_payload = [];
    let restaurants_schedule_payload = [];
    try {
        const praperedData = await prepareData();
        praperedData.map((data,index) => {
            let generated_id = index+1;
            restaurants_payload.push({ name: data.name, id: generated_id });
            data.schedules.map(schedule => {
                schedule = schedule.map(_schedule => Object.assign(_schedule, {restaurant_id: generated_id}));
                // console.log('schedule:: ', schedule);
                restaurants_schedule_payload.push(...schedule);
            });
        });
        console.log('restaurants_payload:: ', restaurants_payload);
        console.log('restaurants_schedule_payload:: ', restaurants_schedule_payload);
        console.log('count restaurants_payload:: ', restaurants_payload.length);
        console.log('count restaurants_schedule_payload:: ', restaurants_schedule_payload.length);
    } catch (error) {
        console.log("Something went wrong.", error);
    }

    const { restaurant_data, restaurant_error } = await supabase
        .from(APP_CONSTANTS.restaurants)
        .insert(restaurants_payload);
    if(restaurant_error) {
        console.log('restaurant_error:: ', restaurant_error);
    } else {
        console.log('restaurant_data:: ', restaurant_data);
    }

    const { restaurants_schedule_data, restaurants_schedule_error } = await supabase
        .from(APP_CONSTANTS.restaurants_schedule)
        .insert(restaurants_schedule_payload);
    if(restaurants_schedule_error) {
        console.log('restaurants_schedule_error:: ', restaurants_schedule_error);
    } else {
        console.log('restaurants_schedule_data:: ', restaurants_schedule_data);
    }
}

execute();