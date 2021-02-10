const refreshRateE = document.getElementById('refresh-rate')
const minFpsE = document.getElementById('min-fps')
const maxFpsE = document.getElementById('max-fps')
const result = document.getElementById('result')


function calculateCap() {
    let refreshRate = parseInt(refreshRateE.value)
    let minFps = parseInt(minFpsE.value)
    let maxFps = parseInt(maxFpsE.value)

    if (isNaN(minFps) || isNaN(maxFps) || isNaN(refreshRate) || refreshRate == 0 || maxFps == 0 || maxFps < minFps) {
        result.innerHTML = ''
        return
    }

    let viableFpsCaps = []
    let multiplier = 1
    let divider = 1
    let cap

    while (true) {
        cap = refreshRate * multiplier
        if (cap > maxFps) {
            break
        }
        if (cap >= minFps) {
            viableFpsCaps.push(cap)
        }
        multiplier += 1
    }

    while (true) {
        if (refreshRate %divider == 0) {
            cap = refreshRate / divider
            if (cap < minFps) {
                break
            }
            if (cap <= maxFps) {
                viableFpsCaps.push(cap)
            }
            if (cap == 1) {
                break
            }
        }
        divider += 1
    }

    viableFpsCaps.sort((a, b) => a - b)
    sortedViableFpsCaps = [...new Set(viableFpsCaps)]

    let index = 0
    let caps = ''
    for (const fpsCap of sortedViableFpsCaps) {
        if (index < sortedViableFpsCaps.length - 1) {
            caps += fpsCap.toString() + ', '
            index += 1
        }
        else {
            caps += fpsCap.toString()
        }
    }
    result.innerHTML = caps
}


refreshRateE.addEventListener('input', () => {
    calculateCap()
})

minFpsE.addEventListener('input', () => {
    calculateCap()
})

maxFpsE.addEventListener('input', () => {
    calculateCap()
})

window.addEventListener('load', () => {
    calculateCap()
})