const refreshRateE = document.getElementById('refresh-rate')
const minFpsE = document.getElementById('min-fps')
const maxFpsE = document.getElementById('max-fps')
const result = document.getElementById('result')

function calculateCap() {
    const refreshRate = parseInt(refreshRateE.value)
    const minFps = parseInt(minFpsE.value)
    const maxFps = parseInt(maxFpsE.value)

    if (isNaN(minFps) || isNaN(maxFps) || isNaN(refreshRate) || refreshRate <= 0 || maxFps <= 0 || minFps < 0 || maxFps < minFps) {
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
    const sortedViableFpsCaps = [...new Set(viableFpsCaps)]

    let caps = ''
    for (const fpsCap of sortedViableFpsCaps) {
        caps += fpsCap.toString() + ', '
    }
    caps = caps.slice(0, caps.length - 2)
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