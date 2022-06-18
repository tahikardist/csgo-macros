import {
    settingsButton,
    fastzoomInfo,
    fastzoomHover,
    inputSensitive,
    inputFastzoom,
    inputSound,
    inputCrosshair,
    hotkeys,
    writeFile,
    rightBarButton,
    noRecoilButton,
    resetActiveWeaponButton,
    delayButtons,
    rightBar,
    path, updateModifier
} from "./variables.js";
import {setKey, setDelay} from "./hotkeys.js";

const div = document.createElement('div')
div.classList.add('absolute', 'h-[calc(100vh_-_40px)]', 'min-w-full', 'bg-black', 'opacity-60', 'z-10')
div.addEventListener('click', rightBarDisappear)

function rightBarDisappear() {
    rightBar.classList.replace('appearRightBar', 'disappearRightBar')
    rightBar.addEventListener('animationend', function handler(e) {
        div.remove()
        rightBar.classList.remove('disappearRightBar')
        rightBar.removeEventListener('animationend', handler)
    })
}

settingsButton.addEventListener('click', function () {
    rightBar.classList.add('appearRightBar')
    document.querySelector('header').after(div)
})

rightBarButton.addEventListener('click', rightBarDisappear)

delayButtons.childNodes.forEach(item => {
    item.addEventListener('click', (e) => setDelay(e))

})

inputCrosshair.addEventListener('change', (e) => {
    hotkeys['misc']['crosshair']['value'] = e.target.checked
    writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
})

inputSound.addEventListener('change', (e) => {
    hotkeys['misc']['sound'] = e.target.checked
    writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
})

noRecoilButton.addEventListener('click', (e) => setKey(e))

resetActiveWeaponButton.addEventListener('click', (e) => setKey(e))

inputFastzoom.addEventListener('change', (e) => {
    hotkeys['misc']['fastzoom'] = e.target.checked
    writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
})

inputSensitive.addEventListener('change', (e) => {
    hotkeys['misc']['sensitive'] = e.target.value
    document.querySelector('[data-sensitive]').innerHTML = e.target.value
    updateModifier(hotkeys['misc']['sensitive'])
    writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
})

fastzoomHover.addEventListener('mouseover', function () {
    setTimeout(() => {
        fastzoomInfo.classList.replace('hidden', 'block')
    }, 150)
})

fastzoomHover.addEventListener('mouseout', function () {
    setTimeout(() => {
        fastzoomInfo.classList.replace('block', 'hidden')
    }, 200)
})
