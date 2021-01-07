import {
  addDays,
  differenceInBusinessDays,
  isWeekend,
  isWithinInterval
} from 'date-fns'
import Holidays from 'date-holidays'

const hd = new Holidays('FR')

const holidays = hd
  .getHolidays(new Date().getFullYear())
  .filter((offDay) => offDay.type === 'public')

class BusinessDayService {
  count(
    totalResources: number,
    startDate: Date,
    endDate: Date,
    offDays: number
  ) {
    try {
      const daysBetween = differenceInBusinessDays(
        new Date(endDate),
        new Date(startDate)
      )

      const offDaysIn = holidays.filter(
        (holiday) =>
          isWithinInterval(new Date(holiday.date), {
            start: addDays(startDate, -1),
            end: endDate
          }) && !isWeekend(new Date(holiday.date))
      )

      const totalOffDays = offDays + offDaysIn.length

      return Math.max(0, daysBetween * totalResources - totalOffDays)
    } catch (error) {
      return 0
    }
  }
}

export const businessDayService = new BusinessDayService()
