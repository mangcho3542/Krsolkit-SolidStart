export function getMaxSize() {
    if(typeof(window) === "undefined") return ;
    if(!window.visualViewport) return;
    return {width: window.visualViewport.width, height: window.visualViewport.height};
}