/* Removes one or many class names to a single Element.
 * @argument el <required> [HTMLElement, NodeList] Element(s) to remove the class(es).
 * @argument classNames <required> [String] One or more space-separated classes to be added to the class attribute of each matched element.
 * @usage removeClass(document.body, 'a b c');                 // one element, many class names
 * @usage removeClass(document.querySelectorAll('a'), 'link'); // many elements, one class name
 */
var _re = new RegExp(/\s/);

module.exports = function removeClass(el, classNames) {
    classNames = classNames.split(_re);

    if (el.classList) {
        return classNames.forEach(function(cl) {
            el.classList.remove(cl);
        });
    }

    el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ');
};
