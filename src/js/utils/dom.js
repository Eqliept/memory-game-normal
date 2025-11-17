export function el(tag, options = {}) {
    const Element = document.createElement(tag);

    if (options.classes) {
        options.classes.map(element => {
            Element.classList.add(element);
        })
    }

    if (options.text) {
        Element.textContent = options.text;
    }

    if (options.attrs) {
        options.attrs.forEach(element => {
            const [[key, value]] = Object.entries(element);
            Element.setAttribute(key, value);
        })
    }
    return Element;
}