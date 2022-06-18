import {
    smgsContent,
    riflesContent,
    keys,
    currentCheckedNode,
    robot,
    sprays,
    inputSensitive,
    uIOhook,
    UiohookKey,
    setCurrentCheckedNode, modifier, hotkeys, toggleNoRecoilState, keycodes, resetActiveWeapon
} from "./variables.js";
import {initializeKeys, initializeMisc, setKey, controlSpray, stopControllingSpray, makeFastzoom} from "./hotkeys.js";

function loadWeapons(data) {
    const outerDiv = document.createElement('div')
    const h1 = document.createElement('h1')
    const innerDiv1 = document.createElement('div')
    const innerDiv2 = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    input.type = 'checkbox'
    const span = document.createElement('span')
    const p = document.createElement('p')
    const button = document.createElement('button')
    outerDiv.classList.add('flex', 'h-44', 'w-32', 'flex-col', 'items-center', 'gap-2', 'rounded-lg', 'bg-[#1C1B21]', 'pt-6', 'font-medium', 'uppercase', 'text-[#E2E2E2]', 'shadow-lg')
    innerDiv1.classList.add('flex', 'w-full', 'items-center', 'justify-center')
    innerDiv2.classList.add('flex', 'flex-col', 'items-center', 'leading-5')
    label.classList.add('relative', 'flex', 'justify-between', 'items-center', 'group', 'p-2', 'text-xl')
    input.classList.add('absolute', 'left-1/2', '-translate-x-1/2', 'w-full', 'h-full', 'peer', 'appearance-none', 'rounded-md')
    span.classList.add('w-14', 'h-6', 'flex', 'items-center', 'flex-shrink-0', 'p-1', 'bg-gray-300', 'rounded-full', 'duration-300', 'ease-in-out', 'peer-checked:bg-rose-500', 'after:w-4', 'after:h-4', 'after:bg-white', 'after:rounded-full', 'after:shadow-md', 'after:duration-300', 'peer-checked:after:translate-x-8', 'group-hover:after:translate-x-1')
    p.classList.add('text-[13px]', 'text-gray-500')
    button.classList.add('text-[13px]', 'uppercase', 'text-rose-500')
    label.append(input, span)
    innerDiv1.append(label)
    innerDiv2.append(p, button)
    outerDiv.append(h1, innerDiv1, innerDiv2)
    for (let item of data) {
        const newBlock = outerDiv.cloneNode(true)
        newBlock.querySelector('h1').innerHTML = item['name']
        newBlock.querySelector('p').id = item['name'] + '-showedKey'
        newBlock.querySelector('p').innerHTML = 'кнопка'
        newBlock.querySelector('button').innerHTML = 'назначить'
        newBlock.querySelector('button').setAttribute('data-type', 'weapons')
        newBlock.querySelector('button').setAttribute('data-value', item['name'])
        newBlock.querySelector('button').addEventListener('click', (e) => setKey(e))
        newBlock.querySelector('input').id = item['name']
        newBlock.querySelector('input').addEventListener('click', e => {
            setCurrentCheckedNode(e.target)
        })
        if (item['type'] === 'smg') {
            smgsContent.append(newBlock)
        } else {
            riflesContent.append(newBlock)
        }
    }
}

loadWeapons(keys)
initializeKeys()
initializeMisc()

uIOhook.on('keydown', e => {
    if (keycodes[e.keycode] === hotkeys['misc']['noRecoil']['key']) {
        toggleNoRecoilState()
    } else if (keycodes[e.keycode] === hotkeys['misc']['resetActiveWeapon']['key']) {
        resetActiveWeapon()
    } else if (keycodes[e.keycode] === 'Alt') {
        if (hotkeys['misc']['fastzoom']) {
            makeFastzoom()
        }
    } else {
        for (let item in hotkeys['weapons']) {
            if (keycodes[e.keycode] === hotkeys['weapons'][item]['key']) {
                setCurrentCheckedNode(document.querySelector('#' + item))
                break
            }
        }
    }
})

uIOhook.on('mousedown', controlSpray)

uIOhook.on('mouseup', stopControllingSpray)

uIOhook.start()
