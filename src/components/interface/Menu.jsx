export const Menu = (props) => {
    const { onSectionChange, menuOpened, setMenuOpened } = props;

    if (menuOpened === false) {
        document.querySelectorAll(".console-container").forEach(element => {
            element.remove();
        })
    }
    
    return (
        <>
            <button
                onClick={() => setMenuOpened(!menuOpened)}
                className="z-20 fixed right-6 top-12 md:right-12 p-3 bg-cyan-600 w-12 h-11 rounded-md"
            >
                <div className={`wrapper-menu ${menuOpened ? "open" : ""}`}>
                    <div class="line-menu half start"></div>
                    <div class="line-menu"></div>
                    <div class="line-menu half end"></div>
                </div>
            </button>
            <div
                className={`<-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex felx-col ${menuOpened ? "w-full md:w-80" : "w-0"}`}
            >
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    <MenuButton label="Sobre mi" onClick={() => onSectionChange(0)} />
                    <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
                    <MenuButton label="Experiencia" onClick={() => onSectionChange(2)} />
                    <MenuButton label="Contacto" onClick={() => onSectionChange(3)} />
                </div>
            </div>
        </>
    );
};

const MenuButton = (props) => {
    const { label, onClick } = props;
    return (
        <button
            onClick={onClick}
            className="text-2xl font-bold cursor-pointer hover:text-cyan-600 transition-colors"
        >
            {label}
        </button>
    );
}