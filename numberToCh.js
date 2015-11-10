var groupMarkerLabel = ['', '万', '亿', '兆']
    , digitMarkerLabel = ['', '十', '百', '千']
    , digitsLabel = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    , GROUP_MAKRER_STEP = 10000
    , DIGIT_MAKRER_STEP = 10

module.exports = function(number) {
    number = Math.floor(number)
    var groupValue
        , outpus = []
        , zerosNumber = 0 // 用来处理连续的 0
        , restNumber = number
        , groupMarkerPos = 0

    do {
        // 遍历 &#x60;'', '万', '亿', '兆'&#x60; 四个组
        groupValue = restNumber % GROUP_MAKRER_STEP

        if (groupValue) {
            outpus.unshift(groupMarkerLabel[groupMarkerPos])
        }

        var digitMarkerPos = 0
            , ignoreOne = restNumber === 10 // 十位以&#x60;一&#x60;开头的时候, 可以省略&#x60;一&#x60;
            , restGroupValue = groupValue
            , trailingIsZero = number > 0 // 用来处理全部以 0 来结尾的情况

        do {
            // 遍历每个组的 &#x60;个, 十, 百, 千&#x60; 位, 但只从有数字的位数开始，
            // 所以最后需要做一个判断是否补零的处理
            currentUnit = restGroupValue % DIGIT_MAKRER_STEP

            if (trailingIsZero && currentUnit) {
                trailingIsZero = false
            }

            if (currentUnit) {
                outpus.unshift(digitMarkerLabel[digitMarkerPos])
                zerosNumber = 0
            } else {
                zerosNumber++
            }

            if (!trailingIsZero && !ignoreOne && zerosNumber < 2) {
                outpus.unshift(digitsLabel[currentUnit])
            }

            digitMarkerPos++
            restGroupValue = Math.floor(restGroupValue / 10)
        } while (restGroupValue > 0)

        groupMarkerPos++
        restNumber = Math.floor(restNumber / GROUP_MAKRER_STEP)

        // 判断每个 group 是否需要补零
        // 比如 10,0001 的第一个 group 为 [0001], 但是遍历只从&#x60;各&#x60;位开始，
        // 所以对于&#x60;十&#x60;，&#x60;百&#x60;，&#x60;千&#x60; 位连续的零需要保留最后一个零，在group前补一个零
        //
        // 并且如果下一组的结尾数字是零的，也需要补一个零
        if (restNumber && groupValue
            && (groupValue < 1000 || restNumber % 10 === 0)) {
            zerosNumber = 1
            outpus.unshift(digitsLabel[0])
        }
    } while (restNumber > 0)

    var result = ''
    outpus.forEach(function(char) {
        if (!char) { return }
        result += char
    })

    return result
}

