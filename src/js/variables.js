export const path = require('path')
export const {readFile, writeFile} = require('fs/promises')
export const sprays = await readFile(path.join(__dirname, '/data/sprays.json')).then(JSON.parse)
export const keycodes = await readFile(path.join(__dirname, '/data/keycodes.json')).then(JSON.parse)
export let keys = await readFile(path.join(__dirname, '/data/keys.json')).then(JSON.parse)
export let hotkeys = await readFile(path.join(__dirname, '/data/hotkeys.json')).then(JSON.parse)
export const smgsContent = document.querySelector('#smgs-content')
export const riflesContent = document.querySelector('#rifles-content')
export const miscContent = document.querySelector('#misc-content')
export const fastzoomHover = document.querySelector('#fastzoom-hover')
export const fastzoomInfo = document.querySelector('#fastzoom-info')
export const settingsButton = document.querySelector('#settings-button')
export const delayButtons = document.querySelector('[data-delay-buttons]')
export const noRecoilButton = document.querySelector('#no-recoil-button')
export const rightBarButton = document.querySelector('#rightBarButton')
export const resetActiveWeaponButton = document.querySelector('#reset-active-weapon')
export const inputSensitive = document.querySelector('#input-sensitive')
export const inputSound = document.querySelector('#input-sound')
export const inputFastzoom = document.querySelector('[data-fastzoom]')
export const inputCrosshair = document.querySelector('[data-crosshair]')
export const rightBar = document.querySelector('#rightBar')
export const robot = require('@jitsi/robotjs')
export const {uIOhook, UiohookKey} = require('uiohook-napi')
export const sound = require('sound-play')
export let modifier = 2.52 / +hotkeys['misc']['sensitive']
export let buttonIsBeingSet = null
export let currentCheckedNode = null
export let noRecoilState = false

export function setButtonIsBeingSet(value) {
    buttonIsBeingSet = value
}

export function setCurrentCheckedNode(target) {
    document.querySelectorAll('input').forEach(item => item.checked = false)
    target.checked = true
    currentCheckedNode = target
}

export function updateModifier(value) {
    modifier = 2.52 / +value
    console.log(modifier)
}


export function toggleNoRecoilState() {
    if (hotkeys['misc']['sound']) {
        let audio = noRecoilState ? new Audio(path.join(__dirname, 'sounds/turnOff.wav')) : new Audio(path.join(__dirname, 'sounds/turnOn.wav'))
        audio.volume = 0.05
        audio.play()
    }
    noRecoilState = !noRecoilState
}

export function resetActiveWeapon() {
    if (currentCheckedNode !== null) {
        currentCheckedNode.checked = false
        currentCheckedNode = null
    }
}