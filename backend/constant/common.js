const PASSWORD = {
    MIN: 6,
    MAX: 20,
    SALT_LENGTH: 10
}

const settings = {
    PER_PAGE_RECORDS: 10,
    PAGE_NO: 1,
    IS_EXPORT: 0,
    ORDER_BY: 'id-DESC',
    RETURN_DB_DATE_TIME_FORMAT: '%b %d, %Y %l:%i %p',
    RETURN_DB_DATE_FORMAT: '%D %M, %Y',
    FULL_DATE_FORMAT: '%D %M %Y',
    DEFAULT_VALUE: 'N/A',
    expiresIn: '28d'
}

module.exports = {
    PASSWORD,
    settings
}