const { getModels} = require('../database')
const Models = getModels()
const { Op } = require('sequelize');
const { checkins: checkIns, instructorattendeddates: instructorAttendedDates,instructors } = Models
const {CustomError}=require('../utils/custom-error')
const {STATUS_CODES}=require('../utils/constants')

/**
 * we will fill the checkIn time for a particular instructor.
 * @param {*} data 
 * @returns 
 */
exports.checkinInstructor = async (data) => {
    let { instructorId, date: date,checkInTime:time } = data
    let instructorDate = await instructorAttendedDates.findOne({
        where: { instructorid: instructorId, checkdate: date },
    });

    if (!instructorDate) {
        instructorDate = await instructorAttendedDates.create({
            instructorid:instructorId,
            checkdate: date,
        });
    }

    const existingCheckIn = await checkIns.findOne({
        where: { instructordateid: instructorDate.id, checkouttime: null },
    });

    if (existingCheckIn) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'Instructor is already checked in and has not checked out.',
            'validation error'
        );
    }

    await checkIns.create({
        instructordateid: instructorDate.id,
        checkintime: time,
    });

    return 'Check-in recorded successfully.';
}

exports.checkOutInstructor = async (data) => {
    let { instructorId, date: date, checkOutTime: time } = data;

    let instructorDate = await instructorAttendedDates.findOne({
        where: { instructorid: instructorId, checkdate: date },
    });

    if (!instructorDate) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'No check-in record found for the given date and instructor.',
            'validation error'
        );
    }

    let checkInRecord = await checkIns.findOne({
        where: { instructordateid: instructorDate.id, checkouttime: null },
    });

    if (!checkInRecord) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,'No check-in record found for the given date and instructor.');
    }

    const checkInDateTime = new Date(`1970-01-01T${checkInRecord.checkintime}Z`);
    const checkOutDateTime = new Date(`1970-01-01T${time}Z`);
    if (checkInDateTime > checkOutDateTime) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'check-out time should not be less than check-in time',
            'validation error'
        );
    }

    checkInRecord.checkouttime = time;
    await checkInRecord.save();

    return 'Check-out recorded successfully.';
}

exports.regularize = async (data) => {
    let { id, instructorId, date, checkInTime, checkOutTime } = data;
    
    const instructorDate = await instructorAttendedDates.findOne({
        where: { instructorid: instructorId, checkdate: date },
    });

    if (id) {
        if (!instructorDate) {
            throw new CustomError(STATUS_CODES.BAD_REQUEST,
                'No entries recorded for the given date and instructor.',
                'validation error'
            );
        }

        const existingEntry = await checkIns.findOne({
            where: { id: id, instructordateid: instructorDate.id }
        });

        if (!existingEntry) {
            throw new CustomError(STATUS_CODES.BAD_REQUEST,
                'Check-in entry not found for the given id.',
                'validation error'
            );
        }

        const overlappingEntries = await checkIns.findAll({
            where: {
                instructordateid: instructorDate.id,
                id: { [Op.ne]: id }, 
                [Op.or]: [
                    {
                        checkintime: { [Op.between]: [checkInTime, checkOutTime] }
                    },
                    {
                        checkouttime: { [Op.between]: [checkInTime, checkOutTime] }
                    },
                    {
                        [Op.and]: [
                            { checkintime: { [Op.lte]: checkInTime } },
                            { checkouttime: { [Op.gte]: checkOutTime } }
                        ]
                    }
                ]
            }
        });

        if (overlappingEntries.length > 0) {
            throw new CustomError(STATUS_CODES.BAD_REQUEST,
                'Check-in and check-out times overlap with existing entries.',
                'validation error'
            );
        }

        existingEntry.checkintime = checkInTime || existingEntry.checkintime;
        existingEntry.checkouttime = checkOutTime || existingEntry.checkouttime;

        await existingEntry.save();

        return 'attendance is updated';
    }
    else {
        if (!instructorDate) {
            instructorDate = await instructorAttendedDates.create({
                instructorid: instructorId,
                checkdate: date,
            });
        }

        const overlappingEntries = await checkIns.findAll({
            where: {
                instructordateid: instructorDate.id,
                [Op.or]: [
                    {
                        checkintime: { [Op.between]: [checkInTime, checkOutTime] }
                    },
                    {
                        checkouttime: { [Op.between]: [checkInTime, checkOutTime] }
                    },
                    {
                        [Op.and]: [
                            { checkintime: { [Op.lte]: checkInTime } },
                            { checkouttime: { [Op.gte]: checkOutTime } }
                        ]
                    }
                ]
            }
        });
        if (overlappingEntries.length > 0) {
            throw new CustomError(STATUS_CODES.BAD_REQUEST,
                'Check-in and check-out times overlap with existing entries.',
                'validation error'
            );
        }

        const newCheckIn = await checkIns.create({
            instructordateid: instructorDate.id,
            checkintime: checkInTime,
            checkouttime: checkOutTime
        });
        return 'sucessfully regularized'
    }
}

exports.getMonthlyReport = async (data) => {
    const {month,year}=data
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const allInstructors = await instructors.findAll();
    const totalWorkingHours = [];
    for (const instructor of allInstructors) {
        const instructordateids = (await instructorAttendedDates.findAll({
            where: {
                instructorid: instructor.id,
                checkdate: { [Op.between]: [startDate, endDate] }
            }
        })).map(attendedDate => attendedDate.id);
        const instructorCheckIns = await checkIns.findAll({
            where: {
                instructordateid: { [Op.in]: instructordateids }
            }
        });

        let totalHours = 0;
        instructorCheckIns.forEach(checkIn => {
            const checkInDateTime = new Date(`1970-01-01T${checkIn.checkintime}Z`);
            const checkOutDateTime = new Date(`1970-01-01T${checkIn.checkouttime}Z`);
            let duration = checkOutDateTime.getTime() - checkInDateTime.getTime();
            if (!duration) {
                duration=0
            }
            totalHours += duration / (1000 * 60 * 60); 
        });

        totalWorkingHours.push({
            'id': instructor.id,
            'instuctor': instructor.name,
            'totalHours': totalHours.toFixed(2)
        });
    }
    return totalWorkingHours
}