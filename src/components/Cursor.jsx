import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;
let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
    const cursorOutline = useRef();
    const [hoverButton, setHoverButton] = useState(false);

    const animate = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;

        outlineX = outlineX + distX * CURSOR_SPEED;
        outlineY = outlineY + distY * CURSOR_SPEED;

        cursorOutline.current.style.left = `${outlineX}px`;
        cursorOutline.current.style.top = `${outlineY}px`;
        requestAnimationFrame(animate);
    }

    const waitForElementToExist = (selector)  =>{
        return new Promise(resolve => {
          if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
          }
          
          const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
            }
          });
          
          observer.observe(document.body, {
            subtree: true,
            childList: true,
          });
        });
    }

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCoordinates = (e, mouse) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    const updateCursor = (mouse, speed, cursor, cursorCircle, pos) => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);
        pos.x += diffX * speed;
        pos.y += diffY * speed;
        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);
        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
        const rotate = 'rotate(' + angle +'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    useEffect(() => {
        const mouseEventListener = document.addEventListener('mousemove', (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });
        const animateEvent = requestAnimationFrame(animate);
        return () => {
            document.removeEventListener('mousemove', mouseEventListener);
            cancelAnimationFrame(animateEvent);
        }
    }, []);

    useEffect(() => {
        const mouseEventListener = document.addEventListener('mouseover', (e) => {
            if (
                e.target.tagName.toLowerCase() === "button" ||
                e.target.parentElement.tagName.toLowerCase() === "button" ||
                e.target.tagName.toLowerCase() === "input"  ||
                e.target.tagName.toLowerCase() === "textarea"
            ) {
                setHoverButton(true);
            } else {
                setHoverButton(false);
            }
        });
        return () => {
            document.removeEventListener('mouseover', mouseEventListener);

            waitForElementToExist('.cursor__circle').then(target => {
                let cursor = document.querySelector('#cursor');
                let cursorCircle = cursor.querySelector('.cursor__circle');
                let mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
                let pos = { x: 0, y: 0 }; // cursor's coordinates
                let speed = 0.1; // between 0 and 1
        
                window.addEventListener('mousemove', function (e) {
                    updateCoordinates(e, mouse);
                });

                updateCursor(mouse, speed, cursor, cursorCircle, pos);
        
                function loop() {
                    updateCursor(mouse, speed, cursor, cursorCircle, pos);
                    requestAnimationFrame(loop);
                }
        
                requestAnimationFrame(loop);
        
                waitForElementToExist('[cursor-class]').then(target => {
                    const cursorModifiers = document.querySelectorAll('[cursor-class]');
                    cursorModifiers.forEach(curosrModifier => {
                        curosrModifier.addEventListener('mouseenter', function() {
                            const className = this.getAttribute('cursor-class');
                            cursor.classList.add(className);
                        });
                        curosrModifier.addEventListener('mouseleave', function() {
                            const className = this.getAttribute('cursor-class');
                            cursor.classList.remove(className);
                        });
                    });
                });
            })
        }
        
    }, []);

    return (
        <>
            <div id="cursor">
                <div className={`cursor__circle`}></div>
            </div>
            <div
                className={`invisible md:visible z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform ${hoverButton ? "bg-transparent border-2 border-cyan-600 w-9 h-9" : "bg-cyan-700 w-3 h-3"}`}
                ref={cursorOutline}
            />
        </>
    );
}