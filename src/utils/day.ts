import day from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

const dayJsPlugin = [ isLeapYear,relativeTime ]

dayJsPlugin.forEach(plugin => day.extend(plugin))

// 使用本地化语言
day.locale('zh-cn')

// 日期类型
export type DateType = string | number | day.Dayjs | Date | null | undefined

// 日期格式化类型
export type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | string

export class DayJsUtils {
    // 格式化日期
    static format(date: DateType,dateFormat: DateFormat = 'YYYY-MM-DD') {
        return day(date).format(dateFormat)
    }

    // 格式化当前系统日期
    static formatCurrent(dateFormat: DateFormat = 'YYYY-MM-DD') {
        return day().format(dateFormat)
    }

    // 返回现在到当前实例的相对时间
    static fromNow(date?: DateType,noSuffix?: boolean) {
        return day(date).fromNow(noSuffix)
    }

    // 返回 X 到当前实例的相对时间
    static from(fromDate: DateType,date: DateType,noSuffix?: boolean) {
        return day(date).from(fromDate,noSuffix)
    }

    // 返回当前实例到现在的相对时间
    static toNow(date?: DateType,noSuffix?: boolean) {
        return day(date).toNow(noSuffix)
    }

    // 返回当前实例到 X 的相对时间
    static to(toDate: DateType,date: DateType,noSuffix?: boolean) {
        return day(date).to(toDate,noSuffix)
    }

    // 返回指定单位下两个日期时间之间的差异
    static diff(date1: DateType,date2: DateType,unit?: day.QUnitType,float?: boolean) {
        return day(date1).diff(date2,unit,float)
    }
}

export default day
