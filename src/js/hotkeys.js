import {
    hotkeys,
    buttonIsBeingSet,
    writeFile,
    setButtonIsBeingSet,
    path,
    setCurrentCheckedNode, robot, sprays, modifier, noRecoilState, currentCheckedNode,
} from './variables.js'

let mouseIsDown = false
let idTimeout
let globalCounter = 0

export function initializeKeys() {
    for (let item in hotkeys['weapons']) {
        let showedKey = document.querySelector('#' + hotkeys['weapons'][item]['dataTarget'])
        if (hotkeys['weapons'][item]['key'] !== null) {
            showedKey.innerHTML = hotkeys['weapons'][item]['alias']
        }
    }
}

export function initializeMisc() {
    for (let item in hotkeys['misc']) {
        switch (item) {
            case 'sensitive':
                let sens = document.querySelector(`[data-${item}]`)
                let slider = document.querySelector('#input-sensitive')
                sens.innerHTML = hotkeys['misc'][item]
                slider.value = hotkeys['misc'][item]
                break
            case 'fastzoom':
                let fastzoomInput = document.querySelector(`[data-${item}]`)
                fastzoomInput.checked = hotkeys['misc'][item]
                break
            case 'delay':
                let button = document.querySelector(`[data-${item}="${hotkeys['misc'][item]}"]`)
                button.classList.replace('border-[#1C1B21]', 'border-[#7775D1]')
                button.classList.remove('bg-[#26272C]')
                break
            case "crosshair":
                let crosshairInput = document.querySelector(`[data-${item}]`)
                crosshairInput.checked = hotkeys['misc'][item]['value']
                break
            case "sound":
                let soundInput = document.querySelector(`[data-${item}]`)
                soundInput.checked = hotkeys['misc'][item]
                break
            default:
                let showedKey = document.querySelector(`[data-${item}]`)
                showedKey.innerHTML = hotkeys['misc'][item]['alias']
                break
        }
    }
}

function getAllKeys() {
    let keys = []
    for (let i in hotkeys['weapons']) {
        keys.push(hotkeys['weapons'][i]['key'])
    }
    keys.push(hotkeys['misc']['noRecoil']['key'], hotkeys['misc']['resetActiveWeapon']['key'])
    return keys
}

function startAnimation(e) {
    e.target.innerHTML = 'Нажмите кнопку'
    e.target.classList.add('text-green-500', 'animate-pulse')
}

function stopAnimation(e) {
    e.target.classList.replace('text-green-500', 'text-rose-500')
    e.target.classList.remove('animate-pulse')
    e.target.innerHTML = 'Назначить'
}

export function setKey(e) {
    if (buttonIsBeingSet == null) {
        const type = e.target.getAttribute('data-type')
        const value = e.target.getAttribute('data-value')
        setButtonIsBeingSet(e)
        startAnimation(e)
        window.addEventListener('keydown', function handler(event) {
            if (!getAllKeys().includes(event.code)) {
                hotkeys[type][value]['key'] = event.code === 'Escape' ? null : event.code
                hotkeys[type][value]['alias'] = event.code === 'Escape' ? null : event.key
                e.target.parentNode.querySelector('p').innerHTML = event.code === 'Escape' ? 'кнопка' : event.key
            }
            stopAnimation(e)
            setButtonIsBeingSet(null)
            window.removeEventListener('keydown', handler)
            writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
        })
    }
}

export function setDelay(e) {
    e.target.classList.replace('border-[#1C1B21]', 'border-[#7775D1]')
    e.target.classList.remove('bg-[#26272C]')
    e.target.parentNode.querySelectorAll('button').forEach(item => {
        if (item !== e.target) {
            item.classList.replace('border-[#7775D1]', 'border-[#1C1B21]')
            item.classList.add('bg-[#26272C]')
        }
    })
    hotkeys['misc']['delay'] = e.target.getAttribute('data-delay')
    writeFile(path.join(__dirname, `/data/hotkeys.json`), JSON.stringify(hotkeys, null, 2))
}

export function makeFastzoom() {
    robot.mouseClick('right')
    setTimeout(() => {
        robot.mouseClick('left')
        robot.keyTap('q')
        robot.keyTap('q')
    }, +hotkeys['misc']['delay'])
}

export function controlSpray() {
    if (noRecoilState && currentCheckedNode !== null) {
        mouseIsDown = true
        idTimeout = setInterval(() => {
            if (mouseIsDown) {
                robot.moveMouseRelative(parseInt(sprays[currentCheckedNode.id][globalCounter][0] * modifier), parseInt(sprays[currentCheckedNode.id][globalCounter][1] * modifier))
                globalCounter++;
                if (globalCounter === 29) {
                    clearTimeout(idTimeout)
                }
            }
        }, 99)
    }
}

export function stopControllingSpray() {
    clearTimeout(idTimeout)
    mouseIsDown = false
    globalCounter = 0
}