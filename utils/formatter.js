function Formatter(amount) {
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    return numberFormat2.format(amount);
}
export default Formatter;
