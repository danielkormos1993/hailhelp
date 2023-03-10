const createStyle = css => {

    const Style = document.createElement('style');
    Style.textContent = css;
    document.head.appendChild(Style);

}

export default createStyle;