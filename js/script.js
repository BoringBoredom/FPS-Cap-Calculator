const refreshRateE = document.getElementById('refresh-rate')
const maxFpsE = document.getElementById('limit')
const result = document.getElementById('result')

function calculateCap() {
    const refreshRate = parseInt(refreshRateE.value)
    const maxFps = parseInt(maxFpsE.value)
    if (isNaN(maxFps) || isNaN(refreshRate) || refreshRate < 1 || maxFps < 1) {
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
        if (cap >= 1) {
            viableFpsCaps.push(cap)
        }
        multiplier += 1
    }
    while (true) {
        if (refreshRate %divider == 0) {
            cap = refreshRate / divider
            if (cap < 1) {
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
    caps = caps.slice(0, -2)
    result.innerHTML = caps
}

refreshRateE.addEventListener('input', () => {
    calculateCap()
})
maxFpsE.addEventListener('input', () => {
    calculateCap()
})
window.addEventListener('load', () => {
    calculateCap()
})