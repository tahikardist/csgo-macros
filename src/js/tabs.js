const buttons = [
    document.querySelector('[data-target="smgs-content"]'),
    document.querySelector('[data-target="rifles-content"]'),
    document.querySelector('[data-target="misc-content"]'),
]

const blocks = [
    document.querySelector('#smgs-content'),
    document.querySelector('#rifles-content'),
    document.querySelector('#misc-content'),
]

function setNavbarButtons() {
    buttons.forEach((item) => {
        item.addEventListener('click', function () {
            const currentAttribute = item.attributes['data-target'].value
            buttons.forEach((item) => {
                item.classList.remove('border-b-[5px]', 'border-rose-500')
                item.classList.replace('text-white', 'text-gray-400')
            })
            item.classList.add('border-b-[5px]', 'border-rose-500')
            item.classList.replace('text-gray-400', 'text-white')
            blocks.forEach((item) => {
                if (item.id === currentAttribute) {
                    item.classList.replace('hidden', 'block')
                } else {
                    item.classList.replace('block', 'hidden')
                }
            })
        })
    })
}

setNavbarButtons()